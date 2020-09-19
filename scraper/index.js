const { scrapeData } = require("./scrape");
const URL = "https://www.sterntaufe24.de/sternbilder/";

// Scrape constellations
scrapeData(URL)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
