require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./utils/db');
const authRouter = require('./routes/auth-route');

const PORT = 3000 || process.env.PORT ;

const corsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.181.193:5173'],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRouter);

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`listening on ${PORT}`);
        })
        connectDB(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
    }
}

start();