export interface ContextItems {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentTimetable: FullTimetableObject;
  setCurrentTimetable: React.Dispatch<React.SetStateAction<FullTimetableObject>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  UID: string;
  setUID: React.Dispatch<React.SetStateAction<string>>;
}

export interface TimetableData {
  name: string;
  startDate: string;
  endDate: string;
  semester: string;
  generalCourses: GeneralCourseData[];
  specificCourses: SingleDepartmentCourses[];
}

export interface GeneralCourseData {
  courseTitle: string;
  numberOfStudents: number;
  departmentsOffering: string[];
}

export interface GeneralCourseComponentProps {
  allGeneralCourses: GeneralCourseData[];
  indexOf: number;
  setGeneralCourseData: React.Dispatch<
    React.SetStateAction<GeneralCourseData[]>
  >;
}

export interface SingleDepartmentCourses {
  level: string;
  department: string;
  courses: [string, number][];
}

export interface TimetableObject {
  [key: string]: {
    morning: { departmentsOffering: string[]; courses: {[key: string] : number}; population: number };
    afternoon: { departmentsOffering: string[]; courses: {[key: string] : number}; population: number };
    evening: { departmentsOffering: string[]; courses: {[key: string] : number}; population: number };
  };
}

export interface FullTimetableObject{
  name: string;
  startDate: string;
  endDate: string;
  semester: string;
  timetable: TimetableObject;
}

export interface TimetableCardProps{
  timetable: FullTimetableObject;
  showDownload: (id: string) => void;
  id: string;
  deleteTimetable: (id: string) => void;
}
