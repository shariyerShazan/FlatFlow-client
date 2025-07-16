import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import AboutBuilding from '../components/AboutBuilding'
import CouponsSection from '../components/CouponsSection'
import FooterSection from '../components/FooterSection'
import ApartmentLocation from '../components/ApartmentLocation'

const HomePage = () => {
  useEffect(() => {
    document.title = "Home | FlatFlow";
  }, []);
  return (
    <div>
      <Banner />
      <ApartmentLocation />
      <CouponsSection />
      <AboutBuilding />
      {/* <FooterSection /> */}
    </div>
  )
}

export default HomePage
