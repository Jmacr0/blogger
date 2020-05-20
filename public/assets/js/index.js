$(() => {
	// handle like events
	$('i').on('click', function (e) {
		e.preventDefault();
		const postId = $(this).siblings('h5').data('postId');
		console.log(postId)
		if ($(this).hasClass('far')) {
			$(this).removeClass('far').addClass('fas');
			$.post('/api/like/one', { postId });
		} else {
			$(this).removeClass('fas').addClass('far');
			$.ajax({
				url: '/api/like/one',
				type: 'DELETE',
				data: { postId },
			});
		}
	});
	// handle delete post events
	$('#profilePosts').on('click', (e) => {
		const isDeleteButton = e.target.classList.contains('deletePost');
		if (isDeleteButton) {
			const postId = e.target.dataset.postId;
			console.log(postId)
			console.log('deletinggg')
			$.ajax({
				url: '/api/post/delete',
				type: 'DELETE',
				data: { postId },
			});
		}
	});
});
