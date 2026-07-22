const User = require("../models/user");
const bcrypt = require("bcrypt");

const home = (req, res) => {
    res.render("home.ejs", {
        user: req.session.user,
        title: "Home | Vehicle Maintenance Tracker",
    });
};

const showSignUpForm = (req, res) => {
    res.render("auth/sign-up.ejs", {
        user: req.session.user,
        title: "Sign Up | Vehicle Maintenance Tracker",
    });
};

const signUp = async (req, res) => {
    let selectedRole = "regular";

    if (req.body.role === "vendor") {
        selectedRole = "vendor";
    }

    const userInDatabase = await User.findOne({
        username: req.body.username,
    });

    if (userInDatabase) {
        return res.send("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        username: req.body.username,
        role: selectedRole,
        password: hashedPassword,
    };

    const user = await User.create(userData);

    req.session.user = {
        username: user.username,
        id: user.id,
        role: user.role,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const showSignInForm = (req, res) => {
    res.render("auth/sign-in.ejs", {
        user: req.session.user,
        title: "Sign In | Vehicle Maintenance Tracker",
    });
};

const signIn = async (req, res) => {
    const userInDatabase = await User.findOne({
        username: req.body.username,
    });

    if (!userInDatabase) {
        return res.send("User does not exist");
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        userInDatabase.password
    );

    if (!validPassword) {
        return res.send("Login failed");
    }

    req.session.user = {
        username: userInDatabase.username,
        id: userInDatabase.id,
        role: userInDatabase.role,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const signOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

const dashboard = (req, res) => {
    res.render("dashboard.ejs", {
        user: req.session.user,
        title: "Dashboard | Vehicle Maintenance Tracker",
    });
};

module.exports = {
    home,
    showSignUpForm,
    signUp,
    showSignInForm,
    signIn,
    signOut,
    dashboard,
};
