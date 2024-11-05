const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

// Initialize MongoDB client for session store
const mongoUrl = process.env.MONGODB_URI;

mongodb.initDb((err, mongodbInstance) => {
  if (err) {
    console.log(err);
  } else {
    // Set up session middleware
    app.use(session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ clientPromise: mongodbInstance.client.connect() }),
    }));

    // Initialize passport and session
    app.use(passport.initialize());
    app.use(passport.session());

    // OAuth configuration for Google
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://cse341-project-6k9u.onrender.com/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    // OAuth Routes
    app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

    app.get("/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        res.redirect("/"); // Redirect to home or dashboard
      }
    );

    // Add the login route here
    app.get("/login", (req, res) => {
      res.send('<h1>Login Page</h1><a href="/auth/google">Login with Google</a>');
    });

    // Serve static files
    app.use(express.static(path.join(__dirname, "public")));

    // Swagger and API routes
    app
      .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
      .use(bodyParser.json())
      .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
      })
      .use("/api", require("./routes"));

    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
