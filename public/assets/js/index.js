// Shorthand for $( document ).ready()
$(function () {
	console.log("ready!");

	$("i").on("click", function () {
		event.preventDefault();
		const PostId = $(this).siblings("h5").data("postId");
		console.log(PostId, "JQuery")
		if ($(this).hasClass("far")) {
			$(this).removeClass("far").addClass("fas");
			$.post("/post/like", { PostId: PostId })

		} else {
			$(this).removeClass("fas").addClass("far");
			$.ajax({
				url: "/post/like",
				type: "DELETE",
				data: { PostId: PostId }
			});
		}
	})
});