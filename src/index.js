const express = require("express");
const { json, urlencoded } = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");

// Creating app and loading .env
const app = express();
dotenv.config();

// Loading middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
if (process.env.ENVIRONMENT == "DEV") {
  app.use(morgan("dev"));
}

// Loading routes
const path = `${require.main.path}/routes`;
fs.readdirSync(path).forEach((file) => {
  try {
    const fileNameWithoutExtension = file.replace(".js", "");
    app.use(`/${fileNameWithoutExtension}`, require(`./routes/${file}`));
  } catch (error) {
    console.error(error);
  }
});

// Listening port
app.listen(process.env.PORT || 8000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
