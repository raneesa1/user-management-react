import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogout, updateProfile } from "../store/authSlice";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [editToggle, setEditToggle] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status, message } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/user_logout");
      dispatch(UserLogout());
      toast.info("Successfully logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
    setName(user.name);
    setPhoneNumber(user.phoneNumber);
  };

  const handleSave = async () => {
    try {
      const result = await dispatch(
        updateProfile({ id: user._id, name, phoneNumber })
      ).unwrap();
      setEditToggle(false);
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white overflow-hidden rounded-lg border w-80">
        <div
          className="p-2 cursor-pointer border-b flex justify-end uppercase text-stone-500"
          onClick={handleLogout}
        >
          Logout
        </div>
        <div className="px-3 py-4 sm:px-6">
          <div className="place-content-center px-4 py-5 pl-18 rounded">
            <img
              src="https://res.cloudinary.com/dmrb0zb2v/image/upload/v1715324466/l90ly3carldhsfhx0rpi.jpg"
              alt=""
              className="w-80"
            />
          </div>
          <p className="flex justify-end" onClick={handleEditToggle}>
            ✏️
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          {editToggle ? (
            <div className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Full name :
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded w-full py-1 px-2"
                  />
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email :</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number :
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border rounded w-full py-1 px-2"
                  />
                </dd>
              </div>
              <div className="flex justify-end py-3 sm:py-5 sm:px-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditToggle(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Full name :
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email :</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number :
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phoneNumber}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
