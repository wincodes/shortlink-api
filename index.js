const {} = require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");



// initialize express
const app = express();
const { PORT, mongoURI } = process.env

// allow requests from cross origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors());

// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to mongo db
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.options("*", cors());

app.use("/api", routes);

app.use("/health", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Health Check Passed",
  });
});

// Catching none-existing routes and other errors
app.use((req, res, next) => {
  res.status(204).json({
    status: "error",
    message: "Route Not Found",
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`server started at Port ${PORT}`);
});
