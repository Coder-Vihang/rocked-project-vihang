const { StatusCodes } = require("../enums")
class CustomError extends Error {
    constructor(message, statusCode = StatusCodes.InternalServerError) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
