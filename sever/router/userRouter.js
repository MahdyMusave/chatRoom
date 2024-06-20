const router = require("express").Router();

const {
  userDetails,
  updateUserDetails,
  searchUser,
} = require("../controller/userCtrl");
router.get("/userDetails", userDetails);
router.get("/searchUser", searchUser);
// // router.post("/",);
router.put("/updateUserDetails", updateUserDetails);
// router.update("/", updateProfileUser);
// router.delete("/", deleteUser);

module.exports = router;
