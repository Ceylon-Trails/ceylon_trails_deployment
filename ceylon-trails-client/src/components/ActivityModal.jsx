/* eslint-disable react/prop-types */


import { useRef, useState } from "react";
import Activity from "./Activity"
import ActivityMapModal from "./ActivityMapModal";


const ActivityModal = ({ activityRef, selectedActivity }) => {
  const activityMapModalRef = useRef();
  const activityCollection = selectedActivity ? selectedActivity.activities : [];
  const [activity,setActivity] = useState()

  const handleActivityMapModal = (activity) => {
    setActivity(activity);
    activityMapModalRef.current.showModal();
  }

  return (
    <div>
      <dialog ref={activityRef} id="my_modal_4" className="modal backdrop-blur-sm overflow-y-scroll">
        <div className="modal-box w-11/12 max-w-7xl flex-col font-jomhuria text-4xl sm:text-5xl md:text-6xl text-white bg-base-500/30 border-2 border-gray-500 h-[650px]">
          <form method="dialog">
            <button className="absolute hover:cursor-pointer hover:bg-red-400 border-0 text-lg hover:text-white top-4 right-4 btn font-abhaya">X</button>
          </form>
          {selectedActivity ? selectedActivity.name : "Activity Details"}

          <div className="grid grid-cols-2 gap-4 gap-y-8 sm:grid-cols-3 mt-5 md:grid-cols-3">
            {
              Array.isArray(activityCollection) && activityCollection.map((item, index) => (
                <Activity handleActivityMapModal={() => handleActivityMapModal(item)} key={index} image={item.images[0].img} name={item.name} desc={item.desc} />
              ))
            }
          </div>
        </div>
      </dialog>
      <ActivityMapModal activityMap={activityMapModalRef} item={activity}/>
    </div>

  )
}

export default ActivityModal
