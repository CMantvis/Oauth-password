const express =require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const app = express();
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
//set up view engine

app.set("view engine", 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log("connected to database.")
});

//set up routes

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//create home route
app.get("/", (req,res) => {
    res.render('home');
});



app.listen(3000, () => {
    console.log("listening on port 3000..");
});