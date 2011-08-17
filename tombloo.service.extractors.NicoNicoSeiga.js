/**
 * tombloo.service.extractors.NicoNicoSeiga.js
 *
 * † ニコニコ静画</a>の投稿ページから、原寸大の画像を Post するパッチ
 *
 * @version 0.03
 * @date 2011-08-18
 * @author asiamoth <asiamoth+github@gmail.com>
 * - Blog    : http://asiamoth.com/mt/
 * - Twitter : http://twitter.com/asiamoth
 * - Tumblr  : http://memo.asiamoth.com/
 *             http://news.asiamoth.com/
 *             http://ero.asiamoth.com/
 * @license Same as Tombloo
 * @updateURL https://github.com/asiamoth/Tombloo-patches/raw/master/tombloo.service.extractors.NicoNicoSeiga.js
 *
 * Tombloo: https://github.com/to/tombloo/wiki
 */

(function() {
  Tombloo.Service.extractors.register({
  name : 'Photo - Nico Nico Seiga',
  ICON : 'http://seiga.nicovideo.jp/favicon.ico',
  URL  : 'http://seiga.nicovideo.jp/',
  check : function(ctx) {
    if (!ctx.onLink) {
      return false;
    }
    return ctx.href.indexOf('//seiga.nicovideo.jp/seiga/') > -1;
  },
  extract : function(ctx) {
    ctx.target.src = ctx.link.href;
    return Tombloo.Service.extractors['Photo'].extract(ctx);
  }
  }, 'Photo', false);
})();
