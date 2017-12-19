$(document).ready(function() {
	var topics = ["the beatles", "family guy", "donald trump", "led zeppelin", "lol", "royal family", "george bush", "the simpsons", "south park", "kanye west", "nirvana", "jonah hill"];

	var imageStillURL;
	var newDiv;
	
	function createButtons() {
		for(var i = 0; i < topics.length; i++) {
			var button = $('<button class="button">');
			$(button).attr("data-name", topics[i]);
			var upper = topics[i].toUpperCase();
			$(button).text(upper);
			$("#buttons").append(button);
		}
	}

	createButtons();

	$("#gifs").hide();

	$(document).on("click", ".button", function() {
		$("#gifs").empty();
		$("#gifs").show();
		var withSpaces = $(this).attr("data-name");
		console.log(withSpaces);
		var withDashes = withSpaces.replace(/ /g, "-");
		console.log(withDashes);
		var apiKey = "dc6zaTOxFJmzC";
		var limit = 10;
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + withDashes + "&api_key=" + apiKey + "&limit=" + limit;
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			var results = response.data;
			for(var k = 0; k < results.length; k++) {
				newDiv = $('<div class="results">')
				var rating = results[k].rating.toUpperCase();
				imageStillURL = results[k].images.original_still.url;
				var imageAnimatedURL = results[k].images.original.url;
				var image = $('<img class="images">');
				var ratingParagraph = $('<p class="rating">');
				ratingParagraph.text("Rating: " + rating);
				$(image).attr("src", imageStillURL);
				$(image).attr("data-still", imageStillURL);
				$(image).attr("data-animated", imageAnimatedURL);
				$(image).attr("data-state", "still");
				$(newDiv).html(image);
				$(newDiv).prepend(ratingParagraph);
				$("#gifs").append(newDiv);
			}
		});
	});


	$("#gifs").on("click", "img", function() {
		var state = $(this).attr("data-state");
		var animatedSrc = $(this).attr("data-animated");
		var stillSrc = $(this).attr("data-still");
		if(state === "still") {
			$(this).attr("src", animatedSrc);
			$(this).attr("data-state", "animated");
			console.log("I'm animated now");
			
		}
		else {
			$(this).attr("src", stillSrc);
			var state = $(this).attr("data-state", "still");
			console.log("I'm NOT animated now");
		}
	});

	$("#submit-button").on("click", function(event) {
		if($("#textbox").val() === '') {
			console.log("enter a topic");
		}
		else {
			event.preventDefault();
			console.log("submit");
			var value = $("#textbox").val().trim();
			console.log(value);
			var newButton = $("<button>");
			$(newButton).attr("class", "button");
			$(newButton).attr("data-name", value);
			newButton.text(value.toUpperCase());
			$("#buttons").append(newButton);
			$("#textbox").val('');
		}
	})
});