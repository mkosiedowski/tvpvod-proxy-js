const rp = require('request-promise');
const cheerio = require('cheerio');
const getVideo = require('./video');
const BASE_URL = 'https://vod.tvp.pl';

const getPrefix = href => href.match(/\/dla-dzieci,/) ? '/seasons?serie=' : '/video?url=';
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
    const title = $(el).find('.strefa-abo__title');
    const subtitle = $(el).find('.strefa-abo__sub-title');
    const text = (!seasonLink.match(/\/(teatr|dla-dzieci),/) && subtitle.length && subtitle[0].children.length ? subtitle : title)[0].children[0].data;
    hrefs.push({
      text,
      href: `${getPrefix(seasonLink)}${el.attribs.href}`,
    });
  });

  return hrefs;
};

module.exports = getEpisodes;
