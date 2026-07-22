const dns = require("node:dns");


dns.setServers

(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const authCtrl = require("./controllers/auth.js");
const listingCtrl = require("./controllers/listing.js");
const catchAsync = require("./middleware/catch-async.js");
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const isVendor = require("./middleware/is-vendor.js");
const methodOverride = require("method-override");
const { MongoStore } = require("connect-mongo");
const upload = require("./config/multer");
const session = require("express-session");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(passUserToView);

app.get("/", authCtrl.home);
app.get("/auth/sign-up", authCtrl.showSignUpForm);
app.post("/auth/sign-up", catchAsync(authCtrl.signUp));
app.get("/auth/sign-in", authCtrl.showSignInForm);
app.post("/auth/sign-in", catchAsync(authCtrl.signIn));
app.delete("/auth/sign-out", authCtrl.signOut);

app.get("/listings", isSignedIn, catchAsync(listingCtrl.index));
app.get("/listings/index", isSignedIn, catchAsync(listingCtrl.index));
app.get("/dashboard", isSignedIn, authCtrl.dashboard);
app.get("/listings/new", isSignedIn, isVendor, listingCtrl.showNewForm);
app.post("/listings", isSignedIn, isVendor, catchAsync(listingCtrl.create));
app.get("/listings/:id", isSignedIn, catchAsync(listingCtrl.show));
app.post("/listings/:id/reviews", isSignedIn, catchAsync(listingCtrl.createReview));
app.delete("/listings/:id/reviews/:reviewId", isSignedIn, catchAsync(listingCtrl.deleteReview));
app.get("/listings/:id/edit", isSignedIn, catchAsync(listingCtrl.showEditForm));
app.put("/listings/:id", isSignedIn, catchAsync(listingCtrl.update));
app.delete("/listings/:id", isSignedIn, catchAsync(listingCtrl.deleteListing));

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

startServer();
