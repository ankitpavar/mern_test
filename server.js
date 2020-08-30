const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db.js')
const userRoutes = require('./routes/userRoutes')

dotenv.config({ path: './config/config.env' });

// express app initialization
const app = express();

app.use(helmet());
app.use(compression()); //Compress all routes

// DB connection
connectDB();

// view engine


//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/users', userRoutes)


// express server setup
const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log(`Server running on Port ${PORT}`));