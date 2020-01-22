const express = require("express");
const userRoute = require("./router/userRouter");

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
server.get("/", (req, res, next) => {
  console.log("test");
  next();
});
server.use("/users", userRoute);

server.listen(port, () => console.log(`Server listening on port ${port}`));
