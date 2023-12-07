const { launch } = require("puppeteer");

const scrapeMaps = async (url, limit) => {
  // const url = 'https://www.google.fr/maps/search/restaurants+%C3%A0+lyon/@45.7340231,4.7583189,12z/data=!3m1!4b1?entry=ttu';
  const browser = await launch({
    headless: false,
    defaultViewport: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  await page.goto(url);

  let datas = [];

  const isCookie = (await page.$('[aria-label="Tout accepter"]')) != null;
  if (isCookie) await page.click('[aria-label="Tout accepter"]');

  await page.waitForSelector(".bfdHYd");

  // await autoScroll(page);
  const endOfResults = await page.$("span.HlvSq");
  if(endOfResults === null) {
    while ((await page.$("span.HlvSq")) === null) await autoScroll(page);
  }

  // const places = await page.$$("div.Nv2PK.THOPZb.CpccDe");
  const places = await page.$$("div.Nv2PK");

  const text = "abcdefghijklmnopqrstuvwxyz0123456789";
  let datalimit = 0;

  for (const place of places) {
    if (limit > 0) {
      if (places.indexOf(place) <= places.length-1 && datalimit == limit) {
        break;
      }
    }
    let id = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * text.length);
      id += text.charAt(randomIndex);
    }
    let title = "Non défini";
    let rating = "Non défini";
    let review = "Non défini";
    let price_range = "Non défini";
    let categorie = "Non défini";
    let adresse = "Non défini";
    let statut = "Non défini";
    let heureOuverture = "Non défini";
    let imageUrl = "Non défini";
    let services = "Non défini";
    let description = "Non défini";
    let siteWeb = "Non défini";
    let telephone = "Non défini";

    await place.click("div > a.hfpxzc");
    const detail = await page.waitForSelector(
      "div.bJzME.Hu9e2e.tTVLSc div.m6QErb.WNBkOb > div:nth-child(2)"
    );
    await page.waitForTimeout(3000);

    try {
      title = await page.evaluate(
        (el) => el.querySelector("div > h1.DUwDvf").textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      rating = await page.evaluate(
        // (el) => el.querySelector(".ZkP5Je span.MW4etd").textContent,
        (el) =>
          el.querySelector("div.F7nice > span > span:nth-child(1)").textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      review = await page.evaluate(
        // (el) => el.querySelector(".ZkP5Je .UY7F9").textContent,
        (el) => el.querySelector("div.F7nice > span:nth-child(2)").textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      price_range = await page.evaluate(
        (el) =>
          // el.querySelector("div > span:nth-child(3) > span:nth-child(2)")
          el.querySelector("div.dmRWX > span").textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      categorie = await page.evaluate(
        // (el) => el.querySelector("div.W4Efsd > span").textContent,
        (el) => el.querySelector(".DkEaL").textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      adresse = await page.evaluate(
        (el) =>
          el.querySelector(
            // "div:nth-child(1) > span:nth-child(2) > span:nth-child(2)"
            ".m6QErb > div:nth-child(3) > .CsEnBe"
          ).textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      statut = await page.evaluate(
        (el) =>
          // el.querySelector("div:nth-child(3) > span > span > span:nth-child(1)")
          el.querySelector(
            ".m6QErb > div:nth-child(4) > div > div:nth-child(3) > div > span > span > span:nth-child(1)"
          ).textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      heureOuverture = await page.evaluate((el) => {
        let heure = el
          // .querySelector("div:nth-child(3) > span > span > span:nth-child(2)")
          .querySelector(
            ".m6QErb > div:nth-child(4) > div > div:nth-child(3) > div > span > span > span:nth-child(2)"
          )
          .textContent.split(" ")[4];

        if (heure === "") return "Non défini";
      }, detail) || "Non défini";
    } catch (error) {}

    try {
      imageUrl = await page.evaluate(
        (el) =>
          // el.querySelector("div > div.p0Hhde.FQ2IWe > img").getAttribute("src"),
          el.querySelector(".ZKCDEc img").getAttribute("src"),
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      services = await page.evaluate((el) => {
        const elts = el.querySelector("div.E0DTEd").textContent.split("·");
        const text = [];
        for (let i = 0; i < elts.length; i++) {
          if (elts[i] != " ") text.push(elts[i].trim());
        }
        return text.join(", ");
      }, detail) || "Non défini";
    } catch (error) {}

    try {
      description = await page.evaluate(
        (el) => el.querySelector("div:nth-child(1) > div.PYvSYb").textContent,
        detail
      ) || "Non défini";
    } catch (error) {}

    try {
      siteWeb = await page.evaluate((el) => {
        return el.querySelector(
          "div > div.rogA2c.ITvuef > div.Io6YTe.fontBodyMedium.kR99db"
        ).textContent;
      }, detail) || "Non défini";
    } catch (error) {}

    try {
      telephone = await page.evaluate((el) => {
        return el
          .querySelector("div.UCw5gc > div > div:nth-child(2) > a")
          .getAttribute("href")
          .split(":")[1];
      }, detail) || "Non défini";
    } catch (error) {}
    datas.push({
      id,
      title,
      rating,
      review,
      price_range,
      categorie,
      adresse,
      statut,
      heureOuverture,
      imageUrl,
      services,
      description,
      siteWeb,
      telephone,
    });

    if(limit != 0) {
      datalimit += 1
    }
  }

  await browser.close();

  return datas;
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 30;
      var timer = setInterval(() => {
        const element = document.querySelectorAll(
          "div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd"
        )[1];

        var scrollHeight = element.scrollHeight;
        element.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = { scrapeMaps };
