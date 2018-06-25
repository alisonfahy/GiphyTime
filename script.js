console.log("scriptSource");
let animals = ["cat", "dog", "mouse", "raccoon"];
let buttonFactory = function () {
    $("#buttons").empty();

    for (i = 0; i < animals.length; i++) {
        let createButton = $("<button>");
        createButton.addClass("allButtons");
        createButton.attr("data-name", animals[i]);
        createButton.text(animals[i]);
        $("#buttons").append(createButton);
    }
}
$(document).ready(function() {
    buttonFactory();
})
// ^ call the function only after the document has loaded


// below, we want to do the triple parameter function because the buttons are created dynamically, and don't exist when the page first loads
$(document).on("click", ".allButtons", function () {
    // var beasts = $(".allButtons").attr("data-name", animals[i]);//this refers to the button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animals + "&api_key=h9jMoqrAVs12Z29lxoBkom9AscjilpmV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#animals").prepend(gifDiv);
        };


    }),
        // Pause Gifs:

        $("button").on("click", function () {
            let clickedButton = $(this);

            let state = clickedButton.attr("data-state");
            let animated_url = clickedButton.attr("data-animate");
            let still_url = clickedButton.attr("data-still");


            if (state == "still") {
                clickedButton.attr("src", animated_url)
                clickedButton.attr("data-state", "animate")
            }
            else if (state == "animate") {
                clickedButton.attr("src", still_url)
                clickedButton.attr("data-state", "still")
            }
            else {
                console.log("Oh no!!!!")
            }

        });
});