import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import AboutBuilding from '../components/AboutBuilding'
import CouponsSection from '../components/CouponsSection'
import ApartmentLocation from '../components/ApartmentLocation'
import FeedbackSection from '../components/FeedbackSection'
import AvailableApartmentList from '../components/AvailableApartmentList'

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | FlatFlow";
  }, []);
  return (
    <div>
      <Banner />
      <ApartmentLocation />
      <div>
              <AvailableApartmentList />
           </div>
      <CouponsSection />
      <AboutBuilding />
      <FeedbackSection />
         
    </div>
  )
}

export default HomePage
