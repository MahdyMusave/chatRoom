import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, setUser } from "../redux/reducer/userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const userFetchDeails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/user/userDetails`;
      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));
      // console.log(response.data.data.logOut, "userDetails");
      if (response.data.data.logOut) {
        // dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    userFetchDeails();
  }, []);
  const basePath = location.pathname === "/";

  return (
    <>
      <div className="grid grid-cols-[380px,1fr] h-screen max-h-screen border border-red-500">
        <div className={`bg-white ${!basePath && "hidden"} lg-block`}>
          <Sidebar />
        </div>

        <section className={`${basePath && "hidden"}`}>
          <Outlet />
        </section>
        <div className="flex justify-center items-center flex-col gap-2">
          <div className="">
            <img src="./images/homepage_2.png" alt="log_img" />
          </div>
          <p className="text-2xl italic font-serif font-semibold  text-slate-500  ">
            select a user to send message
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
