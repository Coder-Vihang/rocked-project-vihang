const { StatusCodes, ErrorMessages } = require("../enums")
const { Constants } = require("../constants")
function videoSubmit(req, res, next) {

    const email = req.headers["x-user-email"];
    if (!email) {
        return res.status(StatusCodes.Unauthorised).json({ isSuccess: false, message: ErrorMessages.emailNotFoundInHeaders });
    }
    req.body.userEmail = email;

    const emailRegex = Constants.RegexValidations.EmailRegexValidations;

    if (!emailRegex.test(email)) {
        return res.status(StatusCodes.BadRequest).json({ isSuccess: false, message: ErrorMessages.invalidEmailFormat });
    }
    next();
}

module.exports = {
    videoSubmit
}
