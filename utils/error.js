class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = async (err, res) => {

  res.status(500).json({
    message: err.message,
  });
  
};

module.exports = {
  AppError,
  errorHandler,
};
