const express = require("express");
const cors = require("cors")
const app = express();

//have routers required here
const usersRouter = require("./api/users/users.router");


//have error handlers here
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());
app.use(cors())

app.use("/users", usersRouter);


app.use(notFound);
app.use(errorHandler);


module.exports = app;