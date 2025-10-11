function videoSubmit(req, res, next) {

    const email = req.header("x-user-email");
    if (!email) {
        return res.status(401).json({ isSuccess: false, message: "Unauthorized" });
    }
    req.body.userEmail = email;
    next();
}

module.exports ={
    videoSubmit
}
