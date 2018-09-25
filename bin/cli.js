#!/usr/bin/env node

const lunr = require("../");

const options = {};
const args = process.argv.slice(2);

const params = {
  contextPath: "-c",
  dir: "-d",
  recursive: "-r",
  output: "-o",
  matterType: "--matter-type",
  matterDelims: "--matter-delims",
  skipDraft: "-s",
  extensions: "--ext",
  jiebaConf: "--jieba"
};

for (let i = 0; i < args.length; i++) {
  if (args[i] === params.skipDraft) {
    // if -s is the last item in args, v should be undefined.
    const v = args[i + 1];
    options.skipDraft = v !== "false";
    // the value is not omit.
    if (v === "true" || v === "false") i++;
    continue;
  }
  if (args[i] === params.recursive) {
    // if -r is the last item in args, v should be undefined.
    const r = args[i + 1];
    options.recursive = r !== "false";
    // the value is not omit.
    if (r === "true" || r === "false") i++;
    continue;
  }
  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] === args[i]) {
      options[key] = args[++i];
      break;
    }
  }
}
// throw JSON.stringify(options);
lunr(options)
  .then(() => {
    console.log("done.");
  })
  .catch(e => {
    console.log("failed: ", e);
  });
