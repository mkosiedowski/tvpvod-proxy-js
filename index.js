const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getSeasons = () => {
  const options = {
    uri: `${BASE_URL}/website/m-jak-milosc,1654521/video`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(options)
    .then(($) => {
      const hrefs = [];
      $('.strefa-abo__select-menu a').each((_, el) => {
        if (el.children.length === 1) {
          hrefs.push({text: el.children[0].data.replace(/^\s*(.*?)\s*$/, '$1'), href: el.attribs.href});
        }
      });
      console.log(hrefs);
    })
    .catch((err) => {
      console.log(err);
    });
};

getSeasons();
