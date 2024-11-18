const express = require("express");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", require("./routes"))
  .use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const mongoUrl = process.env.MONGODB_URI;

mongodb.initDb((err, mongodbInstance) => {
  if (err) {
    console.log(err);
    return;
  }

  app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ clientPromise: mongodbInstance.client.connect() }),
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://cse341-project-6k9u.onrender.com/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => done(null, profile)));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => res.redirect("/"));
  app.get("/login", (req, res) => res.send('<h1>Login Page</h1><a href="/auth/google">Login with Google</a>'));

  app.listen(port, () => {
    console.log(`Connected to DB and listening on ${port}`);
  });
});
