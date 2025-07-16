import React, { useState } from 'react'
import useGetAllMembers from '../../hooks/useGetAllMembers'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { USER_API_END_POINT } from '../../utlis/apiEndPoints'
import Swal from 'sweetalert2' 
function ManageMember() {
    const [fetchMemeberAgain , setFetchMemeberAgain] = useState(false)
  const { members } = useSelector((store) => store.user)
  useGetAllMembers(fetchMemeberAgain)

  const handleRemove = async (memberId) => {
    // Step 1: Confirmation Popup
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to remove this member?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove',
      cancelButtonText: 'Cancel'
    });
  
    // Step 2: If confirmed, proceed to remove
    if (result.isConfirmed) {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/remove-member/${memberId}`, {}, {
          withCredentials: true,
        });
        if (res.data.success) {
         toast(res.data.message)
          setFetchMemeberAgain(prev => !prev);
        } else {
          Swal.fire('Error!', res.data.message || 'Failed to remove member', 'error');
        }
      } catch (error) {
        console.log(error);
        Swal.fire('Error!', 'Something went wrong!', 'error');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Members</h2>
      <table className="w-full border-2  border-favone rounded-md">
        <thead>
          <tr className="bg-favone/30">
            <th className="py-2 px-4 border-2  border-favone">Name</th>
            <th className="py-2 px-4 border-2  border-favone">Email</th>
            <th className="py-2 px-4 border-2  border-favone">Action</th>
          </tr>
        </thead>
        <tbody>
          {members?.length > 0 ? (
            members.map((member) => (
              <tr key={member._id}>
                <td className="py-2 px-4 border-2  border-favone">{member?.fullName}</td>
                <td className="py-2 px-4  justify-center items-center gap-4  border-favone flex">
                    <img className='w-10 h-10 rounded-full object-cover' src={member?.profilePicture} alt="" />
                    {member.email}</td>
                <td className="py-2 px-4 border-2  border-favone">
                  <button
                    className=" bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded w-full cursor-pointer"
                    onClick={() => handleRemove(member._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border text-center" colSpan={3}>
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageMember
