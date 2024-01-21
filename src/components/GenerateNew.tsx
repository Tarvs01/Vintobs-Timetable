import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { FullTimetableObject, TimetableData } from "../types";
import { GeneralCourseData } from "../types";
import GeneralCourse from "./GeneralCourse";
import { SingleDepartmentCourses, TimetableObject } from "../types";
import { generateTimetable } from "../helpers/generateTimetable";
import ViewTimetable from "./ViewTimetable";
import { AppContext } from "./AppProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase.js";
import { collection, addDoc } from "firebase/firestore";

function GenerateNew() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [timetableData, setTimetableData] = useState<TimetableData>({
    name: "",
    semester: "first",
    startDate: "",
    endDate: "",
    generalCourses: [],
    specificCourses: [],
  });
  const [generalCourseData, setGeneralCourseData] = useState<GeneralCourseData>(
    { courseTitle: "", departmentsOffering: [], numberOfStudents: 0 }
  );
  const [allGeneralCourses, setAllGeneralCourses] = useState<
    GeneralCourseData[]
  >([]);
  const [generalDept, setGeneralDept] = useState("");
  const [singleCourseData, setSingleCourseData] =
    useState<SingleDepartmentCourses>({
      level: "100",
      department: "eee",
      courses: [],
    });
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(0);
  const [singleCourse, setSingleCourse] = useState("");
  const [allSingleCourses, setAllSingleCourses] = useState<
    SingleDepartmentCourses[]
  >([]);
  const [showTimetable, setShowTimetable] = useState(false);
  const [singleCourseError, setSingleCourseError] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "exam-title") {
      setTimetableData({ ...timetableData, name: e.target.value });
    } else if (e.target.name === "start-date") {
      setTimetableData({ ...timetableData, startDate: e.target.value });
    } else if (e.target.name === "end-date") {
      setTimetableData({ ...timetableData, endDate: e.target.value });
    } else if (e.target.name === "general-course-title") {
      setGeneralCourseData({
        ...generalCourseData,
        courseTitle: e.target.value,
      });
    } else if (e.target.name === "general-dept") {
      setGeneralDept(e.target.value);
    } else if (e.target.name === "single-course") {
      setSingleCourseError("");
      setSingleCourse(e.target.value);
    } else if (e.target.name === "offering-students") {
      const tempStudents = e.target.value.replace(/\D/, "");
      if(isNaN(Number(tempStudents))){
        setNumberOfParticipants(0);
      }
      else{
        setNumberOfParticipants(Number(tempStudents));
      }
      setNumberOfParticipants(Number(e.target.value));
    } else if (e.target.name === "general-participants") {
      setGeneralCourseData({
        ...generalCourseData,
        numberOfStudents: Number(e.target.value),
      });
    }
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    if (e.target.name === "level") {
      setSingleCourseData({ ...singleCourseData, level: e.target.value });
    } else if (e.target.name === "department") {
      setSingleCourseData({ ...singleCourseData, department: e.target.value });
    } else if (e.target.name === "semester") {
      setTimetableData({ ...timetableData, semester: e.target.value });
    }
  }

  function handleGeneralCourseAdd() {
    setGeneralCourseData({
      ...generalCourseData,
      departmentsOffering: [
        ...generalCourseData.departmentsOffering,
        generalDept,
      ],
    });
    setGeneralDept("");
  }

  function handleSingleCourseAdd() {
    if(/^([a-z]{3}) (\d{3})$/.test(singleCourse.toLowerCase())){
      const courseCode = singleCourse.split(" ")[1];
      const semesterIndicator = timetableData.semester == "first" ? 1 : 0;

      if(Number(courseCode) % 2 === semesterIndicator){
        setSingleCourseData({
          ...singleCourseData,
          courses: [
            ...singleCourseData.courses,
            [singleCourse, numberOfParticipants],
          ],
        });
        setSingleCourse("");
        setNumberOfParticipants(0);
      }
      else{
        setSingleCourseError(`Invalid ${timetableData.semester} semester course code`);
      }

    }
    else{
      setSingleCourseError("Invalid course title format");
    }
  }

  function addNewSingleCourse() {
    console.log("single course data to use to set allSingleCourses:");
    console.log(singleCourseData);
    setAllSingleCourses([...allSingleCourses, singleCourseData]);
    setSingleCourseData({ level: "100", department: "eee", courses: [] });
  }

  function addNewGeneralCourse() {
    setAllGeneralCourses([...allGeneralCourses, generalCourseData]);
    setGeneralCourseData({
      courseTitle: "",
      departmentsOffering: [],
      numberOfStudents: 0,
    });
    console.log(allGeneralCourses);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (allSingleCourses.length === 0) {
      alert("Enter at least one specific course");
    } else {
      console.log("all single courses are:");
      console.log(allSingleCourses);

      const newTimetable: TimetableObject | false = generateTimetable({
        ...timetableData,
        generalCourses: [...allGeneralCourses],
        specificCourses: [...allSingleCourses],
      });

      console.log("timetable generated");
      console.log(newTimetable);

      if (newTimetable === false) {
        alert(
          "There was an error generating the timetable. Try increasing the period or reducing the subjects"
        );
      } else {
        const fullTimetable: FullTimetableObject = {
          name: timetableData.name,
          startDate: timetableData.startDate,
          endDate: timetableData.endDate,
          semester: timetableData.semester,
          timetable: newTimetable,
        };

        context?.setCurrentTimetable(fullTimetable);

        addDoc(collection(db, context!.UID), fullTimetable)
          .then(() => {
            alert("Successfully created Timetable");
            navigate("/view-timetable");
            setShowTimetable(true);
          })
          .catch(() => {
            alert(
              "There was an error. Check your network settings and try again."
            );
          });
      }
    }
  }

  return (
    <div>
      {showTimetable && <ViewTimetable />}
      <div className="page-heading">
        <h1 className="page-title">Generate Timetable</h1>
        <p className="page-description">
          Generate examination timetable for your school.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="exam-info-cont">
          <div className="exam-info">
            <label htmlFor="exam-title">Examination Title:</label>
            <input
              type="text"
              name="exam-title"
              id="exam-title"
              value={timetableData.name}
              onInput={handleInputChange}
              required
            />
          </div>

          <div className="other-exam-info-cont">
            <div className="exam-info">
              <label htmlFor="semester">Semester</label>
              <select
                name="semester"
                id="semester"
                value={timetableData.semester}
                onChange={handleSelectChange}
              >
                <option value="first">First Semester</option>
                <option value="second">Second Semester</option>
              </select>
            </div>

            <div className="exam-info">
              <label htmlFor="start-date">Start Date</label>
              <input
                type="date"
                name="start-date"
                id="start-date"
                value={timetableData.startDate}
                onInput={handleInputChange}
                required
              />
            </div>

            <div className="exam-info">
              <label htmlFor="end-date">End Date</label>
              <input
                type="date"
                name="end-date"
                id="end-date"
                value={timetableData.endDate}
                onInput={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="general-courses-cont">
          <h2 className="general-courses-title">General Courses</h2>

          <div className="all-courses-container">
            <div className="general-courses-form">
              <div className="exam-info">
                <label htmlFor="general-course-title">Course Title</label>
                <input
                  type="text"
                  name="general-course-title"
                  id="general-course-title"
                  value={generalCourseData.courseTitle}
                  onInput={handleInputChange}
                />

                <label
                  htmlFor="general-participants"
                  style={{ marginTop: "15px" }}
                >
                  Number of students
                </label>
                <input
                  type="number"
                  name="general-participants"
                  id="general-participants"
                  value={generalCourseData.numberOfStudents}
                  onInput={handleInputChange}
                />
              </div>

              <div className="offering-depts-cont">
                {generalCourseData.departmentsOffering.map((dept, index) => {
                  return (
                    <div key={index} className="general-course-cont">
                      <span>{dept}</span>
                      <div
                        className="cancel-button"
                        onClick={() => {
                          setGeneralCourseData({
                            ...generalCourseData,
                            departmentsOffering:
                              generalCourseData.departmentsOffering.filter(
                                (data, indexno) => {
                                  data;
                                  return indexno !== index;
                                }
                              ),
                          });
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 13.0004L13 1.00037M1 1.00037L13 13.0004"
                            stroke="#BB1E10"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="offering-dept-form-cont-g">
                <input
                  type="text"
                  name="general-dept"
                  id="general-dept"
                  value={generalDept}
                  onInput={handleInputChange}
                />
                <div
                  onClick={handleGeneralCourseAdd}
                  className="general-course-button"
                >
                  Add Dept
                </div>
              </div>
            </div>

            {allGeneralCourses.map((generalCourse, index) => {
              generalCourse;
              return (
                <GeneralCourse
                  indexOf={index}
                  allGeneralCourses={allGeneralCourses}
                  setGeneralCourseData={setAllGeneralCourses}
                  key={index}
                />
              );
            })}
          </div>

          <div className="add-new-general-course" onClick={addNewGeneralCourse}>
            Add new Course
          </div>
        </div>

        <div className="single-courses-cont">
          <h2 className="single-courses-title">Single Courses</h2>

          <div className="all-courses-container">
            <div className="single-courses-form">
              <div className="level-info">
                <div className="exam-info">
                  <label htmlFor="level">Level</label>
                  <select
                    name="level"
                    id="level"
                    onInput={handleSelectChange}
                    value={singleCourseData.level}
                  >
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <div className="exam-info">
                  <label htmlFor="department">Department</label>
                  <select
                    name="department"
                    id="department"
                    onInput={handleSelectChange}
                    value={singleCourseData.department}
                  >
                    <option value="age">AGE</option>
                    <option value="cpe">CPE</option>
                    <option value="cve">CVE</option>
                    <option value="eee">EEE</option>
                    <option value="ict">ICT</option>
                    <option value="ipe">IPE</option>
                    <option value="mee">MEE</option>
                    <option value="mme">MME</option>
                    <option value="mne">MNE</option>
                  </select>
                </div>
              </div>

              <div className="actual-courses-cont">
                <div className="a-course-cont">
                  <div className="index-number">&nbsp;</div>
                  <div className="single-courses-heading">Course Title</div>
                </div>

                {singleCourseData.courses.map((aCourse, index) => {
                  return (
                    <div className="a-course-cont" key={index}>
                      <div className="index-number">{index + 1}</div>
                      <div className="single-course-title">
                        <p>
                          {aCourse[0]} ({aCourse[1]} students)
                        </p>
                        <p></p>
                      </div>
                      <div
                        className="cancel"
                        onClick={() => {
                          setSingleCourseData({
                            ...singleCourseData,
                            courses: singleCourseData.courses.filter(
                              (oneCourse, indexNo) => {
                                oneCourse;
                                return indexNo !== index;
                              }
                            ),
                          });
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 13.0004L13 1.00037M1 1.00037L13 13.0004"
                            stroke="#BB1E10"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="offering-dept-form-cont">
                <label htmlFor="single-course">Course</label>
                <input
                  type="text"
                  name="single-course"
                  id="single-course"
                  value={singleCourse}
                  onInput={handleInputChange}
                  placeholder="course"
                />

                <label htmlFor="offering-students">Number of students</label>
                <input
                  type="text"
                  name="offering-students"
                  id="offering-students"
                  value={numberOfParticipants}
                  onInput={handleInputChange}
                  placeholder="number of participants"
                />
                <p className="error-para">{singleCourseError}</p>
                <div
                  onClick={handleSingleCourseAdd}
                  className="single-course-button"
                >
                  Add Course
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="buttons-cont">
          <div className="new-exam-set" onClick={addNewSingleCourse}>
            New Examination Set
          </div>
          <button type="submit" className="generate-new">
            Generate Timetable
          </button>
        </div>
      </form>
    </div>
  );
}

export default GenerateNew;
