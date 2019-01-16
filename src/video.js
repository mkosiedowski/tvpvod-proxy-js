const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://vod.tvp.pl';

const getVideo = async (episodeLink) => {
  const options = {
    uri: `${BASE_URL}${episodeLink}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  const $episode = await rp(options);
  const episodePlayButton = $episode('.website--wrapper--circle');
  const episodeUrl = episodePlayButton.length ? episodePlayButton[0].attribs.href : episodeLink;
  const episodeId = episodeUrl.split(',')[2] || episodeUrl.split(',')[1];
  const options2 = {
    uri: `${BASE_URL}/sess/tvplayer.php?object_id=${episodeId}`,
  };
  const body = await rp(options2);
  const found = body.match(/.*(https:\/\/.*\.mp4).*/m);

  return found ? found[1] : '';
};

module.exports = getVideo;
