import { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { FullTimetableObject } from "../types";
import TimetableCard from "./TimetableCard";
import DownloadModal from "./DownloadModal";
import { AppContext } from "./AppProvider";

function AllTimetables() {
  const [allTimetables, setAllTimetables] = useState<
    { id: string; timetable: FullTimetableObject }[]
  >([]);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    const q = query(collection(db, context!.UID));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tempAllTimetables: {
        id: string;
        timetable: FullTimetableObject;
      }[] = [];
      querySnapshot.forEach((doc) => {
        const data: FullTimetableObject = doc.data() as FullTimetableObject;
        tempAllTimetables.push({ timetable: data, id: doc.id });
      });
      setAllTimetables(tempAllTimetables);
    });
    return () => unsub();
  }, [context]); //In case there is any issue, come back to this line. Typescript said I should put context as a dependency and I did to remove the warning. But I wanna leave it empty

  function showDownload(id: string) {
    setShowDownloadModal(true);
    const selectedTimetable = allTimetables.find(
      (atimetable) => atimetable.id === id
    );
    context?.setCurrentTimetable(selectedTimetable!.timetable);
  }

  function deleteTimetable(id: string) {
    deleteDoc(doc(db, context!.UID, id))
      .then((resp) => {
        console.log("delete successful");
        console.log(resp);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }

  setTimeout(() => {
    console.log(allTimetables);
  }, 5000);

  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title">All Timetables</h1>
        <p className="page-description">
          Here, you can view, edit, and manage all your previously generated
          timetables.
        </p>
      </div>

      {showDownloadModal && (
        <DownloadModal isModalOpen={setShowDownloadModal} />
      )}
      <div className="all-timetables-cont">
        {allTimetables.map((timetableobj) => {
          return (
            <TimetableCard
              key={timetableobj.id}
              id={timetableobj.id}
              timetable={timetableobj.timetable}
              showDownload={showDownload}
              deleteTimetable={deleteTimetable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllTimetables;
