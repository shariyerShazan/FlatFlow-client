import axios from 'axios'
import { useEffect } from 'react'
import { ANNOUNCEMENT_API_END_POINT } from '../utlis/apiEndPoints'
import { useDispatch } from 'react-redux'
import { setAllAnnouncements } from '../redux/announcement.slice'

const useGetAllAnnouncement = (dependency = null) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllAnnouncement = async () => {
      try {
        const res = await axios.get(
          `${ANNOUNCEMENT_API_END_POINT}/all-announcement`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setAllAnnouncements(res.data.announcements)) 
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error)
      }
    }

    fetchAllAnnouncement()
  }, [dispatch, dependency])
}

export default useGetAllAnnouncement
