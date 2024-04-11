
require("dotenv").config();
const express = require("express");
const app = express();
require("hbs");
const path = require("path");
const session = require('express-session')
const crypto = require('crypto');
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

const userRoute = require("./server/routes/userRoute");
const adminRoute = require("./server/routes/adminRoute");
const connect = require("./server/connection/connection");
  

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(
  "/css",
  express.static(path.resolve(__dirname, "public/user/assets/css"))
);
app.use(
  "/images",
  express.static(path.resolve(__dirname, "public/user/assets/images"))
);
app.use(
  "/js",
  express.static(path.resolve(__dirname, "public/user/assets/js"))
);
app.use(
  "/libs",
  express.static(path.resolve(__dirname, "public/user/assets/libs"))
);

connect();
app.use("/", userRoute);
app.use('/admin',adminRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/login`);
});
