const express = require("express");
const PORT = 3000;
const app = express();
const { db } = require("./db/connection");
const userRoutes = require("./routes/users");
const showRoutes = require("./routes/shows");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/shows", showRoutes);

app.listen(PORT, () => {
  //   db.sync();
  console.log(`Listening at http://localhost:${PORT}`);
});
