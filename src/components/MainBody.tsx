import React, {useContext} from 'react'
import GenerateNew from './GenerateNew'
import AllTimetables from './AllTimetables'
import QuickTour from './QuickTour'
import { AppContext } from './AppProvider'

function MainBody() {
    const context = useContext(AppContext);
  return (
    <div className='main-body'>
      {
        context?.currentPage === 1 && <GenerateNew />
      }
      {
        context?.currentPage === 2 && <AllTimetables />
      }
      {
        context?.currentPage === 3 && <QuickTour />
      }
    </div>
  )
}

export default MainBody
