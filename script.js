// console.log("scriptSource");
let animals = ["cat", "dog", "mouse", "raccoon"];

function alertAnimalName() {

  }


let buttonFactory = function () {
    $("#buttons").empty();

    for (var i = 0; i < animals.length; i++) {
        let createButton = $("<button>");
        createButton.addClass("allButtons");
        createButton.val(animals[i]);
        createButton.text(animals[i]);
        $("#buttons").append(createButton);

       
    }
}
$(document).ready(function () {
    buttonFactory();
})

// adding an animal with the form:
$("#addAnimal").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var animalAdd = $("#addAnimal").val().trim();

    // Adding the animal from the textbox to our array
    animals.push(animalAdd);
    
    
    // $(document).ready(function () {
        buttonFactory();  
    // })
    
    console.log(animals);
  });
  $(document).on("click", ".allButtons", alertAnimalName);

  $(document).ready(function () {
      
})
  // Calling the buttonFactory function to display the intial buttons
  buttonFactory();

// ^ call the function only after the document has loaded


// below, we want to do the triple parameter function because the buttons are created dynamically, and don't exist when the page first loads
$(document).on("click", ".allButtons", function () {
    var beasts = $(this).val();//this refers to the button
    console.log(beasts);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        beasts + "&api_key=h9jMoqrAVs12Z29lxoBkom9AscjilpmV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(queryURL);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;
            var dataStill = results[i].images.fixed_height_still.url;
            var dataAnimate = results[i].images.fixed_height.url;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img class='gifs'>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", dataStill);
            animalImage.attr("data-animate", dataAnimate);
            animalImage.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#animals").prepend(gifDiv);
        };


    })
    // Pause Gifs:


$(document).on("click", ".gifs", function () {
    let clickedButton = $(this);
    console.log(clickedButton);

    let state = clickedButton.attr("data-state");
    let animated_url = clickedButton.attr("data-animate");
    let still_url = clickedButton.attr("data-still");


    if (state === "still") {
        clickedButton.attr("src", animated_url)
        clickedButton.attr("data-state", "animate")
    }
    else if (state === "animate") {
        clickedButton.attr("src", still_url)
        clickedButton.attr("data-state", "still")
    }
    else {
        console.log("Oh no!!!!")
    }

});
});