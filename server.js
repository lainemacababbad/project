const express = require("express");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
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

  app.listen(port, () => {
    console.log(`Connected to DB and listening on ${port}`);
  });
});
