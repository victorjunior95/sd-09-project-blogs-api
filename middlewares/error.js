module.exports = (err, _req, res, _next) => {
  const BAD_REQUEST = 400;
  const INTERNAL_SERVER_ERROR = 500;
  if (err.isJoi) return res.status(BAD_REQUEST).json({ message: err.message });
  if (err.isBoom) {
    return res.status(err.output.payload.statusCode).json({ message: err.output.payload.message });
  }
  return res.status(INTERNAL_SERVER_ERROR).json(err);
};