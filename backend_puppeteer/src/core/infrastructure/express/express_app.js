const express = require("express");
const cors = require("cors");

const user = require("../../../features/auth/domain/controllers/user_controller");
const scrap = require("../../../features/scrapping/domain/controllers/scap_controller");

module.exports = async (app, db) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(express.static(__dirname + "public"));
  app.use(cors());

  user(app, db);
  scrap(app, db);
};
