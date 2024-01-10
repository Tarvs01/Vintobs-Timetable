import React from 'react'

function QuickTour() {
  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title">Quick Tour</h1>
        <p className="page-description">Learn to easily generate timetables for your school.</p>
      </div>

      <div className="quick-tour-main">
        <h3>Create. Customize. Organize. Easily generate your timetable in just three steps.</h3>
        <ul>
          <li>
            <div className="qt-list-words-cont">
              <h4>First step - Enter timetable details</h4>
              <p>This encompasses entering specific details such as the examination title, as well as indicating the commencement and conclusion dates of the examination, along with specifying the relevant semester for comprehensive scheduling.</p>
            </div>

            <div className="qt-img-cont">
              <img src="../images/generate-timetable.png" alt="timetable data" />
            </div>
          </li>

          <li>
            <div className="qt-list-words-cont">
              <h4>Second step - Select the levels and departments to be added and add their corresponding courses</h4>
              <p>Choose the academic levels and departments that are to be incorporated into the timetable. Within each selected level and department, further refine the scheduling by adding the specific courses that are to be taken. This step ensures a tailored and detailed timetable, aligning closely with the unique academic requirements of each level and department.</p>
            </div>
            <div className="qt-img-cont">
              <img src="../images/dept-data.png" alt="dept data" />
            </div>
          </li>

          <li>
            <div className="qt-list-words-cont">
              <h4>Final step - Generate and download the timetable</h4>
              <p>Your timetable creation is complete! Now, seamlessly generate and download your meticulously crafted timetable in your preferred format - be it PDF or image. Your customized timetable is readt for easy access and sharing, providing a convenient solution to your scheduling needs.</p>
            </div>
            <div className="qt-img-cont">
              <img src="../images/download-timetable.png" alt="download timetable" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default QuickTour
