const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getSeasons = async (seriesLink) => {
  const options = {
    uri: `${BASE_URL}${seriesLink}/video`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  const $ = await rp(options);
  const hrefs = [];
  $('.strefa-abo__select-menu a').each((_, el) => {
    if (el.children.length === 1) {
      hrefs.push({text: el.children[0].data.replace(/^\s*(.*?)\s*$/, '$1'), href: el.attribs.href});
    }
  });
  return hrefs;
};

module.exports = getSeasons;
