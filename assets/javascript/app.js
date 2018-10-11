
var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "Who designed the dress that Lady Gaga wore at the 2018 Venice Film Festival?",
  answers: ["Versace", "Prada", "Valentino", "Chanel"],
  correctAnswer: "Valentino",
  image: "assets/images/valentino.jpg"
}, {
  question: "Name Lady Gaga’s co-star in Telephone (2009).",
  answers: ["Ariana Grande", "Jessie J.", "Banks", "Beyonce"],
  correctAnswer: "Beyonce",
  image: "assets/images/telephone.gif"
}, {
  question: "What nonprofit organization did Lady Gaga begin?",
  answers: ["You Are Who You Are", "Born This Way", "Suck It Up, It Gets Better", "Big Monster, Little Monster"],
  correctAnswer: "Born This Way",
  image: "assets/images/bornthisway.png"
}, {
  question: "What production has Lady Gaga NOT been a part of?",
  answers: ["American Horror Story", "Family Guy", "RuPaul's Drag Race", "The Simpsons"],
  correctAnswer: "Family Guy",
  image: "assets/images/simpsons.gif"
}, {
  question: "What is Lady Gaga's real first name?",
  answers: ["Brooke", "Joanne", "Stefani", "Chloe"],
  correctAnswer: "Stefani",
  image: "assets/images/stefani.jpg"
}, {
  question: "What instrument did Lady Gaga learn to play first, and how many years old was she?",
  answers: ["Piano, 11", "Guitar, 6", "Guitar, 13", "Piano, 4"],
  correctAnswer: "Piano, 4",
  image: "assets/images/piano.gif"
}, {
  question: "What Jazz musical star has Lady Gaga collaborated with to make an album?",
  answers: ["Tony Bennet", "Marcus Miller", "Nathan East", "Charlie Hunter"],
  correctAnswer: "Tony Bennet",
  image: "assets/images/tony.gif"
}, {
  question: "What chronic condition is Lady Gaga diagnosied with?",
  answers: ["Diabetes", "Lupus", "Fibromyalgia", "Rheumatoid arthritis"],
  correctAnswer: "Fibromyalgia",
  image: "assets/images/fibro.gif"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(game.counter);

    card.append("<h3>Correct Answers: " + game.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
