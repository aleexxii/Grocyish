
require("dotenv").config();
const express = require('express');
const app = express();
// require("hbs");
const path = require("path");
const session = require('express-session')
const crypto = require('crypto');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
//for eq function
// const handlebars = require('handlebars')
// const exphbs  = require('express-handlebars');
const nocache = require('nocache');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

const userRoute = require("./server/routes/userRoute");
const adminRoute = require("./server/routes/adminRoute");
const connect = require("./server/connection/connection");




app.set("views",path.join(__dirname,"views"))






app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

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
app.use(nocache())

connect();
app.use("/", userRoute);
app.use('/admin',adminRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/login`);
});
