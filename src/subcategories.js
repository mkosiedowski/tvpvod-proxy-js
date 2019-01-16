const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getSubcategories = async (categoryUrl) => {
  const options = {
    uri: `${BASE_URL}${categoryUrl}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  const $ = await rp(options);
  const hrefs = [];
  $('h2 a').each((_, el) => {
    hrefs.push({text: el.children[0].data.replace(/^\s*(.*?)\s*$/, '$1'), href: el.attribs.href});
  });

  return hrefs;
};

module.exports = getSubcategories;
