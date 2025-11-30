function logRequest(req, res, next) {
  console.log(`${req?.method} URL: ${req?.originalUrl}`);
  next();
}

export default logRequest;
