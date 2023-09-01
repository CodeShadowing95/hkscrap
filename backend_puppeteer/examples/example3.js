import { launch } from "puppeteer";

const main = async () => {
  const url = 'https://www.amazon.fr/s?i=computers&bbn=429882031&rh=n%3A13921051%2Cn%3A429882031&dc&page=5&qid=1689176458&ref=sr_pg_5'
  const browser = await launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "load"
  });

  const is_disabled = await page.$('a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator') !== null;

  console.log(is_disabled);

  await browser.close();
}

main()