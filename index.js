const express = require("express");
const server = express();

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 6000;

server.use(express.json());

server.use((req, res, next) => {
  console.log("test");
});

server.listen(
  (port,
  host,
  () => {
    console.log(`Server listening on port ${port}`);
  })
);
