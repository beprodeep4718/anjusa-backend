require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/db");
const authRouter = require("./routes/auth-route");

const PORT = 3000 || process.env.PORT;

// List of allowed origins
const allowedOrigins = [
  "https://www.anjusa.in",
  "https://www.anjusaacademy.com/",
  "http://localhost:5173/",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
    connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
