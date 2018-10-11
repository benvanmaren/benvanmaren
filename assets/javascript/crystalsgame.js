var totalScore = 0;
var crystalOneRandomNumber = Math.floor(Math.random() * 11 + 1);
var crystalTwoRandomNumber = Math.floor(Math.random() * 11 + 1);
var crystalThreeRandomNumber = Math.floor(Math.random() * 11 + 1);
var crystalFourRandomNumber = Math.floor(Math.random() * 11 + 1);
var targetRandomNumber = Math.floor(Math.random() * 101 + 19);
var wins = 0;
var losses = 0;

function restart() {
    totalScore = 0;

    crystalOneRandomNumber = Math.floor(Math.random() * 11 + 1);
    crystalTwoRandomNumber = Math.floor(Math.random() * 11 + 1);
    crystalThreeRandomNumber = Math.floor(Math.random() * 11 + 1);
    crystalFourRandomNumber = Math.floor(Math.random() * 11 + 1);
    targetRandomNumber = Math.floor(Math.random() * 101 + 19);
    $("#total-score").html(totalScore);
    $("#target-random-number-box").html(targetRandomNumber);
    $("#wins-losses-box").html("<p>Wins: " + wins + "</p><p>Losses: " + losses + "</p>");
    console.log("----------------------------------------")
    console.log("1: " + crystalOneRandomNumber);
    console.log("2: " + crystalTwoRandomNumber);
    console.log("3: " + crystalThreeRandomNumber);
    console.log("4: " + crystalFourRandomNumber);
    console.log("Target: " + targetRandomNumber);
    console.log("Your total: " + totalScore);
    console.log("Wins: " + wins);
    console.log("Losses: " + losses);
}
$("#total-score").html(totalScore);
$("#target-random-number-box").html(targetRandomNumber);
$("#wins-losses-box").html("<p>Wins: " + wins + "</p><p>Losses: " + losses + "</p>");

$("#crystal-one").click(function () {
    totalScore = totalScore + crystalOneRandomNumber;
});

$("#crystal-two").click(function () {
    totalScore = totalScore + crystalTwoRandomNumber;
});

$("#crystal-three").click(function () {
    totalScore = totalScore + crystalThreeRandomNumber;
});

$("#crystal-four").click(function () {
    totalScore = totalScore + crystalFourRandomNumber;
});

$("#crystals").click(function () {
    $("#total-score").html(totalScore);
    console.log("Your total: " + totalScore);
    if (totalScore === targetRandomNumber) {
        wins++;
        restart();
        alert("You won! Good guessing");
        
    }
    else if (totalScore > targetRandomNumber) {
        losses++;
        restart();
        alert("You lose. Guess smarter");
        
    }
});



console.log("1: " + crystalOneRandomNumber);
console.log("2: " + crystalTwoRandomNumber);
console.log("3: " + crystalThreeRandomNumber);
console.log("4: " + crystalFourRandomNumber);
console.log("Target: " + targetRandomNumber);
console.log("Your total: " + totalScore);
console.log("Wins: " + wins);
console.log("Losses: " + losses);