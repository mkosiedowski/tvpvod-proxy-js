const rp = require('request-promise');
const cheerio = require('cheerio');
const getVideo = require('./video');
const BASE_URL = 'https://vod.tvp.pl';

const getEpisodes = async (seasonLink) => {
  const options = {
    uri: `${BASE_URL}${seasonLink}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  const $ = await rp(options);
  const hrefs = [];
  $('a.strefa-abo__item-link').each((_, el) => {
    const title = $(el).find('.strefa-abo__sub-title')[0].children[0].data;
    hrefs.push({title, href: el.attribs.href});
  });

  return Promise.all(hrefs.map(async href => ({...href, href: await getVideo(href.href)})));
};

module.exports = getEpisodes;
