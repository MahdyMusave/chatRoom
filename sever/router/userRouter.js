const router = require("express").Router();

const {
  userDetails,
  updateUser,
  updateUserDetails,
  // getUser,
  // getUsers,
  // updateProfileUser,
  // deleteUser,
} = require("../controller/userCtrl");
router.get("/userDetails", userDetails);
// // router.post("/",);
router.put("/updateUserDetails", updateUserDetails);
// router.update("/", updateProfileUser);
// router.delete("/", deleteUser);

module.exports = router;
