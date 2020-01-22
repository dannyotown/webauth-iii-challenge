const express = require("express");
const userModel = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restrict = require("../auth-middleware/restrict");
const router = express.Router();
const secrets = require("../auth-config/secrets");

router.get("/", async (req, res, next) => {
  res.json(await userModel.find());
});

router.post("/signup", async (req, res, next) => {
  const user = req.body;
  try {
    res.status(201).send(await userModel.insertUser(user));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findBy(username).first();

    const validatePassword = await bcrypt.compare(password, user.password);
    if (user && validatePassword) {
      const token = jwt.sign(
        { id: user.id, username: user.username, department: user.department },
        secrets.jwt,
        {
          expiresIn: "2d"
        }
      );
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token: token
      });
    } else {
      res.status(401).json({
        message: "Get out of my laboratory Dee Dee"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/restricted", restrict(), (req, res, next) => {
  res.json({ success: "You have accesss!" });
});

module.exports = router;
