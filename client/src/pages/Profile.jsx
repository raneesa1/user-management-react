import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const [userLogout] = useUserLogoutMutation();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const handleLogout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(logout());
       navigate("/login");
    } catch (error) {
      console.error("Failed to log out: ", error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white overflow-hidden rounded-lg border w-80">
        <div className="p-2 cursor-pointer border-b flex justify-end" onClick={handleLogout}>
          logout
        </div>
        <div className="px-3 py-4 sm:px-6">
          <div className="place-content-center px-4 py-5 pl-18 rounded">
            <img
              src="https://res.cloudinary.com/dmrb0zb2v/image/upload/v1715324466/l90ly3carldhsfhx0rpi.jpg"
              alt=""
              className="w-80"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name :</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userInfo.user.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email :</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userInfo.user.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number :
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userInfo.user.phoneNumber}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
