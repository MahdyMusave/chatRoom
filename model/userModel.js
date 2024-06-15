const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last Name is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },

    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }

  try {
    const salt = await bcrypt.genSalt(10);

    this.password = bcrypt.hashSync(this.password, salt);
    return next();
  } catch (error) {
    next(error);
  }
});

// like for forget password
userSchema.methods.checkPassword = async function (
  enterPassword,
  correctPassword
) {
  // return console.log(this, password);
  return await bcrypt.compare(enterPassword, correctPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
