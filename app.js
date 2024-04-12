
require("dotenv").config();
const express = require('express');
const app = express();
require("hbs");
const path = require("path");
const session = require('express-session')
const crypto = require('crypto');
const bodyParser = require("body-parser");

const {allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const handlebars = require('handlebars')
const exphbs  = require('express-handlebars');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

const userRoute = require("./server/routes/userRoute");
const adminRoute = require("./server/routes/adminRoute");
const connect = require("./server/connection/connection");
// Register the 'eq' helper
handlebars.registerHelper('eq', function(arg1, arg2, options) {
  if (arg1 === arg2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})
handlebars.registerHelper('formatDate', function(startDate) {
  const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`
  console.log(formattedStartDate);
  return  formattedStartDate;
});
const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(handlebars),
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'admin')
});
app.engine('hbs', hbs.engine);




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
