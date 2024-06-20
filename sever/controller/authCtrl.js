const { getGenerateToken } = require("../middleware/authmiddleware");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  // return console.log(req.body);
  try {
    const { firstName, lastName, email, password, profile_pic } = req.body;

    if (
      (firstName === undefined,
      lastName === undefined,
      email === undefined,
      password === undefined)
    ) {
      res.status(400).json({
        status: "error",
        message: "can't be empty",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        status: "error",
        message: "Already user exits",
      });
      return;
    }

    const createuser = await User.create({
      firstName,
      lastName,
      email,
      password,
      profile_pic,
    });

    //sent email

    res.status(200).json({
      status: "success",
      message: "register with successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something is wrong",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        status: "error",
        message: "can't be empty",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.checkPassword(password, user.password))) {
      res.status(400).json({
        status: "error",
        message: "not found this user or password",
      });
      return;
    }

    // create token
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = getGenerateToken(tokenData);

    const addTokenUser = await User.findByIdAndUpdate(
      user._id,
      {
        token: token,
      },
      { new: true }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
        // maxAge: "2d",
      })
      .status(200)
      .json({
        message: "Login successfully",
        token: token,
        status: "success",
        data: addTokenUser,
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something is wrong",
    });
  }
};

const logout = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.token)
    return res.status(400).json({
      message: "No refresh token in cookie",
    });

  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    const user = await User.findOne({
      token: cookie.token,
    });
    // return console.log(user);
    if (!user)
      return res.clearCookie("token", cookieOptions).status(204).json({
        message: "User not found",
        status: "error",
      });

    return res.clearCookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      status: "error",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
