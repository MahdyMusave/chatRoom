const router = require("express").Router();

const {
  userDetails,
  // getUser,
  // getUsers,
  // updateProfileUser,
  // deleteUser,
} = require("../controller/userCtrl");
router.get("/userDetails", userDetails);
// // router.post("/",);
// router.put("/", getUsers);
// router.update("/", updateProfileUser);
// router.delete("/", deleteUser);

module.exports = router;
