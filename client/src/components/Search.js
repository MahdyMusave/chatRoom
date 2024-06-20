import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import LoadingIcon from "./loadingIcon";
import UserSarahCart from "./userSearchChat";
import { IoClose } from "react-icons/io5";
import axios from "axios";
const Search = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSetSearchValue] = useState("");

  const handleSubmitUser = async () => {
    try {
      setLoading(true);
      const URL = `${process.env.REACT_APP_BACKEND_URL}/user/searchUser/?search=${searchValue}`;
      const response = await axios.get(URL, { withCredentials: true });
      // console.log(response, "search response");
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleSubmitUser();
  }, [searchValue]);
  return (
    <div className="fixed top-0 left-0 right-1 bg-slate-800 bg-opacity-40 z-10 h-screen p-2 ">
      <div className="w-full max-w-md mx-auto mt-10 m-2 ">
        {/*input search user */}
        <div className="bg-white rounded overflow-hidden flex flex-row items-center ">
          <input
            type="text"
            name="search"
            placeholder="search"
            className="w-full outline-none py-3 h-full px-4 rounded"
            onChange={(e) => setSetSearchValue(e.target.value)}
            value={searchValue}
          />
          <ImSearch className="mr-3 text-slate-500" />
        </div>
        {/*display search user */}
        <div className="searchBar-user-box bg-white wt-2 w-full p-4 rounded mt-1 overflow-y-auto border ">
          {/**no user found */}
          {searchUser.length === 0 && !loading && (
            <>
              <p className="text-center text-slate-500">no user found</p>
            </>
          )}
          {loading && (
            <p>
              <LoadingIcon />
            </p>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser?.map((user, index) => {
              return (
                <UserSarahCart key={index} data={user} onClick={onClose} />
              );
            })}
        </div>
      </div>
      <div
        className="absolute top-2 right-4 text-3xl p-2 lg:text-4xl"
        onClick={() => onClose(true)}
      >
        <IoClose className="hover:text-red-600" />
      </div>
    </div>
  );
};

export default Search;
