import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { APARTMENT_API_END_POINT } from '../../utlis/apiEndPoints';
import { toast } from 'react-toastify';

const CreateListForApartment = () => {
  useEffect(() => {
        document.title = "Create Apartment | FlatFlow";
      }, []);

  const [creating , setCreating] = useState(false)

    const handleListing = async (e)=>{
      setCreating(true)
        e.preventDefault()
        const block = e.target.block.value
        const floor = e.target.floor.value
        const apartmentNo = e.target.apartmentNo.value
        const rent = e.target.rent.value
        const image = e.target.image.files[0]
        const formData = new FormData()
        formData.append("block" ,block )
        formData.append("floor" ,floor )
        formData.append("apartmentNo" ,apartmentNo )
        formData.append("rent" ,rent )
        formData.append("image" ,image )

        try {
            const res = await axios.post(`${APARTMENT_API_END_POINT}/apartments` , formData , {withCredentials: true})

            if(res?.data?.success){
               toast(res.data?.message)
               e.target.reset()
               setCreating(false)
            }
        } catch (error) {
            toast(error?.response?.data?.message)
        }finally{
          setCreating(false)
        }
    }


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16 py-10 gap-10 bg-gray-50">
      
      {/* Left Side: Image or Animation */}
      <div className="w-full flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be" 
          alt="Apartment Illustration"
          className="rounded-2xl shadow-lg w-full max-w-md "
        />
      </div>

      {/* Right Side: Form */}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-favone">Create New Apartment</h2>
        <form onSubmit={handleListing} className="space-y-5">

          <div>
            <label className="block font-semibold mb-1">Block Name</label>
            <input
              type="text"
              name="block"
              placeholder="e.g. A"
              className="w-full border-favone border-2 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Floor Number</label>
            <input
              type="number"
              name="floor"
              placeholder="e.g. 3"
              className="w-full border-favone border-2 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Apartment No</label>
            <input
              type="text"
              name="apartmentNo"
              placeholder="e.g. A3"
              className="w-full border-favone border-2 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Rent</label>
            <input
              type="number"
              name="rent"
              placeholder="e.g. 15000"
              className="w-full border-favone border-2 px-4 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border-favone border-2 px-4 py-2 rounded-md cursor-pointer"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-favone text-white font-semibold w-full py-2 rounded-md hover:bg-favone/90 transition cursor-pointer"
          >
            {creating ? <div className="loading loading-spinner loading-md"></div> : "Create Apartment"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateListForApartment;
