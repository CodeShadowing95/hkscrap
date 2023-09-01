import { launch } from "puppeteer";

const main = async () => {
  const url =
    "https://www.amazon.fr/s?i=computers&bbn=429882031&rh=n%3A13921051%2Cn%3A429882031%2Cp_89%3ASamsung%2Cp_n_feature_fourteen_browse-bin%3A28234180031%2Cp_n_feature_fifteen_browse-bin%3A28397029031&dc&qid=1689225131&rnid=28397025031&ref=sr_nr_p_n_feature_fifteen_browse-bin_3&ds=v1%3A7EZVts7XZfLwaF4mXwhvR2EQofApZBGoZ3smXf9pBkI";
  const browser = await launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);

  // Get the parent(div) that contains the datas(products, infos, ...) to retrieve
  const products = await page.$$(
    "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
  );

  let title = "Null";
  let price = "Null";
  let img = "Null";
  let items = [];

  for (const data of products) {
    try {
      title = await page.evaluate(
        (el) => el.querySelector("h2 > a > span").textContent,
        data
      );
    } catch (error) {}

    try {
      price = await page.evaluate(
        (el) => el.querySelector(".a-price > .a-offscreen").textContent,
        data
      );
    } catch (error) {}

    try {
      img = await page.evaluate(
        (el) => el.querySelector(".s-image").getAttribute("src"),
        data
      );
    } catch (error) {}

    items.push({ title, price, img });
  }

  console.log(items.length);
  await browser.close();
};

main();
