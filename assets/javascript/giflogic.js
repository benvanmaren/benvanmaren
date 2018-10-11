$(document).ready(function () {
    var topics = ["cat", "dog", "fish", "bat", "snake", "bird", "spider", "rabbit", "cow", "billygoat", "camel", "dinosaur", "reptile", "hawk", "scorpion", "cattle", "eel", "dolphin", "whale", "stingray"]

    function renderButtons() {
        $("#animal-buttons").empty();
        for (let i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.text(topics[i]);
            a.attr("data-name", topics[i]);
            a.addClass("button");
            $("#animal-buttons").append(a);
        }
    }

    $("#add-animal").click(function (e) {
        e.preventDefault();
        var newAnimal = $("#animal-input").val().trim();
        topics.push(newAnimal);
        renderButtons();
    })

    function displayAnimalGifs(animalName) {
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?api_key=rdlr2Nj2wp1fOx5N5mQAhK8vCF44NcoR&q=" + animalName + "&limit=10",
            method: "GET"
        }).done(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                var newGifBox = $("<div id=gif-box>");
                var newGif = $("<img>");
                var newGifRating = $("<p>");
                    // defaults
                newGif.attr("src", response.data[i].images.fixed_height_still.url);
                newGif.attr("data-state", "still");
                  // options
                newGif.attr("data-still", response.data[i].images.fixed_height_still.url);
                newGif.attr("data-animate", response.data[i].images.fixed_height.url);
                newGif.attr("class", "gif");
                newGifRating.text("Rating: " + response.data[i].rating);
                $("#animals").append(newGifBox);
                newGifBox.append(newGifRating);
                newGifBox.append(newGif);
                
            }
        });
    }

    $(document).on("click", ".button", function (e) {
        var name = $(this).attr("data-name"); 
        $("#animals").empty();               
        displayAnimalGifs(name);
    });

    $("#animals").on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        var animateUrl = $(this).attr("data-animate");
        var stillUrl = $(this).attr("data-still");
        if (state === "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", animateUrl)
        }
        else if (state === "animate") {
            $(this).attr("data-state", "still");
            $(this).attr("src", stillUrl);
        }
    })

    renderButtons();
})