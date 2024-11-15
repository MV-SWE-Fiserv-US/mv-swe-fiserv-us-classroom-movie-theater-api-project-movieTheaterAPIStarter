const express = require("express");
const app = express();
const { db } = require("./db/connection");
const userRouter = require("./routes/userRouter");
const showRouter = require("./routes/showRouter");

app.use(express.json());
app.use("/users", userRouter);
app.use("/shows", showRouter);

db.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
