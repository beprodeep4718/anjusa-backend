const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  adminLogin,
  addNotice,
  getNotices,
  deleteNotice,
  updateNotice,
  getNoticeById,
} = require("../controller/notice-control");

router.route("/").get(adminLogin);

router.route("/add-notice").post(upload.single("image"), addNotice);

router.route("/delete-notice/:id").delete(deleteNotice);

router.route("/update-notice/:id").put(updateNotice);

router.route("/notices").get(getNotices);

router.route("/notices/:id").get(getNoticeById);

module.exports = router;
