const mongoose = require("mongoose");
require("dotenv").config();

const dbConfig = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected ", conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConfig
