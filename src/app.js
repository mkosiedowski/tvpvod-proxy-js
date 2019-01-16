const express = require("express");
const app = express();
const getCategories = require('./categories');
const getSubcategories = require('./subcategories');
const getSeries = require('./series');
const getSeasons = require('./seasons');
const getEpisodes = require('./episodes');

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
    return res.format({
      "text/html"() {
        res.render("categories", { categories, layout: res.locals.layout });
      },
      "application/json"() {
        res.json(categories);
      },
      default() {
        res.json(categories);
      }
    });
  });
  app.get("/subcategories", async function (req, res) {
    const subcategories = await getSubcategories(req.query.category);
    return res.format({
      "text/html"() {
        res.render("subcategories", { subcategories, layout: res.locals.layout });
      },
      "application/json"() {
        res.json(subcategories);
      },
      default() {
        res.json(subcategories);
      }
    });
  });
  app.get("/series", async function (req, res) {
    const series = await getSeries(req.query.subcategory);
    return res.format({
      "text/html"() {
        res.render("series", { series, layout: res.locals.layout });
      },
      "application/json"() {
        res.json(series);
      },
      default() {
        res.json(series);
      }
    });
  });
  app.get("/seasons", async function (req, res) {
    const seasons = await getSeasons(req.query.serie);
    return res.format({
      "text/html"() {
        res.render("seasons", { seasons, layout: res.locals.layout });
      },
      "application/json"() {
        res.json(seasons);
      },
      default() {
        res.json(seasons);
      }
    });
  });
  app.get("/episodes", async function (req, res) {
    const episodes = await getEpisodes(req.query.season);
    return res.format({
      "text/html"() {
        res.render("episodes", { episodes, layout: res.locals.layout });
      },
      "application/json"() {
        res.json(episodes);
      },
      default() {
        res.json(episodes);
      }
    });
  });

  return app;
};
