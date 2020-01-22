const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

function find() {
  return db("users").select("*");
}

function findBy(username) {
  return db("users")
    .select("*")
    .where("username", username);
}

async function insertUser(user) {
  user.password = await bcrypt.hash(user.password, 13);
  await db("users").insert(user);
  return findBy(user.username);
}

module.exports = {
  find,
  findBy,
  insertUser
};
