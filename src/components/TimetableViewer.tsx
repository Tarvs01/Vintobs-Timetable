import {useState} from 'react'
import ViewTimetable from './ViewTimetable'
import DownloadModal from './DownloadModal'

function TimetableViewer() {
    const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  return (
    <div className='timetable-viewer-cont'>
      <ViewTimetable />

      {showDownloadModal && <DownloadModal isModalOpen={setShowDownloadModal}/>}

      <button className="download-button" onClick={() => {
        setShowDownloadModal(true);
      }}>Download Timetable</button>
    </div>
  )
}

export default TimetableViewer
