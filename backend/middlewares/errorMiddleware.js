// @change the content type of Error Handler from Text/html to -----

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,

    // @stact-trace gives us addittional info bt hre only we wnt if we r in dev mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
