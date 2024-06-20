import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadFile from "../uploadFile/uploadFile";
import axios from "axios";
import Divider from "./Divider";
import { setUser } from "../redux/reducer/userSlice";

const EditUserModel = ({ onClose, userData }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    profile_pic: "",
  });

  const dispatch = useDispatch();
  const updatePhotoRef = useRef();
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (userData) {
      setData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        profile_pic: userData.profile_pic || "",
      });
    }
  }, [userData]);

  const handleOpneUploadPhoto = () => {
    updatePhotoRef.current.click();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePro = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url,
    }));
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/user/updateUserDetails`;
      const response = await axios.put(URL, data, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white m-1 w-full max-w-sm rounded-lg p-5">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form className="grid gap-1 mt-4" onSubmit={handlerSubmit}>
          <div className="flex flex-row gap-1 items-center">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              id="firstName"
              onChange={handleOnChange}
              value={data.firstName}
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              id="lastName"
              className="w-full py-1 px-2 focus:outline-primary"
              onChange={handleOnChange}
              value={data.lastName}
            />
          </div>
          <div className="my-1 border border-black-100 shadow-2xl p-3">
            <label htmlFor="profile_img">
              Photo
              <div className="flex flex-row items-center cursor-pointer">
                <div className="border border-blue-200 w-20 h-20 mt-2 rounded-full shadow-2xl overflow-hidden">
                  <img
                    src={
                      data.profile_pic || userData.profile_pics
                        ? data.profile_pic
                        : "https://picsum.photos/200/300"
                    }
                    width={100}
                    height={100}
                    alt="profile_img"
                  />
                </div>
                <input
                  type="file"
                  name="profile_pic"
                  placeholder="Profile Image"
                  className="w-full bg-slate-100 focus:outline-primary hidden"
                  id="profile_img"
                  onChange={handleChangePro}
                  ref={updatePhotoRef}
                />
                <div className="font-semibold font-serif text-slate-800 ml-5">
                  Change Profile Image
                </div>
              </div>
            </label>
          </div>
          <Divider />
          <div className="flex flex-row justify-between p-2">
            <button
              onClick={onClose}
              className="border border-red-400 py-1 px-4 bg-red-400 rounded shadow-sm opacity-90 text-white text-lg font-semibold"
            >
              Close
            </button>
            <button className="border border-primary py-1 px-4 rounded shadow-sm opacity-90 bg-primary text-white text-lg">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModel;
