$(() => {
	// summernote
	$('#summernote').summernote({
		height: 200
	});
	// handle like events
	$('i.fa-heart').on('click', function (e) {
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
	// handle edit and delete post events
	$('#profilePosts').on('click', function (e) {
		const isEditButton = e.target.classList.contains('editPost');
		if (isEditButton) {
			const postId = e.target.dataset.postId;
		}

		const isShowDeleteButton = e.target.classList.contains('fa-trash-alt');
		if (isShowDeleteButton) {
			// NEXTELEMENTSIBLING cannot access STYLE property - fix later.

			const deleteButton = e.target.nextElementSibling;
			// if (deleteButton.style.visiblity === 'hidden') {
			// 	deleteButton.setAttribute('style', 'visibility: visible;')
			// } else {
			deleteButton.setAttribute('style', 'visibility: visible;')
			// }
		}

		const isDeleteButton = e.target.classList.contains('deletePost');
		if (isDeleteButton) {
			const postId = e.target.dataset.postId;

			let postMainElement = e.target.parentElement.parentElement.parentElement;
			const clonePostMainElement = postMainElement.cloneNode(true);
			const alert = postMainElement.previousElementSibling;

			postMainElement.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

			let currentPostTotal = parseInt($('.total-post-display').text());
			let newPostTotal = currentPostTotal - 1;
			$('.total-post-display').text(newPostTotal);

			$.ajax({
				url: '/api/post/delete',
				type: 'DELETE',
				data: { postId },
			}).then(() => {
				alert.classList.add('alert-success');
				alert.innerHTML = 'sucessfully deleted. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				postMainElement.textContent = '';
				alert.removeAttribute('style');
				console.log(alert)
			}).catch((err) => {
				newPostTotal = currentPostTotal;
				$('.total-post-display').text(newPostTotal);

				alert.classList.add('alert-danger');
				alert.innerHTML = 'something went wrong. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				alert.removeAttribute('style');
				console.log(clonePostMainElement)
				setTimeout(() => {
					postMainElement.textContent = '';
					postMainElement.replaceWith(clonePostMainElement);
				}, 2500);
			});
		}
	});
});
