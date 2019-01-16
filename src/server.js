const app = require("./app");
const config = require("./config");

(async function main() {
  (await app()).listen(config.port, function() {
    console.log("Example app listening on port: " + config.port);
  });
})();
