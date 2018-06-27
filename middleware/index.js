
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

module.exports = middlewareObj;