const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");

const port = process.env.PORT || 5000;

const app = express();

// @middlewares

app.use(express.json()); //for Jason Body{}
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require(`./routes/goalRoutes`));

// It will overwrite the default express error handler...
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
