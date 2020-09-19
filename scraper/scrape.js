const puppeteer = require("puppeteer");

// SCRAPE FROM OVERVIEW PAGE
const scrapeOverview = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const scrapedData = await page.evaluate(() => {
    const allConstellations = [];
    const nodeList = Array.from(document.querySelectorAll("div.row-item"));
    nodeList.map((item) => {
      const details_url = item.children[0].children[1].href;
      const constellation = { details_url };
      allConstellations.push(constellation);
    });
    return allConstellations;
  });
  await browser.close();
  return scrapedData;
};

// SCRAPE DETAILS AND ADD TO EXISTING DATA (VISIT details_url & SCRAPE)
const scrapeDetails = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const details = await page.evaluate(() => {
    const detailsList = Array.from(document.querySelectorAll(".blog-value"));
    const details = detailsList.map((item) => item.textContent);
    const descriptionList = Array.from(document.querySelector(".blog-detail-box-text").children);
    const descriptions = descriptionList.map((item) => item.textContent);
    const name = document.querySelector(".blog-detail-box h1").textContent;
    const description = [
      { title: descriptions[0], content: descriptions[1] },
      { title: descriptions[2], content: descriptions[3] },
      { title: descriptions[4], content: descriptions[5] },
    ];
    const image = document.querySelector("#right-box").src;
    const icon_url = document.querySelector(".blog-detail-box h1 i").style.background.slice(4, -1).replace(/['"]/g, "");
    const icon = `https://www.sterntaufe24.de${icon_url}`;
    const sky = details[0];
    const visibility = details[1];
    const max_brightness = details[2];
    const area = details[3];
    const right_ascension = details[4].split(" bis ");
    const declination = details[5].split(" bis ");
    const stars_brighter_3mag = details[6];
    const brightest_star = details[7];

    return {
      name,
      description,
      icon,
      image,
      sky,
      visibility,
      max_brightness,
      area,
      right_ascension,
      declination,
      stars_brighter_3mag,
      brightest_star,
    };
  });
  await browser.close();
  return details;
};

module.exports = { scrapeOverview, scrapeDetails };