const ScrapUseCase = require("../usecases/scrap_usecase.js");

const { scrapeFromURL } = require("../../../../core/utils/detect_url.js");

module.exports = (app, db) => {
  app.post("/all", async (req, res) => {
    try {
      const { uid } = req.body;

      const data = await ScrapUseCase.get({ uid, db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/recentDatas", async (req, res) => {
    try {
      const { uid } = req.body;

      const data = await ScrapUseCase.recent({ uid, db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/number_requests", async (req, res) => {
    try {
      const { uid } = req.body;

      const data = await ScrapUseCase.requestNumber({ uid, db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/scrape", async (req, res) => {
    try {
      const { url } = req.body;

      const data = await scrapeFromURL(url);

      return res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        name: "An error occurred while scraping data",
        description: err.message,
      });
    }
  });

  app.post("/store-scraped-data", async (req, res) => {
    try {
      const {
        userId,
        label,
        website,
        startDate,
        execTime,
        lines,
        resultsFile,
      } = req.body;

      const data = await ScrapUseCase.store({
        userId,
        label,
        website,
        startDate,
        execTime,
        lines,
        resultsFile,
        db,
      });

      return res.status(201).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/count-scraped-datas", async (req, res) => {
    try {
      const { uid } = req.body;

      const data = await ScrapUseCase.count({ uid, db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });

  app.post("/scrapes-count-by-site", async (req, res) => {
    try {
      const { website, uid } = req.body;

      const data = await ScrapUseCase.countBySite({ website, uid, db });

      return res.status(200).json(data);
    } catch (err) {
      res.status(err.statusCode).json({
        name: err.name,
        description: err.description,
      });
    }
  });
};
