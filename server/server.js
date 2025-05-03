import express from "express";

import routes from "./src/routes/routes.js";

const app = express();

// middlewares
// TODO
// - Rate limitting
// - JWT Blacklisting?
// Escaping HTML & CSS?
// Security Linter....

app.use(express.json()); // converts data to json
app.use(express.urlencoded({ extended: true })); // converts data to json

app.use("/api", routes); // use the routes

// Route access that is not registered should receive a 404 status page.
app.get("/", (req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started and listening to PORT: ${PORT}`);
});
