const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, {
    //     // useNewUrlParser: true,
    //     // useUnifiedTopology: true,
    //     // tls: true,
    //     // tlsAllowInvalidCertificates: false,
    // });
    await   mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
  })
  .then(() => {
    console.log("DB connection successful");
  });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
