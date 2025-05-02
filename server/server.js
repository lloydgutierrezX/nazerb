import express from "express";

const app = express();

// middlewares
// TODO
// - Rate limitting
// - JWT Blacklisting?
// Escaping HTML & CSS?
// Security Linter....

app.use(express.json()); // converts data to json
app.use(express.urlencoded({ extended: true })); // converts data to json

// Route access that is not registered should receive a 404 status page.
app.get("/", (req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started and listening to PORT: ${PORT}`);
});
