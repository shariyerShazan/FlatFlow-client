import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetAllAnnouncement from '../../hooks/useGetAllAnnouncement'
import { MdCampaign } from 'react-icons/md'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function AllAnnouncements() {
  const { allAnnouncements } = useSelector((store) => store.announcement)
  const [openIds, setOpenIds] = useState([])

  useGetAllAnnouncement()

  const toggleDescription = (id) => {
    if (openIds.includes(id)) {
      setOpenIds((prev) => prev.filter((item) => item !== id))
    } else {
      setOpenIds((prev) => [...prev, id])
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 space-y-4">
      {allAnnouncements && allAnnouncements?.length > 0 ? (
        allAnnouncements.map((item) => (
          <div
            key={item._id}
            className="border border-favone bg-white rounded-lg p-4 shadow-md transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MdCampaign className="text-favone text-2xl" />
                <h2 className="text-lg font-bold text-favone">{item.title}</h2>
              </div>
              <button
                onClick={() => toggleDescription(item._id)}
                className="text-favone hover:text-favone/80 transition"
              >
                {openIds.includes(item._id) ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {openIds.includes(item._id) && (
              <p className="mt-3 text-gray-700">{item.description}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No announcements available.</p>
      )}
    </div>
  )
}

export default AllAnnouncements
