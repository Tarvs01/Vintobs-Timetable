import { useContext } from "react";
import Navbar from "./Navbar";
import MainBody from "./MainBody";
import { Route, Routes } from "react-router-dom";
import TimetableViewer from "./TimetableViewer";
import Error from "./Error";
import Login from "./Login";
import Register from "./Register";
import { AppContext } from "./AppProvider";
import { Navigate } from "react-router-dom";

function Router() {
  const context = useContext(AppContext);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ajustcausewillregistervicecity" element={<Register />} />
        <Route
          path="/"
          element={
            context?.isLoggedIn ?
            <div className="app-cont">
              <Navbar />
              <MainBody />
            </div> : <Navigate to={"/login"} />
          }
        />
        <Route path="/view-timetable" element={context?.isLoggedIn ? <TimetableViewer /> : <Navigate to={"/login"} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default Router;
