const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db');

const authRouter = require('./routers/authRoutes')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
    origin: 'https://collab-hub-lac.vercel.app'
}));
app.use(express.json())



app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hi');
})

app.listen(PORT, (req, res) => {
    console.log('Server running')
})