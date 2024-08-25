const User = require("../models/user-schema");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist)
        return res.status(400).json({ message: "User already exists" });
      if (password.length < 6)
        return res
          .status(403)
          .json({ message: "Password must be atleast 6 character" });
      const newUser = new User({
        name,
        email,
        password,
        phone,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch)
        return res.status(404).json({ message: "incorrect password" });

      res.json({
        message: "Login successful",
        token: await user.generateToken(),
        userId: user._id,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  user: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select({ password: 0 });
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userCtrl;
