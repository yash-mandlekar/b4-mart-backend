const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
require("./config/connection"); // Ensure this file connects to MongoDB
const userrouter = require("./routes/userRoutes");
const shoprouter = require("./routes/shopRoutes");
const adminrouter = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dolphin-app-txpas.ondigitalocean.app/",
    ], // Allow only your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieParser());

const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middleware/errors");
app.use("/api/", userrouter);
app.use("/api/", shoprouter);
app.use("/api/admin", adminrouter);

app.all("*", (req, res, next) => {
  next(new ErorrHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(genetatedErrors);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT || 4000}`);
});
