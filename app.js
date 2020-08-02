// global variable =====
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// local variable =====
const postsRoutes = require("./routes/posts-routes");
const usersRoutes = require("./routes/users-route");
const HttpError = require("./models/http-error");
const app = express();
const PORT = 5500 || process.env.PORT;
// for get body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "*");
   res.setHeader("Access-Control-Allow-Methods", "*");
   next();
});
// for routers
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
// for middleware address not found
app.use((req, res, next) => {
   const error = new HttpError("Not Found!", 404);
   throw error;
});
// for not found middleware
app.use((error, req, res, next) => {
   if (res.headerSet) {
      return next(error);
   }
   res.status(error.code || 500);
   res.json({ message: error.message || "Error" });
});
// connect mongoose
mongoose
   .connect("mongodb://127.0.0.1:27017/mern", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      // port listen =====
      app.listen(PORT, () => {
         console.log(`Server started on ${PORT} .....`);
      });
      console.log("mongodbConnected .....");
   })
   .catch((err) => console.log(err));
