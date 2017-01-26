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
  '<br>',
  'The source code is available on <a href="https://github.com/janraasch/fastmail-markdown">GitHub</a>.',
  '</p>',
  '</body>',
  '</html>'
].join('');

fs.writeFileSync(indexPath, indexHtml);

log('Done! :)');
