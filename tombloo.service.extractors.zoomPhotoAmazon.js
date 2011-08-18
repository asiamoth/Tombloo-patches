/**
 * tombloo.service.extractors.zoomPhotoAmazon.js
 *
 * † 「Amazon の拡大画像を share するパッチ」の適用ページを広げる
 * http://tumblr.g.hatena.ne.jp/cxx/20100627/1277629070
 *
 * @version 0.02
 * @date 2011-08-18
 * @author asiamoth <asiamoth+github@gmail.com>
 * - Blog    : http://asiamoth.com/mt/
 * - Twitter : http://twitter.com/asiamoth
 * - Tumblr  : http://memo.asiamoth.com/
 *             http://news.asiamoth.com/
 *             http://ero.asiamoth.com/
 * @license Same as Tombloo
 * @updateURL https://github.com/asiamoth/Tombloo-patches/raw/master/tombloo.service.extractors.zoomPhotoAmazon.js
 *
 * Tombloo: https://github.com/to/tombloo/wiki
 */

(function (undefined) {

  Tombloo.Service.extractors['Photo - Amazon'].check = function(ctx) {
    var xpath = ['./ancestor::*[@id="prodImageCell"]',
                 './ancestor::*[@id="prodImageOuter"]',
                 'id("magnifierLens")'].join('|');
    return Tombloo.Service.extractors.Amazon.preCheck(ctx) &&
      $x(xpath, ctx.target);
  };

  addAround(Tombloo.Service.extractors['Photo - Amazon'], 'extract', function(proceed, args) {
    var ctx = args[0], ps, template, detailImgSrc, zoom;

    if (!ctx.target.src) {
      ctx.target = $x('id("prodImageCell")/img | id("main-image")');
    }

    ps = proceed(args);
    ps.itemUrl = ps.itemUrl.replace('.L.LZZZZZZZ.', '.L.');

    // HTML をお手軽にコピー
    // template = ['<a href="', ctx.href, '"><img alt="photo" src="',
    //             ps.itemUrl.replace('.LZZZZZZZ.', '._SL160_.'),
    //             '" /></a>'].join('');
    // copyString(template);

    // 拡大画像を取得する
    // パターン 1
    // 例: http://www.amazon.co.jp/gp/product/B001TK8WWS/
    zoom = $x('//a[./span[contains(@class, "s_zoom")]]');
    if (zoom) {
      return request(zoom.href).addCallback(function(res){
        if (res.responseText.match(
          /DynAPI\.addZoomViewer\(\"([^\"]+)\",(?:\d+,){4}(\d+)/)) {
          ps.itemUrl = (RegExp.$1 + '._SCRMZZZZZZ_V' + RegExp.$2 + '_.jpg').
            replace('/R/', '/P/');
        }
        return ps;
      });
    }

    // パターン 2
    // 例: http://www.amazon.co.jp/gp/product/B004GUSS3G/
    detailImgSrc = $x('id("detailImg")/@src');
    if (detailImgSrc) {
      ps.itemUrl = detailImgSrc;
      return ps;
    }

    // パターン 3
    // 例: http://www.amazon.co.jp/gp/product/B0055X6JL6/
    // ──は、だれか たのむ

    return ps;

  });
})();
