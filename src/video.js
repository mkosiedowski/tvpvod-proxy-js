const rp = require('request-promise');
const BASE_URL = 'https://vod.tvp.pl';

const getVideo = async (episodeLink) => {
  const episodeId = episodeLink.split(',')[2];
  const options2 = {
    uri: `${BASE_URL}/sess/tvplayer.php?object_id=${episodeId}`,
  };
  const body = await rp(options2);
  const found = body.match(/.*(https:\/\/.*\.mp4).*/m);

  return found ? found[1] : '';
};

module.exports = getVideo;
