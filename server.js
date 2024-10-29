const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public"))); // This also means that when I go to the localhost it goes immediately to the frontend

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/api", require("./routes")); // Use '/api' prefix for your API routes

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
