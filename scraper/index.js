const { scrapeOverview, scrapeDetails } = require("./scrape");
const URL = "https://www.sterntaufe24.de/sternbilder/";

(async () => {
  const overview = await scrapeOverview(URL);
  let result = [];

  const setDetails = async (arr) => {
    const promises = await arr.map(async (item) => {
      const details = await scrapeDetails(item.details_url);
      delete item.details_url;
      return { ...details };
    });
    return Promise.all(promises);
  };

  await setDetails(overview.slice(0, 5))
    .then((res) => {
      result = [...result, ...res];
    })
    .catch((err) => {
      console.log(err);
    });

  await setDetails(overview.slice(5, 10))
    .then((res) => {
      result = [...result, ...res];
    })
    .catch((err) => {
      console.log(err);
    });

  await setDetails(overview.slice(10, 15))
    .then((res) => {
      result = [...result, ...res];
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(result);
})();
