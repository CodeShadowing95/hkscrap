const STATUS_CODES = {
  OK: 200,
  RESOUCE_CREATED: 201,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.description = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(name, statusCode, description, isOperational = true) {
    super(name, statusCode, description, isOperational, false, "Erreur");
  }
}

module.exports = {
  AppError,
  APIError,
  STATUS_CODES,
};
