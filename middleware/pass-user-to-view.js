const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.title = "Vehicle Maintenance Tracker";
    next();
};

module.exports = passUserToView;
