/**
 * tombloo.service.extractors.yfrog.js
 *
 * yfrog に投稿された画像を原寸大で Post する
 *
 * @version 0.01
 * @date 2011-08-16
 * @author asiamoth <asiamoth+github@gmail.com>
 * - Blog    : http://asiamoth.com/mt/
 * - Twitter : http://twitter.com/asiamoth
 * - Tumblr  : http://memo.asiamoth.com/
 *             http://news.asiamoth.com/
 *             http://ero.asiamoth.com/
 * @license Same as Tombloo
 * @updateURL https://github.com/asiamoth/Tombloo-patches/blob/master/tombloo.service.extractors.yfrog.js
 *
 * Tombloo: https://github.com/to/tombloo/wiki
 */

(function() {
  Tombloo.Service.extractors.register({
  name : 'Photo - yfrog',
  ICON : 'http://yfrog.com/favicon.ico',
  URL  : 'http://yfrog.com/',

  check : function(ctx){
    return ctx.onImage &&
    ctx.href.match('^http://yfrog.com/') &&
    ctx.target.src.match('/desmond.yfrog.com/');
  },

  extract : function(ctx){
    var zoomUrl = ctx.href.replace('yfrog.com', 'yfrog.com/z');

    return request(zoomUrl).addCallback(function(res){
      return {
      type    : 'photo',
      item    : ctx.title,
      itemUrl : $x("id('the-image')/a/img", convertToHTMLDocument(res.responseText)).src
    };
    });
  }

  }, 'Photo', false);
})();
