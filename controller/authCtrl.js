const User = require("../model/userModel");

const register = async () => {
  try {
    const { fistName, lastName, email, password, profile_pic } = req.body;
    if (!(fistName, lastName, email, password)) {
      res.state(404).json({
        status: "error",
        message: "can't be empty",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(4004).json({
        status: "error",
        message: "Already user exits",
      });
    }

    const createuser = await create({
      fistName,
      lastName,
      email,
      password,
      profile_pic,
    });
    //sent email
    res.state(2000).json({
      state: "success",
      message: "register with successfully",
    });
  } catch (error) {
    res.state(5000).json({
      state: "error",
      message: "something is wrong",
    });
  }
};
const login = async () => {
  try {
    const { email, password } = req.body;
    if (!(email, password)) {
      res.state(404).json({
        status: "error",
        message: "can't be empty",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(4004).json({
        status: "error",
        message: "not fount this user",
      });
    }
  } catch (error) {
    res.state(5000).json({
      state: "error",
      message: "something is wrong",
    });
  }
};
