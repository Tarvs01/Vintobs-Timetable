import { useState, useContext } from "react";
import { AppContext } from "./AppProvider";
import { useNavigate } from "react-router-dom";
import { TimetableCardProps } from "../types";

function TimetableCard({timetable, id, showDownload, deleteTimetable} : TimetableCardProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const context = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="timetable-s-cont">
      <div className="submenu-dots-cont">
        {isSubmenuOpen && (
          <div className="submenu-cont">
            <ul>
              <li onClick={() => {
                context?.setCurrentTimetable(timetable);
                navigate("/view-timetable");
                setIsSubmenuOpen(false);
              }}>
                <svg
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  enableBackground="new 0 0 512 512"
                >
                  <g>
                    <path d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z" />
                  </g>
                </svg>
                <span>View</span>
              </li>
              <li onClick={() => {
                showDownload(id);
                setIsSubmenuOpen(false);
              }}>
                <svg
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 471.2 471.2"
                >
                  <g>
                    <g>
                      <path
                        d="M457.7,230.15c-7.5,0-13.5,6-13.5,13.5v122.8c0,33.4-27.2,60.5-60.5,60.5H87.5c-33.4,0-60.5-27.2-60.5-60.5v-124.8
			c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v124.8c0,48.3,39.3,87.5,87.5,87.5h296.2c48.3,0,87.5-39.3,87.5-87.5v-122.8
			C471.2,236.25,465.2,230.15,457.7,230.15z"
                      />
                      <path
                        d="M226.1,346.75c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-62.7,62.8
			V30.75c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
			L226.1,346.75z"
                      />
                    </g>
                  </g>
                </svg>
                <span>Download</span>
              </li>
              <li onClick={() => {
                deleteTimetable(id);
                setIsSubmenuOpen(false);
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
                <span>Delete</span>
              </li>
            </ul>
          </div>
        )}
        <div
          className="dots-cont"
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
        >
          <div className="dots"></div>
          <div className="dots"></div>
          <div className="dots"></div>
        </div>
      </div>
      <p className="timetable-name">{timetable.name}</p>
      <div className="other-params-cont">
        <p>{timetable.semester} semester</p>
        <p>
          {new Date(timetable.startDate).toLocaleDateString()} - {new Date(timetable.endDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default TimetableCard;
