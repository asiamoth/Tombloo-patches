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
