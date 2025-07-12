import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ANNOUNCEMENT_API_END_POINT } from '../../utlis/apiEndPoints';


function MakeAnnouncement() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    try {
      const res = await axios.post(
        `${ANNOUNCEMENT_API_END_POINT}/create-announcement`,
        { title, description },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        e.target.reset(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to make announcement");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side Image */}
        <div className="hidden md:block">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jcHkW1crqIhywqcD_vgxDLzY22tXEYnDqA&s"
            alt="Announcement"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-favone text-center">
            Make an Announcement
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Announcement title"
                className="w-full border-2 px-4 py-2 rounded-md border-favone"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write description here..."
                className="w-full border-2 px-4 py-2 rounded-md resize-none border-favone"
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-favone text-white px-6 py-2 rounded hover:bg-favone/90 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MakeAnnouncement;
