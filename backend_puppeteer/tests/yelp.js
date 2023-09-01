import { launch } from "puppeteer";

const scrapeYelp = async () => {
  const url =
    "https://www.pagesjaunes.fr/annuaire/chercherlespros?quoiqui=entreprises+d%27informatique&ou=lyon-69&univers=pagesjaunes&idOu=";
  const browser = await launch({
    headless: false,
    defaultViewport: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForTimeout(60000);

  const isCookies =
    (await page.$("span.didomi-continue-without-agreeing")) != null;
  if (isCookies) await page.click("span.didomi-continue-without-agreeing");

  await page.waitForSelector("div.main-content");
  await page.waitForTimeout(5000);

  let datas = [];
  let urls = [];
  let isBtn_disabled = false;

  while (!isBtn_disabled) {
    await page.waitForSelector("ul.bi-list");
    const results = await page.$$("div.bi-content");

    for (const result of results) {
      let link_res = "";

      try {
        link_res = await page.evaluate(
          (el) => el.querySelector("div > a.bi-denomination.pj-link").href,
          result
        );
        // link_res = await page.$eval("div > a.bi-denomination.pj-link", (el) => el.href);
      } catch (error) {}

      await page.waitForTimeout(8000);

      urls.push({ link_res });
    }
    
    const isDisabled = (await page.$("span.disabled.next")) !== null;

    if (isDisabled === false) {
      await page.waitForSelector("a#pagination-next", { visible: true });
    }
    isBtn_disabled = isDisabled;

    if(!isDisabled) {
      await page.click("a#pagination-next");
      await page.waitForTimeout(6000);
    }
  }

  // for (const result in results) {
  //   let name = "Non défini(e)"
  //   let activities = "Non défini(e)"
  //   let status = "Non défini(e)"
  //   let adresse = "Non défini(e)"
  //   let phoneNumbers = "Non défini(e)"
  //   let facebook = "Non défini(e)"
  //   let twitter = "Non défini(e)"
  //   let linkedin = "Non défini(e)"
  //   let websites = []
  // }
  console.log(urls);

  await browser.close();
};

scrapeYelp();

// export { scrapeYelp };
