import React from 'react'
import { GeneralCourseComponentProps, GeneralCourseData } from '../types'

function GeneralCourse({allGeneralCourses, indexOf, setGeneralCourseData} : GeneralCourseComponentProps) {
  return (
    <div className="general-courses-form just-one-general">
              <div className="exam-info">
                <p className='general-course-name'>{allGeneralCourses[indexOf].courseTitle}</p>
                <p className='general-course-name'>{allGeneralCourses[indexOf].numberOfStudents} students</p>
              </div>

              <div className="offering-depts-cont">
                {allGeneralCourses[indexOf].departmentsOffering.map((dept, index) => {
                  return (
                    <div key={index} className="general-course-cont">
                      <span>{dept}</span>
                      <div
                        className="cancel-button"
                        onClick={() => {
                          let newAllCourses: GeneralCourseData[] = [];
                          newAllCourses = allGeneralCourses.map((generalCourse, index) => {
                            if(index === indexOf){
                              return {...allGeneralCourses[indexOf],
                                departmentsOffering:
                                  allGeneralCourses[indexOf].departmentsOffering.filter(
                                    (data, indexno) => {
                                      return indexno !== index;
                                    }
                                  ),}
                            }
                            else{
                              return generalCourse;
                            }
                          })

                          setGeneralCourseData(newAllCourses);
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

              {/* <div className="offering-dept-form-cont">
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
              </div> */}
            </div>
  )
}

export default GeneralCourse
