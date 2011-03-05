addBefore( Tumblr, 'appendTags', function( form, ps ){

  if ( ps.type == 'photo' &&
       !( ps.favorite && ps.favorite.name && ps.favorite.name == 'Tumblr' ) ) {
    form['post[state]'] = 2;
  }

});
