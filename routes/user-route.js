const router = require("express").Router();
const userCtrl = require("../controller/user-control");
const { auth } = require("../middleware/authMiddleware");

router.route("/register").post(userCtrl.register);
router.route("/login").post(userCtrl.login);
router.route("/userinfo").get(auth, userCtrl.user);

module.exports = router;
