const { getGenerateToken } = require("../middleware/authmiddleware");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
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

    // const cookieOption = {
    //   httpOnly: true,
    //   secure: true,
    // };

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successfully",
        token: token,
        status: "success",
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something is wrong",
    });
  }
};

module.exports = {
  register,
  login,
};
