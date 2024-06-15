const { getUserDetailsFormToken } = require("../middleware/authmiddleware");

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
const updateProfileUser = async (req, res) => {
  // try {
  // } catch (error) {
  //   res.status(500).json({
  //     status: "error",
  //     message: "something is wrong",
  //   });
  // }
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
  getUser,
  getUsers,
  updateProfileUser,
  deleteUser,
};
