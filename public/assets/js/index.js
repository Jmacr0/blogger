$(() => {
	// summernote
	$('#summernote').summernote({
		height: 200,
	});
	// handle like events
	$('i.fa-heart').on('click', function clickedLikePost(e) {
		e.preventDefault();
		const postId = $(this).siblings('h5').data('postId');
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

	$('.commentForm').submit(function createNewComment(e) {
		e.preventDefault();
		const comment = this.comment.value;
		const PostId = this.PostId.value;

		$(`#post${this.PostId.value}`)
			.find('.modal-body')
			.append(`
			<div class="container">
				<div class="row">
					<div class="col">
					<p>You:</p>
					<p>${comment}</p>
					</div>
				</div>
			</div>`);

		$.post('/api/comment/one', {
			PostId,
			comment,
		}).then(() => {

		}).catch(() => {

		});
	});
	// handle delete post events
	$('#profilePosts').on('click', (e) => {
		const isShowDeleteButton = e.target.classList.contains('fa-trash-alt');
		if (isShowDeleteButton) {
			// NEXTELEMENTSIBLING cannot access STYLE property - fix later.

			const deleteButton = e.target.nextElementSibling;
			// if (deleteButton.style.visiblity === 'hidden') {
			// 	deleteButton.setAttribute('style', 'visibility: visible;')
			// } else {
			deleteButton.setAttribute('style', 'visibility: visible;');
			// }
		}

		const isDeleteButton = e.target.classList.contains('deletePost');
		if (isDeleteButton) {
			const { postId } = e.target.dataset;

			const postMainElement = e.target.parentElement.parentElement;

			const clonePostMainElement = postMainElement.cloneNode(true);
			const alert = postMainElement.previousElementSibling;

			postMainElement.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

			const currentPostTotal = parseInt($('.total-post-display').text(), 10);
			let newPostTotal = currentPostTotal - 1;
			$('.total-post-display').text(newPostTotal);

			$.ajax({
				url: '/api/post/delete',
				type: 'DELETE',
				data: { postId },
			}).then(() => {
				alert.classList.add('alert-success');
				alert.innerHTML = 'sucessfully deleted. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				postMainElement.remove();
				alert.removeAttribute('style');
			}).catch(() => {
				newPostTotal = currentPostTotal;
				$('.total-post-display').text(newPostTotal);

				alert.classList.add('alert-danger');
				alert.innerHTML = 'something went wrong. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				alert.removeAttribute('style');
				setTimeout(() => {
					postMainElement.textContent = '';
					postMainElement.replaceWith(clonePostMainElement);
				}, 2500);
			});
		}
	});
});
