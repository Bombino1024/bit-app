const { query } = require("express");
const express = require("express");
const router = express.Router();
const Login = require("../models/Login");

router.post("/", async (req, res) => {
  const login = new Login({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const saveLogin = await login.save();
    res.json(saveLogin);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  const login = new Login({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    let username = req.body.username;
    let password = req.body.password;
    // Tymto dostanem jedneho z databazy
    let query = {
      $where: `this.username == '${username}' && this.password == '${password}'`,
    };
    const users = await Login.find(query);
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login2", async (req, res) => {
  const query = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const login = await Login.find(query);
    res.json(login);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
