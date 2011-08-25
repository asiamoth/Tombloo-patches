/**
 * tombloo.service.extractors.amazon.extract.js
 *
 * † Amazon 関連のポスト時に起こるタイトルの問題を修正する
 *
 * @version 0.04
 * @date 2011-08-26
 * @author asiamoth <asiamoth+github@gmail.com>
 * - Blog    : http://asiamoth.com/mt/
 * - Twitter : http://twitter.com/asiamoth
 * - Tumblr  : http://memo.asiamoth.com/
 *             http://news.asiamoth.com/
 *             http://ero.asiamoth.com/
 * @license Same as Tombloo
 * @updateURL https://github.com/asiamoth/Tombloo-patches/raw/master/tombloo.service.extractors.amazon.extract.js
 *
 * Tombloo: https://github.com/to/tombloo/wiki
 */

(function (undefined) {

  Tombloo.Service.extractors.Amazon.extract = function (ctx) {

    var asinTitle = $x('id("btAsinTitle")'),

    // 「著者ページを見る」リンクがある場合に対応
    xpath = ['id("handleBuy")/div[@class="buying"]/span//a/text()',
             'id("handleBuy")/div[@class="buying"]/a/text()'].join('|'),

    // 01_utility.js: function $x(exp, context, multi)
    // multi にして複数の著作者名をすべて「配列で」取得
    author = $x(xpath, currentDocument(), true);

    ctx.href = this.normalizeUrl(ctx.host, this.getAsin(ctx));

    if (asinTitle) {
      ctx.title = 'Amazon: ' + convertToPlainText(asinTitle);
      // javascript: if ([]) {alert('true')} // 空の配列は true
      if (author.length !== 0) {
        ctx.title += ': ' + author.join(', ');
      }
    } else {
      // 単純にページのタイトルのままで post する
      ctx.title = ctx.title;
    }

  };

})();