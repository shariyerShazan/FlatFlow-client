import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const apartmentPosition = [23.761512, 90.385998]; 

const ApartmentLocation = () => {
  return (
    <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 py-16 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
          Our Apartment Location
        </h2>
        <p className="text-lg text-green-800 mb-10 text-center max-w-3xl mx-auto leading-relaxed">
          Located at Monipuripara, Dhaka — our apartment is easily accessible via major roads and public transport. 
          Enjoy nearby schools, markets, and peaceful surroundings in the heart of the city.
        </p>

        <div className="rounded-xl overflow-hidden shadow-xl border border-green-300">
          <MapContainer
            center={apartmentPosition}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={apartmentPosition}>
              <Popup>
                <strong>FlatFlow Apartment</strong><br />
                House 14, Road 4<br />
                Monipuripara, Dhaka-1215
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-10 text-center text-green-700 font-semibold space-y-2 max-w-md mx-auto">
          <p>🚌 Public Transport: Bus stops & rickshaw stands nearby.</p>
          <p>🚗 Parking: Safe and spacious parking for all residents.</p>
          <p>🛒 Nearby: Schools, shops, mosques & local cafes.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default ApartmentLocation;
