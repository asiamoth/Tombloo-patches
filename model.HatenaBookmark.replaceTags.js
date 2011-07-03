addBefore(HatenaBookmark, 'post', function(ps){

  ps.tags = ps.tags || [];

  var  str = ps.tags.toString();

  // カンマで区切ると複数のタグになる
  str = str.replace('魔法少女まどか☆マギカ', '魔法少女,まどか☆マギカ').
  replace('あの日見た花の名前を僕達はまだ知らない。', 'あの花');

  ps.tags = str.split(",");

});