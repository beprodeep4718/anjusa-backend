require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/db");
const noticeRouter = require("./routes/notice-route");

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

//! List of allowed origins
const allowedOrigins = [
  'https://www.anjusaacademy.com',
  'https://www.anjusa.in',
  'http://localhost:5173',
  'http://192.168.131.193:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions));

app.use(express.json());

app.use("/api", noticeRouter);
app.use("/user", require("./routes/user-route"));
app.get('/', (req, res) => {
  res.send('Welcome to the Notice API');
})

const start = () => {
  try {
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT} 🎉`);
    });
    connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
