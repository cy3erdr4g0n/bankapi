class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 400;
  }
}

const errorHandler = async (err, res) => {
  const statusCode = err.statusCode || 500;

  res.status(500).json({
    message: err.message,
  });
};

module.exports = {
  AppError,
  errorHandler,
};
