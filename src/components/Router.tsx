import Navbar from "./Navbar";
import MainBody from "./MainBody";
import { Route, Routes } from "react-router-dom";
import TimetableViewer from "./TimetableViewer";
import Error from "./Error";

function Router() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-cont">
              <Navbar />
              <MainBody />
            </div>
          }
        />
        <Route path="/view-timetable" element={<TimetableViewer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default Router;
