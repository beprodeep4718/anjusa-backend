require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (uri) => {
    try {
        const data = await mongoose.connect(uri);
        console.log(`Connected to database 🚀`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

