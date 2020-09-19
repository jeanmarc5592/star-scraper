const { scrapeData } = require("./scraper");
require("./database");
const Constellation = require("./database/models/constellation");

// Scrape constellations and add them to database
const URL = "https://www.sterntaufe24.de/sternbilder/";
scrapeData(URL)
  .then((result) => {
    result.forEach((item) => {
      const constellation = new Constellation(item);
      constellation
        .save()
        .then(() => console.log("Data saved to database successfully!"))
        .catch((err) => console.log(err));
    });
  })
  .catch((error) => console.log(error));
