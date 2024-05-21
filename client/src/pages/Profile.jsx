import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogout, updateProfile } from "../store/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const [editToggle, setEditToggle] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    setImagePreview(user.image);
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const imageBase64 = await toBase64(compressedFile);
      setImage(compressedFile);
      setImagePreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        return toast.error("Name cannot be empty");
      }
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return toast.error("Invalid phone number format");
      }

      const imageBase64 = image ? await toBase64(image) : null;

      const result = await dispatch(
        updateProfile({ id: user._id, name, phoneNumber, image: imageBase64 })
      ).unwrap();

      setEditToggle(false);
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  if (!user) {
    return <div>Loading...</div>;
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
            <img src={user.image} alt="" className="w-80" />
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
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Profile Picture :
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div
                    {...getRootProps()}
                    className="border rounded w-full py-1 px-2 cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop an image, or click to select one</p>
                  </div>
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
