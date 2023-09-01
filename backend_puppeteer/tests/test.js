import { launch } from "puppeteer";
// import axios from "axios";
import fs from "fs";

const main = async () => {
  const url =
    // "https://www.google.fr/maps/search/entreprises+d'informatique+%C3%A0+Lyon/@45.7673852,4.8002611,14z/data=!3m1!4b1?entry=ttu";
    "https://www.google.fr/maps/search/soci%C3%A9t%C3%A9s+d'informatique+%C3%A0+lyon/@45.7568689,4.8209637,14z?entry=ttu";
    // "https://www.google.fr/maps/search/entreprises+%C3%A0+Lyon/@45.7673926,4.8002611,14z?entry=ttu";
    // "https://www.google.fr/maps/search/restaurants+%C3%A0+lyon/@45.7749196,4.7999024,14z/data=!3m1!4b1?entry=ttu";
  // const url = "https://www.google.fr/maps/search/h%C3%B4tels+%C3%A0+lyon/@45.7745202,4.6339501,12z/data=!3m1!4b1?entry=ttu";

  const browser = await launch({
    headless: false,
    defaultViewport: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  // const browser = await launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);

  let items = [];
  const csvHeader = 'title,rating,review,price_range,categorie,adresse,statut,heureOuverture,imageUrl,services,description,siteweb,telephone\n';
  fs.writeFileSync('results.csv', csvHeader);
  // fs.appendFileSync('results.csv', `\n`);

  const isCookie = (await page.$('[aria-label="Tout accepter"]')) != null;
  if (isCookie) await page.click('[aria-label="Tout accepter"]');

  await page.waitForSelector(".bfdHYd");

  // await autoScroll(page);
  // while ((await page.$("span.HlvSq")) === null) await autoScroll(page);

  // const places = await page.$$("div.Nv2PK.THOPZb.CpccDe");
  // const places = await page.$$("div.Nv2PK");
  let i = 3;

  while (true) {
    // if ((await page.waitForSelector("div.lXJj5c.Hk4XGb > div.qjESne.veYFef")) == null) continue;
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

    if ((await page.waitForSelector(`div:nth-child(${i}) > div > a.hfpxzc`)) !== null){
      await page.click(`div:nth-child(${i}) > div > a.hfpxzc`);
      await autoscroll(page);
    }
    const detail = await page.waitForSelector("div.bJzME.Hu9e2e.tTVLSc div.m6QErb.WNBkOb > div:nth-child(2)");
    await page.waitForTimeout(5000);

    try {
      title = await page.evaluate(
        (el) => el.querySelector("div > h1.DUwDvf").textContent,
        detail
      );
    } catch (error) {}

    try {
      rating = await page.evaluate(
        // (el) => el.querySelector(".ZkP5Je span.MW4etd").textContent,
        (el) =>
          el.querySelector("div.F7nice > span > span:nth-child(1)").textContent,
        detail
      );
    } catch (error) {}

    try {
      review = await page.evaluate(
        // (el) => el.querySelector(".ZkP5Je .UY7F9").textContent,
        (el) => el.querySelector("div.F7nice > span:nth-child(2)").textContent,
        detail
      );
    } catch (error) {}

    try {
      price_range = await page.evaluate(
        (el) =>
          // el.querySelector("div > span:nth-child(3) > span:nth-child(2)")
          el.querySelector("div.dmRWX > span").textContent,
        detail
      );
    } catch (error) {}

    try {
      categorie = await page.evaluate(
        // (el) => el.querySelector("div.W4Efsd > span").textContent,
        (el) => el.querySelector(".DkEaL").textContent,
        detail
      );
    } catch (error) {}

    try {
      adresse = await page.evaluate(
        (el) =>
          el.querySelector(
            // "div:nth-child(1) > span:nth-child(2) > span:nth-child(2)"
            ".m6QErb > div:nth-child(3) > .CsEnBe"
          ).textContent,
        detail
      );
    } catch (error) {}

    try {
      statut = await page.evaluate(
        (el) =>
          // el.querySelector("div:nth-child(3) > span > span > span:nth-child(1)")
          el.querySelector(
            ".m6QErb > div:nth-child(4) > div > div:nth-child(3) > div > span > span > span:nth-child(1)"
          ).textContent,
        detail
      );
    } catch (error) {}

    try {
      heureOuverture = await page.evaluate(
        (el) =>
          el
            // .querySelector("div:nth-child(3) > span > span > span:nth-child(2)")
            .querySelector(
              ".m6QErb > div:nth-child(4) > div > div:nth-child(3) > div > span > span > span:nth-child(2)"
            )
            .textContent.split(" ")[4],
        detail
      );
    } catch (error) {}

    try {
      imageUrl = await page.evaluate(
        (el) =>
          // el.querySelector("div > div.p0Hhde.FQ2IWe > img").getAttribute("src"),
          el.querySelector(".ZKCDEc img").getAttribute("src"),
        detail
      );
    } catch (error) {}

    try {
      services = await page.evaluate((el) => {
        const elts = el.querySelector("div.E0DTEd").textContent.split("·");
        const text = [];
        for (let i = 0; i < elts.length; i++) {
          if (elts[i] != " ") text.push(elts[i].trim());
        }
        return text.join(", ");
      }, detail);
    } catch (error) {}

    try {
      description = await page.evaluate(
        (el) => el.querySelector("div:nth-child(1) > div.PYvSYb").textContent,
        detail
      );
    } catch (error) {}

    try {
      siteWeb = await page.evaluate((el) => {
        return el.querySelector(
          "div > div.rogA2c.ITvuef > div.Io6YTe.fontBodyMedium.kR99db"
        ).textContent;
      }, detail);
    } catch (error) {}

    try {
      telephone = await page.evaluate((el) => {
        return el
          .querySelector("div.UCw5gc > div > div:nth-child(2) > a")
          .getAttribute("href")
          .split(":")[1];
      }, detail);
    } catch (error) {}

    // description = document.querySelector("div.WeS02d > div:nth-child(1) > div.PYvSYb").textContent;
    // heureFermeture = document.querySelector("div > span.ZDu9vd > span > span:nth-child(2)").textContent;
    // siteWeb = document.querySelector("div:nth-child(9) > div:nth-child(7) > a").getAttribute("href");
    // telephone = document.querySelector('[jslog="18491; track:click; mutable:true;metadata:WyIwYWhVS0V3aVMwT3VBeHBHQUF4VVpVNlFFSGFlSEJ1Y1FfZG9CQ0JVb0RBIl0="]').textContent;
    fs.appendFile(
      "results.csv",
      `${title.replace(/,/g, ".")},${rating.replace(
        /,/g,
        "."
      )},${review.replace(/,/g, ".")},${price_range.replace(
        /,/g,
        "."
      )},${categorie.replace(/,/g, ".")},${adresse.replace(
        /,/g,
        "."
      )},${statut.replace(/,/g, ".")},${heureOuverture.replace(
        /,/g,
        "."
      )},${imageUrl},${services.replace(/,/g, ".")},${description.replace(
        /,/g,
        "."
      )},${siteWeb.replace(/,/g, ".")},${telephone.replace(
        /,/g,
        "."
      )}\n`,
      (err) => {
        if (err) throw err;
      }
    );
    items.push({
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
    i += 2;
  }

  console.log(items);
  console.log(items.length);
  await browser.close();
};

const autoscroll = async (page) => {
  await page.evaluate(() => {
    const component = document.querySelectorAll('div.m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd')[1];
    const scrollAmount = 100;
  
    component.scrollTop += scrollAmount;
  });
};

main();
