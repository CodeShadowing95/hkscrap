const { scrapeMaps } = require("../../../tests/index");

module.exports.scrapeFromURL = async (url, limit) => {
  let datas = [];

  if (/^(https?:\/\/)?(www\.)?google\.[a-z.]+\/maps\//i.test(url)) {
    datas = await scrapeMaps(url, limit);
  }
  // else if (/^(https?:\/\/)?(www\.)?yelp\.[a-z.]+\//i.test(url)) {
  //   datas = await scrapeYelp(url);
  // }

  return datas;
};
