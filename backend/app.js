const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// const stripe=require('stripe')(process.env.STRIPE_SECRET);

const products = require("./routes/Product");
const orders = require("./routes/orders");
const register = require("./routes/registers");
const login = require("./routes/login");
const errorMiddleWare=require('./utils/middlewares/error')
const payment=require("./routes/payment")

app.use(express.json());
app.use(cors());
connectDatabase();
app.use(express.static("../../assets/Profile"))
app.use("/api/v1/", products);
app.use("/api/v1/", orders);
app.use("/api/v1/", register);
app.use("/api/v1/", login);
app.use('/api/v1/', payment)
app.use(errorMiddleWare)
app.listen(process.env.PORT, () => {
  console.log(
    `server is listining at port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

