const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      tlsAllowInvalidCertificates: true

    })
    .then((con) => {
      console.log(
        `MongoDB connected to host: ${con.connection.host} on port: ${con.connection.port}`
      );
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1); // Exit the application on database connection error
    });
};

module.exports = connectDatabase;
