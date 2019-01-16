const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getPrefix = href => href.match(/\/teatr,/) ? '/episodes?season=' : '/subcategories?category=';

const getCategories = async () => {
  const options = {
    uri: BASE_URL,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  const $ = await rp(options);
  const hrefs = [];
  $('.subMenu:first-of-type a').each((_, el) => {
    if (el.children.length === 1) {
      hrefs.push({
        text: el.children[0].data.replace(/^\s*(.*?)\s*$/, '$1'),
        href: `${getPrefix(el.attribs.href)}${el.attribs.href}`,
      });
    }
  });

  return hrefs;
};

module.exports = getCategories;
