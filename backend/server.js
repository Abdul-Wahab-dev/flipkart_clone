const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const http = require("http");
const path = require("path");
const cors = require("cors");
const app = express();

// Middleware
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// cors middleware
app.use(cors());
// passport Config
require("./config/passport")(passport);
// GLobal Error Handling class
const AppError = require("./Utils/appError");
const globalErrorController = require("./Utils/globalErrorController");
// Routes

const users = require("./routes/api/user");
const products = require("./routes/api/products");
// DB config
const db = require("./config/keys");
// connect to MongoDB
mongoose
  .connect(db.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

// use routes
app.use("/api/user", users);
app.use("/api/products", products);
// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Handle unhandling route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorController);
// socket io server setup
const server = http.createServer(app);
// server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log("server is running at port " + PORT);
});
