const { getUserDetailsFormToken } = require("../middleware/authmiddleware");
const User = require("../model/userModel");
const userDetails = async (req, res) => {
  // return console.log(req.cookies);
  try {
    const token = req.cookies.token || "";
    // return console.log(token);
    const user = await getUserDetailsFormToken(token);

    return res.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "auth token is required",
    });
  }
};
const updateUserDetails = async (req, res) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token || "";
    // return console.log(token);
    const user = await getUserDetailsFormToken(token);
    // return console.log(user);
    const { firstName, profile_pic } = req.body;
    const updateUser = await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          firstName,
          profile_pic,
        },
      },
      {
        new: true,
      }
    );

    const userInformation = await User.findById(user._id);
    res.status(200).json({
      message: "update with successfully ",
      data: userInformation,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "you can't update ",
      status: "error",
    });
  }
};

const getUser = async (req, res) => {
  // try {
  // } catch (error) {
  //   res.status(500).json({
  //     status: "error",
  //     message: "something is wrong",
  //   });
  // }
};
const getUsers = async (req, res) => {
  // try {
  // } catch (error) {
  //   res.status(500).json({
  //     status: "error",
  //     message: "something is wrong",
  //   });
  // }
};
const updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something is wrong",
    });
  }
};
const deleteUser = async (req, res) => {
  // try {
  // } catch (error) {
  //   res.status(500).json({
  //     status: "error",
  //     message: "something is wrong",
  //   });
  // }
};
module.exports = {
  userDetails,
  updateUserDetails,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
