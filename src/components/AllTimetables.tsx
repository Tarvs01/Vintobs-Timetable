import {useState, useEffect, useContext} from 'react'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../utils/firebase';
import { FullTimetableObject } from '../types';
import TimetableCard from './TimetableCard';
import DownloadModal from './DownloadModal';
import { AppContext } from './AppProvider';

function AllTimetables() {
  const [allTimetables, setAllTimetables] = useState<{id:string, timetable:FullTimetableObject}[]>([]);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    const q = query(collection(db, "timetable"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    const tempAllTimetables: {id: string, timetable:FullTimetableObject}[] = [];
    querySnapshot.forEach((doc) => {
      tempAllTimetables.push({ timetable: doc.data(), id: doc.id });
    });
    setAllTimetables(tempAllTimetables);
  });
  return () => unsub();
  }, []);

  function showDownload(id: string){
    setShowDownloadModal(true);
    const selectedTimetable = allTimetables.find((atimetable) => atimetable.id === id);
    context?.setCurrentTimetable(selectedTimetable!.timetable);
  }

  function deleteTimetable(id: string){
    deleteDoc(doc(db, "timetable", id)).then((resp) => {
      console.log(resp);
    }).catch((error) => {
      console.log("error");
      console.log(error);
    })
  }

  setTimeout(() => {
    console.log(allTimetables);
  }, 5000);

  return (
    <div>
      <div className="page-heading">
        <h1 className="page-title">All Timetables</h1>
        <p className="page-description">Here, you can view, edit, and manage all your previously generated timetables.</p>
      </div>

      {showDownloadModal && <DownloadModal isModalOpen={setShowDownloadModal} />}
      <div className="all-timetables-cont">
        {allTimetables.map((timetableobj) => {
          return <TimetableCard key={timetableobj.id} id={timetableobj.id} timetable={timetableobj.timetable} showDownload={showDownload} deleteTimetable={deleteTimetable}/>
        })}
      </div>
    </div>
  )
}

export default AllTimetables
