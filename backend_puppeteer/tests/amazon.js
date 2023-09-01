import { launch } from "puppeteer";

const scrapeAmazon = async (url) => {
  // const url =
  //   "https://www.amazon.fr/s?i=computers&rh=n%3A429879031%2Cp_89%3ALenovo%2Cp_36%3A9733305031%2Cp_n_size_browse-bin%3A10857260031&dc&fs=true&qid=1689311371&rnid=120984031&ref=sr_nr_p_n_size_browse-bin_4&ds=v1%3Az%2F7kf8ZyHemrxodfx6Gs5J35KAFppOGpFlgrzLVccE4";

  const browser = await launch({ headless: false, defaultViewport: false });
  // const browser = await launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(url);

  

  let items = [];
  let isBtn_disabled = false;

  while (!isBtn_disabled) {
    await page.waitForSelector('[data-cel-widget="search_result_0"]');
    // Get the parent(div) that contains the datas(products, infos, ...) to retrieve
    const products = await page.$$(
      "div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    );

    for (const data of products) {
      let title = "Null";
      let price = "Null";
      let img = "Null";

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

      if (title !== "Null" && img !== "Null") {
        // Enregistrer dans un fichier .csv
        // fs.appendFile(
        //   "results.csv",
        //   `${title.replace(/,/g, ".")},${price},${img}\n`,
        //   (err) => {
        //     if (err) throw err;
        //   }
        // );

        // console.log(items);
        items.push({ title, price, img });
      }
    }

    const is_disabled =
      (await page.$(
        "span.s-pagination-item.s-pagination-next.s-pagination-disabled"
      )) !== null;
    if (is_disabled === false) {
      await page.waitForSelector(
        "a.s-pagination-item.s-pagination-next.s-pagination-button",
        { visible: true }
      );
    }
    isBtn_disabled = is_disabled;

    if (!is_disabled) {
      await page.click(
        "a.s-pagination-item.s-pagination-next.s-pagination-button"
      );
      // await page.waitForSelector("div.s-main-slot");
      await page.waitForTimeout(1500);
    }
  }

  return items;

  await browser.close();
};

export { scrapeAmazon };
