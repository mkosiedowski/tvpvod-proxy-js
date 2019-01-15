const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getEpisodes = seasonLink => {

  const options2 = {
    uri: `${BASE_URL}${seasonLink}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  rp(options2).then(($) => {
    const hrefs = [];
    $('a.strefa-abo__item-link').each((_, el) => {
      const title = $(el).find('.strefa-abo__sub-title')[0].children[0].data;
      hrefs.push({title, href: el.attribs.href});
    });
    console.log(hrefs);
  })
    .catch((err) => {
      console.log(err);
    });
};

getEpisodes(process.argv[2]);
