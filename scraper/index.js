const { scrapeOverview, scrapeDetails } = require("./scrape");
const URL = "https://www.sterntaufe24.de/sternbilder/";

(async () => {
  const overview = await scrapeOverview(URL);
  let result;

  const setDetails = async () => {
    const promises = await overview.slice(0, 10).map(async (item) => {
      const details = await scrapeDetails(item.details_url);
      delete item.details_url;
      return { ...details };
    });
    return Promise.all(promises);
  };

  await setDetails()
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(result);
})();
