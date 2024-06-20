import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../uploadFile/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setData((prev) => {
      console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handUpload = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    // console.log("uploadPhoto", uploadPhoto);
    setPhoto(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  // console.log("photo", photo);
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPhoto(null);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/auth/register`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);
      // console.log("response", response.data.status === "success");

      if (
        response.data.status === "success" &&
        (response.data.status === "success") === true
      ) {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log("error", error.response.data.message);
    }
    console.log("data", data);
  };

  return (
    <div className="mt-4  ">
      <div
        className="bg-white w-full max-w-lg  mx-2 rounded mx-auto 
       overflow-hidden p-4 px-8"
      >
        <h1>Welcome to Chat app</h1>
        <form onSubmit={handlerSubmit} className="grid gap-4 mt-5">
          {/* Add form fields for registration */}
          <div className=" flex flex-col gap-1">
            <label htmlFor="firstName">FirstName :</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="enter your First Name"
              className="bg-slate-100 px-2 py-2 focus:outline-primary"
              value={data.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="lastName">LastName :</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="enter your lats Name"
              className="bg-slate-100 px-2 py-2 focus:outline-primary"
              onChange={handleChange}
              value={data.lastName}
              required
            />
          </div>
          <div className=" flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter your email"
              className="bg-slate-100 px-2 py-2 focus:outline-primary"
              onChange={handleChange}
              value={data.email}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter your password"
              className="bg-slate-100 px-2 py-2 focus:outline-primary"
              onChange={handleChange}
              value={data.password}
              required
            />
            <div className="flex flex-col  gap-1 mt-3">
              <label htmlFor="profile_pic">
                photo
                <div
                  className="h-14 bg-slate-200 flex justify-center items-center border cursor-pointer
                 hover:border mt-1"
                >
                  <p className=" text-sm max-w-[300px] text-ellipsis line-clamp-1">
                    {photo?.name ? photo?.name : "upload profile photo"}
                  </p>
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    {photo?.name && <RiCloseFill />}
                  </button>
                </div>
                {
                  <input
                    type="file"
                    name="profile_pic"
                    id="profile_pic"
                    className="bg-slate-100 px-2 py-2 focus:outline-primary "
                    onChange={handUpload}
                  />
                }
              </label>
            </div>
          </div>

          <button
            className="bg-primary text-lg px-4 py-1 hover:bg-teal-600 text-zinc-50 font-bold text-2xl py-2 tracking-wide leading-relaxed 
           rounded-lg mt-3"
          >
            Register
          </button>
        </form>
        <p className="mt-2">
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="hover:text-primary text-sm font-semibold "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
