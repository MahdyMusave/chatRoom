import React, { useEffect, useState } from "react";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [photo, setPhoto] = useState("");

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

  const handUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  console.log("photo", photo);
  return (
    <div className="mt-4    ">
      <div
        className="bg-white w-full max-w-lg  mx-2 rounded
       overflow-hidden p-4 px-8"
      >
        <h1>Welcome to Chat app</h1>
        <form onSubmit={""} className="grid gap-4 mt-5">
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
                  <p>{photo.name ? photo?.name : "upload profile photo"}</p>
                </div>
                {
                  <input
                    type="file"
                    name="profile_pic"
                    id="profile_pic"
                    className="bg-slate-100 px-2 py-2 focus:outline-primary hidden"
                    onChange={handUpload}
                    required
                  />
                }
              </label>
            </div>
          </div>

          <input type="submit" value="Register " />
        </form>
      </div>
    </div>
  );
};

export default Register;
