import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("AdminJwtToken");
      console.log(token, "admin token from cookie in admin panel page");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/admin_logout", {
        withCredentials: true,
      });
      Cookies.remove("AdminJwtToken");
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/editUser/${userId}`);
  };
  const handleDelete = async (userId) => {
    try {
      const token = Cookies.get("AdminJwtToken");
      await axios.delete(
        `http://localhost:3000/api/admin/deleteUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const handleAddUser = () => {
    navigate("/addUser");
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="flex justify-end mb-4">
        <button
          className="flex bg-black text-white px-2 py-1 rounded"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                Phone Number
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {user.phoneNumber}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => handleEditUser(user._id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="flex bg-red-700 text-white px-2 py-1 rounded mt-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
