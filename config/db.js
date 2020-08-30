const mongoose = require('mongoose');

//establish connection to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      server: {
        socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 },
      },
      replset: {
        socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 },
      },
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
  }
};

module.exports = connectDB;
