import { scrapeMaps } from "../../../tests/index";

export const scrapeFromURL = async (url) => {
  let datas = [];

  if (/^(https?:\/\/)?(www\.)?google\.[a-z.]+\/maps\//i.test(url)) {
    datas = await scrapeMaps(url);
  }
  // else if (/^(https?:\/\/)?(www\.)?yelp\.[a-z.]+\//i.test(url)) {
  //   datas = await scrapeYelp(url);
  // }

  return datas;
};
