import React from "react";
import { Link } from "react-router-dom";

const UserSarahCart = ({ data, onClose }) => {
  console.log(data, "datat");
  return (
    <Link to={`${data?._id}`} onCLick={onClose}>
      <div className="flex flex-row gap-5 items-center mt-3 border p-4 hover:border-primary rounded cursor-pointer ">
        <div className="pro_img h-16 w-16  rounded-full overflow-hidden shadow-lg ">
          <img
            src={
              data?.profile_pic
                ? data?.profile_pic
                : "https://picsum.photos/200/300"
            }
            alt="profile_img"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold italic font-serif text-slate-800 tracking-wide">
            {data.firstName + data.lastName}
          </h3>
          <h3>{data.email}</h3>
        </div>
      </div>
    </Link>
  );
};

export default UserSarahCart;
