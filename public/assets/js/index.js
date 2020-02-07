// Shorthand for $( document ).ready()
$(function () {
    console.log("ready!");

    $("#login-button").on("click", function () {
        console.log("clicked");
        //need to add some logic
    });

    $("#sign-up-button").on("click", function () {
        //need to add some logic
        console.log("clicked");
    });

    $("i").on("click", function () {
		event.preventDefault();
		const PostId = $(this).data("postId");
		console.log(PostId, "JQuery")
        if($(this).hasClass("far")){
			$(this).removeClass( "far" ).addClass( "fas" );
			$.post("/post/like", {PostId: PostId} )
            
        } else {
            $(this).removeClass( "fas" ).addClass( "far" );  
        }
    })
});