const rp = require('request-promise');
const BASE_URL = 'https://vod.tvp.pl';

const getVideo = seasonLink => {

  const episodeId = seasonLink.split(',')[2];
  const options2 = {
    uri: `${BASE_URL}/sess/tvplayer.php?object_id=${episodeId}`,
  };
  rp(options2).then((body) => {
    const found = body.match(/.*(https:\/\/.*\.mp4).*/m);
    console.log(found[1]);
  })
    .catch((err) => {
      console.log(err);
    });
};

getVideo(process.argv[2]);
