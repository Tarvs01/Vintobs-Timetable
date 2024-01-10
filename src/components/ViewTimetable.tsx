import { useContext } from "react";
import { AppContext } from "./AppProvider";

function ViewTimetable({elementRef}: {elementRef?: React.RefObject<HTMLDivElement>}) {
    const context = useContext(AppContext);

    console.log("current timetable is : ");
    console.log(context?.currentTimetable.timetable);

  return (
    <div className="timetable-viewer" style={{width: "100%", margin: "auto"}} ref={elementRef}>
      <div className="tt-head">
      <img src="images/logo.png" alt="futa logo" />
        <div className="timetable-heading" style={{textAlign: "center"}}>
            <h1 style={{margin: "10px", fontSize: "20px"}}> The Federal University of Technology, Akure</h1>
            <h3 style={{marginBottom: "20px", fontSize: "15px"}}>{context?.currentTimetable.name}</h3>
        </div>
      </div>
      <table style={{width: "100%"}}>
        <tr>
          <th>&nbsp;</th>
          <th>Morning</th>
          <th>Afternoon</th>
          <th>Evening</th>
        </tr>
        {Object.keys(context!.currentTimetable.timetable).sort((a,b) => (new Date(a).getTime()) - (new Date(b).getTime())).map((dayKey, index) => {
          return (
            <tr key={index} style={{fontSize: "10px"}}>
              <td>{dayKey}</td>
              <td>
                {Object.keys(context!.currentTimetable.timetable[dayKey].morning.courses).map((course, index) => {
                  return <div key={index}>
                    <p>{course} ({context!.currentTimetable.timetable[dayKey].morning.courses[course]})</p>
                  </div>
                })}
                <div key={index}>
                    <p className="hall">{(() => {
                      const totalStudents = context!.currentTimetable.timetable[dayKey].morning.population;
                      if(totalStudents <= 0){
                        return "---"
                      }
                      else if(totalStudents < 50){
                        return "LT 2"
                      }
                      else if(totalStudents < 120){
                        return "3-in-1 A"
                      }
                      else if(totalStudents < 250){
                        return  "LT 1"
                      }
                      else if(totalStudents < 370){
                        return "ETF"
                      }
                      else{
                        return "1000 capacity"
                      }
                    })()}</p>
                  </div>
              </td>
              <td>
                {Object.keys(context!.currentTimetable.timetable[dayKey].afternoon.courses).map((course, index) => {
                  return <div key={index}>
                  <p>{course} ({context!.currentTimetable.timetable[dayKey].afternoon.courses[course]})</p>
                </div>
                })}
                <div key={index}>
                    <p className="hall">{(() => {
                      const totalStudents = context!.currentTimetable.timetable[dayKey].afternoon.population;
                      if(totalStudents <= 50){
                        return "---";
                      }
                      else if(totalStudents < 50){
                        return "LT 2"
                      }
                      else if(totalStudents < 120){
                        return "3-in-1 A"
                      }
                      else if(totalStudents < 250){
                        return  "LT 1"
                      }
                      else if(totalStudents < 300){
                        return "ETF"
                      }
                      else{
                        return "1000 capacity"
                      }
                    })()}</p>
                  </div>
              </td>
              <td>
                {Object.keys(context!.currentTimetable.timetable[dayKey].evening.courses).map((course, index) => {
                  return <div key={index}>
                  <p>{course} ({context!.currentTimetable.timetable[dayKey].evening.courses[course]})</p>
                </div>
                })}
                <div key={index}>
                    <p className="hall">{(() => {
                      const totalStudents = context!.currentTimetable.timetable[dayKey].evening.population;
                      if(totalStudents <= 0){
                        return "---"
                      }
                      else if(totalStudents < 50){
                        return "LT 2"
                      }
                      else if(totalStudents < 120){
                        return "3-in-1 A"
                      }
                      else if(totalStudents < 250){
                        return  "LT 1"
                      }
                      else if(totalStudents < 300){
                        return "ETF"
                      }
                      else{
                        return "1000 capacity"
                      }
                    })()}</p>
                  </div>
              </td>
            </tr>
          );
        })}
      </table>
      <ul className="exam-halls-list">
        <li>LT 2: 100 capacity</li>
        <li>3-in-1 A: 240 capacity</li>
        <li>LT 1: 500 capacity</li>
        <li>ETF: 740 capacity</li>
        <li>1000 capacity: 1000 capacity</li>
      </ul>
    </div>
  );
}

export default ViewTimetable;
