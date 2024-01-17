import { useState, PropsWithChildren } from "react";
import { createContext } from "react";
import { ContextItems, FullTimetableObject } from "../types";

const AppContext = createContext<ContextItems | null>(null);

function AppProvider({ children }: PropsWithChildren) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTimetable, setCurrentTimetable] = useState<FullTimetableObject>(
    { name: "", startDate: "", endDate: "", semester: "", timetable: {} }
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UID, setUID] = useState("");
  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentTimetable,
        setCurrentTimetable,
        isLoggedIn,
        setIsLoggedIn,
        UID,
        setUID
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
