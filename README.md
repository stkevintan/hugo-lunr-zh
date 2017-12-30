# Hugo lunr zh

Generate lunr.js index file for hugo static site with Chinese support.

## Install

globally:

```bash
npm install -g hugo-lunr-zh
```

or as a dev dependence:

```bash
npm install -D hugo-lunr-zh
```

## Usage

your can use it in command line:

```bash
hugo-lunr-zh  -o docs/lunr.json --matter-delims --- --matter-type yaml
```

or run it in file:

```js
const lunr = require("hugo-lunr-zh");
lunr({
  output: "docs/index.json"
}).then(() => {
  console.log("done");
});
```

after generate the index file, you should do some tweak work to the lunr.js in the web browser side:

```js
// overwrite the lunr.trimmer function to avoid trimming the Chinese words
lunr.trimmer = function(token) {
  //check token is chinese then not replace
  var str = typeof token === 'string' token: token.str;
  if (isChineseChar(str)) {
    return token;
  }
  str = str.replace(/^\W+/, "").replace(/\W+$/, "");

  if(token.str) token.str = str;
  else token = str;
  
  return token;
};

function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}
```

## Output Format

```js
[
  {
    uri: "contextPath/pagename",
    tags: "",
    oriTitle: "the original post title for display",
    title: "segmented post title, Chinese keywords are seperated by spaces",
    content: "segmented post content, Chinese keywords are seperated by spaces"
  }
];
```

## Options

the default:

```js
{
  contextPath: "/posts",
  dir: "content/posts",
  output: "public/index.json",
  matterType: "toml",
  matterDelims: "+++",
  skipDraft: true,
  extensions: ".md",
  jiebaConf: {}
}
```

### contextPath [-c]

the context path of the `uri` link

### dir [-d]

the directory of your posts. note: it can't search recursively.

### output [-o]

the output filepath, eg: `your_publishDir/index.json`

### skipDraft [-s]

if skip the drafts?

### matterType [--matter-type]

specify the type of front matter. avaliable values: `toml`, `yaml`, `json`

### matterDelims [--matter-delims]

specify the delims type of front matter. default is `+++`

### extensions [--ext]

the accepted extensions , multi extensions should be separated by a comma, eg: `.md,.html`

### jiebaConf [--jieba]

the nodejieba configuration object, the object should be stringify. more info: <https://github.com/yanyiwu/nodejieba>

## Issues

please submit your issues to <https://github.com/stkevintan/hugo-lunr-zh/issues>
