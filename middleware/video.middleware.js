const { StatusCodes } = require("../enums")
function videoSubmit(req, res, next) {

    const email = req.header("x-user-email");
    if (!email) {
        return res.status(StatusCodes.Unauthorised).json({ isSuccess: false, message: "Unauthorized: EmailId not found" });
    }
    req.body.userEmail = email;
    next();
}

module.exports = {
    videoSubmit
}
