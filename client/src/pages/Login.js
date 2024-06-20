import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbUserCircle } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/reducer/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

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

  const handlerSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

    try {
      const response = await axios({
        method: "POST",
        url: URL,
        data: {
          email: data.email,
          password: data.password,
        },
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      // console.log("response", response.data.status === "success");
      if (
        response.data.status === "success" &&
        (response.data.status === "success") === true
      ) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        setData({
          email: "",
          password: "",
        });
        navigate("/", {
          state: response.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log("error", error.response.data.message);
    }
    console.log("data", data);
  };

  return (
    <>
      <div className="mt-4  ">
        <div
          className="bg-white w-full max-w-lg  mx-2 rounded mx-auto 
       overflow-hidden p-4 px-8"
        >
          <div className="w-fit mx-auto mb-2">
            <TbUserCircle size={80} />
          </div>

          <h1 className="text-emerald-700  font-bold mx-auto text-center">
            Start to Chat Now
          </h1>
          <form onSubmit={handlerSubmit} className="grid gap-4 mt-5">
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
            </div>

            <button
              className="bg-primary text-lg px-4 py-1 hover:bg-teal-600 text-zinc-50 font-bold text-2xl py-2 tracking-wide leading-relaxed 
           rounded-lg mt-3"
            >
              Login
            </button>
          </form>
          <p className="mt-2">
            Register Now ?
            <Link
              to={"/register"}
              className="hover:text-primary text-sm font-semibold ml-1 "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
