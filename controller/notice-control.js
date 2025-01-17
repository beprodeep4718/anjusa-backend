const Notice = require("../models/notice.model");
const cloudinary = require("../config/cloudinary");

const adminLogin = (req, res) => {
  res.json({
    message: "This is the home page",
  });
};

const addNotice = async (req, res) => {
  try {
    const newNotice = new Notice({
      desc: req.body.desc ? req.body.desc.trim() : "",
      Image: req.file
        ? {
            url: req.file.path,
            public_id: req.file.filename,
          }
        : { url: "", public_id: "" },
    });
    await newNotice.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getNotices = async (req, res) => {
  try {
    const data = await Notice.aggregate([{ $sort: { updatedAt: -1 } }]);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findById(id);
    if (notice.Image.public_id) {
      await cloudinary.uploader.destroy(notice.Image.public_id);
    }
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;
    const description = desc.trim();
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { desc: description },
      { new: true }
    );
    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.json(updatedNotice);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Notice.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  adminLogin,
  addNotice,
  getNotices,
  deleteNotice,
  updateNotice,
  getNoticeById,
};
