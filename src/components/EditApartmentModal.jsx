// components/EditApartmentModal.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { APARTMENT_API_END_POINT } from "../utlis/apiEndPoints";

const EditApartmentModal = ({ apartment, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    block: apartment.block,
    floor: apartment.floor,
    apartmentNo: apartment.apartmentNo,
    rent: apartment.rent,
    available: apartment.available,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) =>
        payload.append(key, val)
      );
      if (image) payload.append("image", image);

      const res = await axios.patch(
        `${APARTMENT_API_END_POINT}/apartments/${apartment._id}`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        onUpdated(); // trigger refresh
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update apartment");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-[90%] max-w-lg"
      >
        <h2 className="text-xl font-bold text-center">Edit Apartment</h2>

        <div>
          <label htmlFor="block" className="block mb-1 font-semibold">
            Block
          </label>
          <input
            id="block"
            type="text"
            name="block"
            value={formData.block}
            onChange={handleChange}
            placeholder="Block"
            className="w-full p-2 border-2 border-favone rounded-md"
          />
        </div>

        <div>
          <label htmlFor="floor" className="block mb-1 font-semibold">
            Floor
          </label>
          <input
            id="floor"
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            placeholder="Floor"
            className="w-full p-2 border-2 border-favone rounded-md"
          />
        </div>

        <div>
          <label htmlFor="apartmentNo" className="block mb-1 font-semibold">
            Apartment No
          </label>
          <input
            id="apartmentNo"
            type="text"
            name="apartmentNo"
            value={formData.apartmentNo}
            onChange={handleChange}
            placeholder="Apartment No"
            className="w-full p-2 border-2 border-favone rounded-md"
          />
        </div>

        <div>
          <label htmlFor="rent" className="block mb-1 font-semibold">
            Rent
          </label>
          <input
            id="rent"
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            placeholder="Rent"
            className="w-full p-2 border-2 border-favone rounded-md"
          />
        </div>

        <div className="flex items-center">
          <input
            id="available"
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="available" className="cursor-pointer select-none">
            Available
          </label>
        </div>

        <div>
          <label htmlFor="image" className="block mb-1 font-semibold">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border-2 border-favone rounded-md px-3 py-2"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white border-2 border-favone rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white border-2 border-favone rounded-md cursor-pointer"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApartmentModal;
