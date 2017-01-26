(function () {
  var alert = window.alert;
  var showdown = window.showdown;

  var ERROR_HEADING = 'Markdown rendering could not be enabled.'
  var fail = function (message) {
    return alert(
      ERROR_HEADING + '\n\n' + 'Error: ' + message
    )
  };

  var FastMail = window.FastMail;
  if (!FastMail) {
    return fail('Could not find global FastMail object.');
  }

  var FM_NotificationView = FastMail.NotificationView;
  var FM_notifications = FastMail.notifications;

  if (!window.FastMailMarkdown) {
    // We write this the window, so we can easily access the original,
    // even when the bookmarklet is clicked multiple times.
    window.FastMailMarkdown = {
      originalDrawPlainText: FastMail.drawPlainText
    }
  }

  var originalDrawPlainText = window.FastMailMarkdown.originalDrawPlainText;

  if (!FM_NotificationView || !FM_notifications || !originalDrawPlainText) {
    return fail(
      'Missing some methods on global FastMail object:\n' +
      '!!FM_NotificationView: ' + !!FM_NotificationView + ',\n' +
      '!!FM_notifications: ' + !!FM_notifications + ',\n' +
      '!!originalDrawPlainText: ' + !!originalDrawPlainText + '.'
    );
  } else {
    if (!FM_notifications.show) {
      return fail('Missing show-function on FM_notifications object.');
    }
  }

  var ENABLED_MARKDOWN_MESSAGE = 'Enabled Markdown rendering for Plain Text content.';
  var DISABLED_MARKDOWN_MESSAGE = 'Disabled Markdown rendering for Plain Text content.';

  // See https://github.com/showdownjs/showdown
  var converterOptions = {
    ghCompatibleHeaderId: true,
    parseImgDimensions: true,
    requireSpaceBeforeHeadingText: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    simpleLineBreaks: true,
    simplifiedAutoLink: true
  };
  var cssString = '';

  var drawMarkdown = function (markdown, collapseQuotes) {
    var converter = new showdown.Converter(converterOptions);
    var html = converter.makeHtml(markdown);

    return FastMail.drawHTML(html, cssString, {
      isForCompose: false,
      rewriteIds: true,
      rewriteInternalLinks: true,
      blockExternalImages: false,
      removeReferrer: true,
      collapseQuotes: collapseQuotes ? true : false,
      quoteComplexityMinCount: 3
    });
  };

  var showNotification = function (text) {
    return FM_notifications.show(new FM_NotificationView({
      allowTextSelection: true,
      precedence: 10,
      html: text,
      timeout: 1e3 * 5
    }));
  };

  var enableMarkdown = function () {
    FastMail.drawPlainText = drawMarkdown;
    return showNotification(ENABLED_MARKDOWN_MESSAGE);
  };

  var disableMarkdown = function () {
    FastMail.drawPlainText = originalDrawPlainText;
    return showNotification(DISABLED_MARKDOWN_MESSAGE);
  };

  var toggleMarkdown = function () {
    if (FastMail.drawPlainText !== originalDrawPlainText) {
      disableMarkdown();
    } else {
      enableMarkdown();
    }
  };

  toggleMarkdown();
}())
