const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Router/authRouter");
const PaymentRouter = require("./Router/paymentRouter");
const RegisterRouter = require("./Router/registerRouter");
const cookieParser = require("cookie-parser");

// load env variable
require("dotenv").config();

// intialize express
const app = express();

// add middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/auth", AuthRouter);
app.use("/payment", PaymentRouter);
app.use("/register", RegisterRouter);

// Connect to MongoDb

const DB_URL = process.env.MONGODB_URI;
mongoose.connect(DB_URL);
const connect = mongoose.connection;
connect.once("open", () => {
  console.log("Successfully connected to database");
});
connect.on("error", () => {
  console.log("Failed to connect to database");
});

// for test the server
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on ${PORT}`);
});
