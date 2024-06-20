import React, { useState } from "react";
import { BsChatRightTextFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { TbUserCircle } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import EditUserModel from "./editUserModel";
import { setUser } from "../redux/reducer/userSlice";
import { LuArrowUpLeft } from "react-icons/lu";
import Search from "./Search";
const Sidebar = () => {
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);

  // console.log(user, "user");

  return (
    <>
      <div className="w-full h-full grid grid-cols-[50px,1fr] bg-white">
        <div className="bg-slate-100 w-12 h-full rounded-tr-lg py-5 text-slate-600 flex flex-col justify-between">
          <div>
            <NavLink
              className={({ isActive }) =>
                `w-12 h-12 flex justify-center items-center cursor-pointer hover-bg-slate-200 
              rounded ${isActive && `bg-slate-200`}`
              }
              title="chat"
            >
              <BsChatRightTextFill size={25} />
            </NavLink>
            <div
              title="add friend"
              className="w-12 h-12 flex  justify-center items-center cursor-pointer hover:bg-slate-200 rounded mt-4 "
              onClick={setOpenSearchUser}
            >
              <FaUserPlus size={30} />
            </div>
          </div>
          <div>
            <button
              onClick={() => setEditUserOpen(true)}
              className="w-12 h-12 flex  justify-center items-center cursor-pointer hover:bg-slate-200"
            >
              <TbUserCircle size={30} title={user?.firstName} />
            </button>
            <button
              title="logout"
              className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200  rounded mt-4 "
            >
              <FiLogOut size={26} />
            </button>
          </div>
        </div>
        <div className="w-full ">
          <div className="h-16 flex items-center font-bold text-2xl p-4 text-slate-800 ml-4 ">
            <h3>Message</h3>
          </div>
          <div className="bg-slate-600 border"></div>
          <div className="bg-white  h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scrollbar ">
            {allUser.length === 0 && (
              <div className="px-5 mt-16">
                <div className="flex justify-center items-center my-4 text-slate-500 ">
                  <LuArrowUpLeft size={80} />
                </div>
                <p className="text-2xl py-4 text-center text-slate-400">
                  expolore users to start a conversation with
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {editUserOpen && (
        <EditUserModel onClose={() => setEditUserOpen(false)} userData={user} />
      )}

      {openSearchUser && (
        <Search onClose={() => setOpenSearchUser(false)} userData={user} />
      )}
    </>
  );
};

export default Sidebar;
