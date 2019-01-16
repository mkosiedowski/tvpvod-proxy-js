const express = require("express");
const app = express();
const getCategories = require('./categories');
const getSubcategories = require('./subcategories');
const getSeries = require('./series');
const getSeasons = require('./seasons');
const getEpisodes = require('./episodes');
const getVideo = require('./video');

const render = (res, data) => res.format({
  "text/html"() {
    res.render("list", { data, layout: res.locals.layout });
  },
  "application/json"() {
    res.json(categories);
  },
  default() {
    res.json(categories);
  }
});

module.exports = async function() {
  const path = require("path");
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");
  const layoutDecorator = require("./layout/layoutDecorator");

  app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log("New request at " + new Date());
    next();
  });

  app.get("/", async function (req, res) {
    const categories = await getCategories();
    return render(res, categories);
  });
  app.get("/subcategories", async function (req, res) {
    const subcategories = await getSubcategories(req.query.category);
    return render(res, subcategories);
  });
  app.get("/series", async function (req, res) {
    const series = await getSeries(req.query.subcategory);
    return render(res, series);
  });
  app.get("/seasons", async function (req, res) {
    const seasons = await getSeasons(req.query.serie);
    return render(res, seasons);
  });
  app.get("/episodes", async function (req, res) {
    const episodes = await getEpisodes(req.query.season);
    return render(res, episodes);
  });
  app.get("/video", async function (req, res) {
    const video = await getVideo(req.query.url);
    return res.redirect(video);
  });

  return app;
};
