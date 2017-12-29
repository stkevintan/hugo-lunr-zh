const lunr = require("./hugo-lunr-zh");

const options = {};
const args = process.argv.slice(2);

const params = {
  contextPath: "-c",
  dir: "-d",
  output: "-o",
  matterType: "--matter-type",
  matterDelims: "--matter-delims",
  skipDraft: "-s",
  extensions: "--ext",
  jiebaConf: "--jieba"
};

for (let i = 0; i < args.length; i++) {
  if (args[i] === params.skipDraft) options.skipDraft = true;
  else
    for (let key in params) {
      if (params.hasOwnProperty(key) && params[key] === args[i]) {
        options[key] = args[++i];
        break;
      }
    }
}

lunr(options)
  .then(() => {
    console.log("done.");
  })
  .catch(e => {
    console.log("failed: ",e);
  });
