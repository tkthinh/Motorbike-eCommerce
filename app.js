const path = require("path");
const express = require("express");
const expressSession = require("express-session");

const sessionConfigurator = require("./util/session");
const db = require("./database/database");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/auth-check");

const authRoutes = require("./routes/auth-routes");
const productRoutes = require("./routes/product-routes");
const baseRoutes = require("./routes/base-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = sessionConfigurator.createSessionConfig();

app.use(expressSession(sessionConfig));

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Khong the ket noi den co so du lieu");
    console.log(error);
  });
