import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import app from './app.js';

// load env from src/env (project uses src/env instead of root .env)
dotenv.config({ path: './src/env' });
const PORT = process.env.PORT || 5000;

// Connect DB and start server


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})