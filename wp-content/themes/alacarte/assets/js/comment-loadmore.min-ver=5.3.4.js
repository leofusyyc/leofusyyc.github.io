jQuery(function($){
 
	// load more button click event
	$('.red-comment-loadmore').click( function(){
		var button = $(this);
		// decrease the current comment page value
		cpage--;
 
		$.ajax({
			url : ajaxurl, // AJAX handler, declared before
			data : {
				'action': 'cloadmore', // wp_ajax_cloadmore
				'post_id': parent_post_id, // the current post
				'cpage' : cpage, // current comment page
			},
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.parent().find('.commentlist').addClass('red-loading');
				button.text(button.attr('data-text-loading')); // preloader here
			},
			success : function( data ){
				button.parent().find('.commentlist').removeClass('red-loading');
				if( data ) {
					$('ol.commentlist').append( data );
					button.text(button.attr('data-text')); 
					 // if the last page, remove the button
					if ( cpage == 1 ){
						button.text(button.attr('data-text')); 
						button.remove();
					}
				} else {
					button.text(button.attr('data-text')); 
					button.remove();
				}
			}
		});
		return false;
	});
})