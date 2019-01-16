```
$ npm instal
(...)

$ node index.js 
(...)
  { text: 'odcinki 1201 – 1300',
    href: '/website/m-jak-milosc,1654521/video?sezon=23983088&order=' },
  { text: 'odcinki 1301 – 1400',
    href: '/website/m-jak-milosc,1654521/video?sezon=30320522&order=' },
  { text: 'odcinki 1401 –',
    href: '/website/m-jak-milosc,1654521/video?sezon=40070614&order=' },
  { text: 'od najnowszego',
    href: '/website/m-jak-milosc,1654521/video?order=latest&sezon=0' },
  { text: 'od najstarszego',
    href: '/website/m-jak-milosc,1654521/video?order=oldest&sezon=0' } ]

$ node episodes.js '/website/m-jak-milosc,1654521/video?sezon=30320522&order='
[ { title: 'odc. 1400',
    href: '/video/m-jak-milosc,odc-1400,39968630' },
  { title: 'odc. 1399',
    href: '/video/m-jak-milosc,odc-1399,39968499' },
  { title: 'odc. 1398',
    href: '/video/m-jak-milosc,odc-1398,39841400' },
(...)

$ node video.js '/video/m-jak-milosc,odc-1352,35998760'
https://rsdt-waw902-20-vod.tvp.pl/token/video/vod/35998760/20190116/1497600292/c4994da0-b883-45a6-9ec2-a2a7a137925d/video-5.mp4
```
