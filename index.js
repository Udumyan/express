const express = require("express");
const path = require("path");
const { readFileAsync } = require("./helpers/createPath");
const app = express();

app.get("/", (req, res) => {
  res.status(200).set({ "content-type": "text/html" });
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/api/users", async (req, res) => {
  const { name, age } = req.query;

  const data = await readFileAsync("db", "users.json");

  let users = JSON.parse(data);

  if (name) {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (age) {
    users = users.filter((user) => user.age === +age);
  }
  if (users.length === 0) {
    return res
      .status(404)
      .set({
        "content-type": "text/html",
      })
      .sendFile(path.join(__dirname, "pages", "notFound.html"));
  }
  res
    .status(200)
    .set({
      "content-type": "application/json",
    })
    .json(users);
});
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await readFileAsync("db", "users.json");
  const users = JSON.parse(data);

  const user = users.find((u) => u.id === +id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).set({
      "content-type": "text/html",
    });
    res.sendFile(path.join(__dirname, "pages", "notFound.html"));
  }
});

app.listen(3000, () => {
  console.log("Runing");
});
