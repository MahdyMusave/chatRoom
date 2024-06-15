const JWT = require("jsonwebtoken");
const User = require("../model/userModel");
const getGenerateToken = (tokenData) => {
  // return console.log(tokenData);
  const token = JWT.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return token;
};

const getUserDetailsFormToken = async (token) => {
  // return console.log(token);
  if (!token) {
    return {
      message: "session out",
      logOut: true,
    };
  }

  const decode = await JWT.verify(token, process.env.JWT_SECRET);
  // return console.log(decode);
  const user = await User.findById(decode.id).select("-password");
  // return console.log(user);
  return user;
};

module.exports = { getGenerateToken, getUserDetailsFormToken };
