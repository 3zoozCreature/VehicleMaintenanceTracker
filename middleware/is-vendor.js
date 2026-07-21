const isVendor = (req, res, next) => {
    if (req.session.user && req.session.user.role === "vendor") {
        return next();
    }

    res.redirect("/listings");
};

module.exports = isVendor;