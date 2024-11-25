import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUpload } from "../hooks/useUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const password = e.target.password.value;
      const email = e.target.email.value;
      if (!name || !password || !email) {
        return toast.error("All fields are required");
      }
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return toast.error("all fields are required");
      }
      if (!email.includes("@") && !email.includes(".")) {
        return toast.error("invalid email");
      }
      const { public_id, url } = await useUpload({ image });
      if (!public_id || !url) {
        toast.error("Error uploading image");
        return;
      } else {
        const res = await axios.post("http://localhost:5000/api/signup", {
          name,
          email,
          password,
          profile: url,
          publicId: public_id,
        });
        const data = await res.data;
        if (data.success) {
          toast.success(data.message);
          e.target.reset();
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      toast.error("Image size should be less than 1mb");
    }
    setImage(file);
  };
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <h2 className="font-bold text-xl sm:text-3xl text-white">
        Let's create your profile
      </h2>
      <form className="grid sm:grid-cols-2 gap-5" onSubmit={handleSignup}>
        <div className="flex flex-col gap-5 mt-5">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 sm:mt-5">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 ">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="p-2 border border-gray-700 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-5 ">
          <label htmlFor="profile" className="text-white">
            Profile
          </label>
          <input
            type="file"
            name="profile"
            accept="image/*"
            id="profile"
            onChange={handleImageChange}
            required
            className="p-2 border border-gray-700 rounded-md text-white"
          />
        </div>
        <div>
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-md"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
