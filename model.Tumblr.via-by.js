addAround( Tumblr.Photo, 'convertToForm', function( proceed, args ) {

  var form = proceed( args );
  form['post[two]'] = form['post[two]'].replace( /\(via\s*(<a href=\"http:\/\/.+(deviantart\.com|flickr\.com|ffffound\.com))/, '(by $1' );
  return form;

});
