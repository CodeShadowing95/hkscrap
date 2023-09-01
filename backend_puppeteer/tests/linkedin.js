import { launch } from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const scrapeLinkedin = async (url) => {
  const browser = await launch({
    headless: false,
    defaultViewport: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  await page.goto(url);

  const linkedinUsername = process.env.EMAIL_PHONE_LINKEDIN;
  const linkedinPassword = process.env.PASSWORD_LINKEDIN;

  const datas = [];

  // Bypass registration page and cookies agreement
  await page.click("a.main__sign-in-link");
  await page.click('[action-type="ACCEPT"]');
  await page.$eval(
    "input#username",
    (el, email) => {
      el.value = email;
    },
    linkedinUsername
  );
  await page.$eval(
    "input#password",
    (el, password) => {
      el.value = password;
    },
    linkedinPassword
  );
  await page.click('button[type="submit"]');

  await page.waitForSelector("body.render-mode-BIGPIPE");
  await page.waitForSelector("div.artdeco-button");
  await page.waitForTimeout(1500);
  await page.click("div.artdeco-button > a.app-aware-link");

  let isBtn_disabled = false;
  let urlProfileList = [];

  while (!isBtn_disabled) {
    await page.waitForSelector("main.scaffold-layout__main");
    await page.waitForSelector(
      "span.entity-result__title-line.entity-result__title-line--2-lines > span > a"
    );

    const resultsProfiles = await page.$$(
      "span.entity-result__title-line.entity-result__title-line--2-lines > span"
    );
    for (const data of resultsProfiles) {
      let profileUrl = "Null";
      const profile = await page.$eval(
        "span.entity-result__title-line.entity-result__title-line--2-lines > span > a > span > span",
        (el) => el.textContent.trim()
      );

      if (profile !== "Utilisateur LinkedIn") {
        try {
          profileUrl = await page.evaluate(
            (el) => el.querySelector("a.app-aware-link").href,
            data
          );
        } catch (error) {}

        urlProfileList.push(profileUrl);
      } else {
        continue;
      }
    }
    // urlProfileList = await page.$$eval(
    //   "span.entity-result__title-line.entity-result__title-line--2-lines > span",
    //   (profileUrls) =>
    //     profileUrls.map((profileUrl) => {
    //       const link = profileUrl.querySelector("a.app-aware-link").href;
    //       return {
    //         profile: link,
    //       };
    //     })
    // );
    // console.log(urlProfileList);

    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(1000);
    const is_disabled =
      (await page.$(
        "button.artdeco-pagination__button--next.artdeco-button--disabled"
      )) !== null;
    if (is_disabled === false) {
      await page.waitForSelector("button.artdeco-pagination__button--next", {
        visible: true,
      });
    }
    isBtn_disabled = is_disabled;
    if (!is_disabled) {
      await page.click("button.artdeco-pagination__button--next");
      await page.waitForTimeout(1500);
    }
  }

  let index = 0;
  const page2 = await browser.newPage();
  for (const url of urlProfileList) {
    let nom = "Non défini(e)";
    let fonction = "Non défini(e)";
    let entreprise = "Non défini(e)";
    let localisation = "Non défini(e)";
    let linkedin = "Non défini(e)";
    let siteweb = "Non défini(e)";
    let email = "Non défini(e)";
    let twitter = "Non défini(e)";

    await Promise.all([
      page2.waitForNavigation(),
      page2.goto(url),
      page2.waitForTimeout(2000),
      page2.waitForSelector(".pvs-profile-actions"),
    ]);

    try {
      nom = await page2.$eval(
        ".pv-text-details__left-panel h1",
        (el) => el.textContent.trim()
      );
    } catch (error) {}

    try {
      entreprise = await page2.$eval(
        "div.display-flex.flex-column.full-width > .t-14 > span",
        (el) => el.textContent.split(' · ')[0]
      );
    } catch (error) {}

    try {
      localisation = await page2.$eval(
        // ".pv-text-details__left-panel .text-body-small.inline",
        "div.pv-text-details__left-panel.mt2 > span.text-body-small.inline.t-black--light.break-words",
        (el) => el.textContent.trim()
      );
    } catch (error) {}

    await page2.evaluate(() => window.scrollTo(0, 1500));
    await page2.waitForTimeout(1000);
    try {
      fonction = await page2.$eval(
        "div.display-flex.flex-column.full-width > div > div > div > div > span:nth-child(1)",
        (el) => el.textContent.trim()
      );
    } catch (error) {}

    await page2.$eval(".pv-text-details__separator a", (el) => el.click());
    await page2.waitForTimeout(2000);
    await page2.waitForSelector(".pv-contact-info.artdeco-container-card");
    try {
      const hasLinkedin =
        (await page2.$(".pv-contact-info__contact-type.ci-vanity-url > h3")) !==
        null;
      if (hasLinkedin)
        linkedin = await page2.$eval(
          ".pv-contact-info__contact-link.link-without-visited-state",
          (el) => el.href
        );
    } catch (error) {}
    try {
      const haswebsite =
        (await page2.$(".pv-contact-info__contact-type.ci-websites > h3")) !==
        null;
      if (haswebsite)
        siteweb = await page2.$eval(
          "ul > li:nth-child(1) > a",
          (el) => el.href
        );
    } catch (error) {}
    try {
      const hasEmail =
        (await page2.$(".pv-contact-info__contact-type.ci-email > h3")) !==
        null;
      if (hasEmail)
        email = await page2.$eval(
          ".pv-contact-info__contact-type.ci-email > div > a",
          (el) => el.href
        );
    } catch (error) {}
    try {
      const hasTwitter =
        (await page2.$(".pv-contact-info__contact-type.ci-twitter > h3")) !==
        null;
      if (hasTwitter)
        twitter = await page2.$eval(
          ".pv-contact-info__contact-type.ci-twitter > ul > li > a",
          (el) => el.href
        );
    } catch (error) {}

    
    datas.push({
      nom,
      fonction,
      entreprise,
      localisation,
      linkedin,
      siteweb,
      email,
      twitter
    });

    index++;
  }

  browser.close();

  return datas;
};

export { scrapeLinkedin }
