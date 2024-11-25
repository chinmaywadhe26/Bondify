import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoHeartSharp, IoClose } from "react-icons/io5";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex]  = useState(0);
  const { user } = useContext(AppContext);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/getUsers");
    const { data } = await res.data;
    const filteredUsers = data.filter(
      (u) =>
        u._id !== user._id &&
        !user?.disliked?.includes(u._id) &&
        !user?.favourites?.includes(u._id)
    );
    setUsers(filteredUsers);
    console.log(users);
  };

  const addToFav = async (id) => {
      const res = await axios.put("http://localhost:500/api/addToFav" + id, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      const data = await res.data;
      if(data.success){
        toast.success(data.message);
        nextProfile();
      }else{
        toast.error(data.message);
      }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex justify-center items-center my-10 sm:my-32">
      <div className="relative rounded-lg shadow-lg bg-black overflow-hidden w-[75vw] h-[100vw] sm:w-[25vw] sm:h-[60vh]">
        {/* User Profile Image */}
        <img
          src={users[0]?.profile}
          alt={users[0]?.name || "Profile"}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />

        {/* Gradient Overlay and User Details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h1 className="text-white text-xl font-semibold">
              {users[0]?.name}
            </h1>
            <p className="text-white text-sm">{users[0]?.email}</p>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
              {/* Dislike Button */}
              <button
                onClick={() => addToDis(users[0]?._id)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-red-500 transition-all duration-300 ease-in-out"
              >
                <IoClose className="text-red-500 text-3xl hover:text-white" />
              </button>

              {/* Like Button */}
              <button
                onClick={() => addToFav(users[0]?._id)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300 ease-in-out"
              >
                <IoHeartSharp className="text-blue-500 text-3xl hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
