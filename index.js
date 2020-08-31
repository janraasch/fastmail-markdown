var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var bookmarkletPath = path.resolve(__dirname, './dist/bookmarklet.js')
var indexPath = path.resolve(__dirname, './index.html');
var log = function (text) {
  return console.log(text); // eslint-disable-line no-console
};

log('Creating ' + indexPath + ' page with bookmarklet from ' + bookmarkletPath + '.');

var code = fs.readFileSync(bookmarkletPath, 'utf8');
var link = 'javascript:' + querystring.escape(code);

var indexHtml = [
  '<!DOCTYPE html>', '<html lang="en">',
  '<head>',
  '<meta charset="utf-8">', '<title>FastMail Markdown Bookmarklet</title>',
  '<link rel="stylesheet" ',
  'href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css"',
  '>',
  '</head>',
  '<body>',
  '<h1>Bookmarklet enhancing FastMail Plain Text content with Markdown rendering</h1>',
  '<h2>Drag and drop this sweet bookmarklet to your bookmarks bar, if you so dare ;)</h2>',
  '<p>',
  '<a href="' + link + '"><img src="./bookmark.png" alt="Toggle Markdown"/></a>',
  '<br>',
  'Then navigate to your <a href="https://www.fastmail.com/notes/">FastMail Notes</a> ',
  'or <a href="https://www.fastmail.com/mail/">FastMail Mails</a> ',
  'and click on the bookmark to toggle markdown rendering for your plain text notes',
  '</p>',
  '<h2>Source Code</h2>',
  '<p>',
  'The source code is available on <a href="https://github.com/janraasch/fastmail-markdown">GitHub</a>.',
  '</p>',
  '<h2>Sponsor</h2>',
  '<p>',
  'Support my work on this project via <a href="https://paypal.me/janraasch/4,99">PayPal</a>.',
  '</p>',
  '<h2>License</h2>',
  '<p><a href="http://en.wikipedia.org/wiki/MIT_License">MIT License</a> © <a href="https://www.janraasch.com">Jan Raasch</a></p>',
  '</body>',
  '</html>'
].join('');

fs.writeFileSync(indexPath, indexHtml);

log('Done! :)');
