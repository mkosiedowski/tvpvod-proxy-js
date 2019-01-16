const express = require("express");
const app = express();
const getCategories = require('./categories');
const getSubcategories = require('./subcategories');
const getSeries = require('./series');
const getSeasons = require('./seasons');
const getEpisodes = require('./episodes');

module.exports = async function() {
  app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log("New request at " + new Date());
    next();
  });

  app.get("/", async function (req, res) {
    res.send(JSON.stringify(await getCategories()));
  });
  app.get("/subcategories", async function (req, res) {
    res.send(JSON.stringify(await getSubcategories(req.query.category)));
  });
  app.get("/series", async function (req, res) {
    res.send(JSON.stringify(await getSeries(req.query.subcategory)));
  });
  app.get("/seasons", async function (req, res) {
    res.send(JSON.stringify(await getSeasons(req.query.serie)));
  });
  app.get("/episodes", async function (req, res) {
    res.send(JSON.stringify(await getEpisodes(req.query.season)));
  });

  return app;
};
