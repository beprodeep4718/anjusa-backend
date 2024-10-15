const express = require("express");
const router = express.Router();

const {
  adminLogin,
  addNotice,
  getNotices,
  deleteNotice,
  updateNotice,
} = require("../controller/notice-control");

router.route("/").get(adminLogin);

router.route("/add-notice").post(addNotice);

router.route("/delete-notice/:id").delete(deleteNotice);

router.route("/update-notice/:id").put(updateNotice);

router.route("/notices").get(getNotices);

module.exports = router;
