import { launch } from 'puppeteer';
const main = async() => {
  const url = 'https://www.airbnb.fr/?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&search_mode=flex_destinations_search&search_type=filter_change&property_type_id%5B%5D=8&flexible_trip_lengths%5B%5D=one_week&location_search=MIN_MAP_BOUNDS&monthly_start_date=2023-08-01&monthly_length=3&price_filter_input_type=0&price_filter_num_nights=5&channel=EXPLORE&category_tag=Tag%3A8678&amenities%5B%5D=4&amenities%5B%5D=34&amenities%5B%5D=5&amenities%5B%5D=33'
  const browser = await launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto(url);

  // https://en.wikipedia.org/wiki/Web_scraping
  // const title = await page.evaluate(() => {
  //   return document.querySelector("#firstHeading").textContent.trim();
  // });
  // const headings = await page.evaluate(() => {
  //   const headings_elements = document.querySelectorAll("h2 .mw-headline");
  //   const headings_array = Array.from(headings_elements);
  //   return headings_array.map(heading => heading.textContent);
  // });
  const data = await page.evaluate(() => {
    root = Array.from(document.querySelectorAll("#FMP-target [itemprop='itemListElement']"));
    hotels = root.map(hotel => ({
      Name: hotel.querySelector('ol').parentElement.nextElementSibling.textContent,
      Photo: hotel.querySelector("img").getAttribute("src")
    }));
    return hotels;
  });
  

  console.log(data);
  await browser.close();
}
main();