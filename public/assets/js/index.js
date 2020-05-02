$(() => {
	$('i').on('click', (e) => {
		e.preventDefault();
		const PostId = $(this).siblings('h5').data('postId');
		if ($(this).hasClass('far')) {
			$(this).removeClass('far').addClass('fas');
			$.post('/post/like', { PostId });
		} else {
			$(this).removeClass('fas').addClass('far');
			$.ajax({
				url: '/post/like',
				type: 'DELETE',
				data: { PostId },
			});
		}
	});
});
