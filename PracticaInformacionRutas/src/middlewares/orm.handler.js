const { ValidationError } = require('sequelize');

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = ormErrorHandler;