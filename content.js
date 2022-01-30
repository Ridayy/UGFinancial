const PrismicDom = require("prismic-dom");
const Prismic = require("@prismicio/client");

const client = Prismic.client("http://ugfinancial.cdn.prismic.io/api");
client
  .query("")
  .then((response) => {
    console.log(response.results);
    const data = response.results;
    const homePage = data[0].data.home;
    console.log(JSON.stringify(homePage));
    console.log(homePage.showcase_title.value[0].text);
    // console.log(
    //   PrismicDom.RichText.asHtml(homePage.showcase_title.value[0].text)
    // );
  })
  .catch((err) => console.error(err));
