const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getSeries = async (subcategoryUrl) => {
  const options = {
    uri: `${BASE_URL}${subcategoryUrl}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  const $ = await rp(options);
  const hrefs = [];
  $('.strefa-abo__item a').each((_, el) => {

    hrefs.push({
      text: $(el).find('.strefa-abo__title')[0].children[0].data.replace(/^\s*(.*?)\s*$/, '$1'),
      href: `/seasons?serie=${el.attribs.href}`,
    });
  });

  return hrefs.sort((link1, link2) => link1.text.localeCompare(link2.text));
};

module.exports = getSeries;
