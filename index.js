const express = require("express");
const bodyParser = require("body-parser");
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get(["/", "/index.html"], (request, response) => {
  response.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(["/form", "/ex1.html"], (request, response) => {
  response.sendFile(path.join(__dirname, "views", "ex1.html"));
});

app.get("/ex2.html", (request, response) => {
  response.sendFile(path.join(__dirname, "views", "ex2.html"));
});

app.get("/ex3.html", (request, response) => {
  response.sendFile(path.join(__dirname, "views", "ex3.html"));
});

app.post("/form", (request, response) => {
  const { name, email } = request.body || {};
  if (typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim()) {
    return response.status(400).type("text").send("Please enter your name and email.");
  }

  response.type("text").send(
    `${name.trim()}, Thank you for your order. ` +
    `We will keep you posted on delivery status at ${email.trim()}.`
  );
});

app.post("/api/countries", (request, response) => {
  const { name, countries } = request.body || {};
  if (typeof name !== "string" || !name.trim() || !Array.isArray(countries) ||
      !countries.every(country => country && typeof country.name === "string" &&
        country.name.trim() && Number.isInteger(country.year))) {
    return response.status(400).type("text").send("Provide a name and a countries array with country names and integer years.");
  }

  response.type("text").send(
    `Your name is ${name.trim()} and you visited ${countries.length} countries. Keep traveling!`
  );
});

// These exercise articles are stored only in memory and reset on restart.
const articles = [
  { id: 1, title: "First article", content: "Content of the first article." },
  { id: 2, title: "Second article", content: "Content of the second article." },
  { id: 3, title: "Third article", content: "Content of the third article." },
  { id: 4, title: "Fourth article", content: "Content of the fourth article." }
];

app.post("/articles", (request, response) => {
  const { title, content } = request.body || {};
  if (typeof title !== "string" || !title.trim() ||
      typeof content !== "string" || !content.trim()) {
    return response.status(400).type("text").send("Please enter an article title and content.");
  }

  const id = Math.max(0, ...articles.map(article => article.id)) + 1;
  articles.push({ id, title: title.trim(), content: content.trim() });
  response.status(201).type("text").send(
    `New article added successfully with title "${title.trim()}" and ID ${id}!`
  );
});

app.use((error, request, response, next) => {
  if (error.type === "entity.parse.failed") {
    return response.status(400).type("text").send("Invalid JSON data.");
  }
  console.error(error);
  response.status(500).type("text").send("Unable to process the request.");
});

if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Homework 9b server is listening on port ${port}.`);
  });
}

module.exports = app;
