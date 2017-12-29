const lunr = require("./lib/hugo-lunr-zh");
const cli = require("./lib/cli");

if (require.main === module) {
  return cli;
} else {
  return lunr;
}
