const { Aggregate } = require("mongoose");
const Notice = require("../models/admin-schema");

const adminLogin = (req, res) => {
  res.json({
    message: "This is the home page",
  });
};

const addNotice = async (req, res) => {
  try {
    const { desc } = req.body;
    const newNotice = new Notice({ desc });
    await newNotice.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getNotices = async (req, res) => {
  try {
    const data = await Notice.aggregate([{ $sort: { createdAt: -1 } }]);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
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

module.exports = { adminLogin, addNotice, getNotices, deleteNotice };
