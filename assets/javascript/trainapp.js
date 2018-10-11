var config = {
    apiKey: "AIzaSyDCQj_jJJ8FnTZYvl153l7b3dM-cH81BRo",
    authDomain: "train-hw-7.firebaseapp.com",
    databaseURL: "https://train-hw-7.firebaseio.com",
    projectId: "train-hw-7",
    storageBucket: "train-hw-7.appspot.com",
    messagingSenderId: "723333222708"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var freq = "";
var nextArrivalTime = "";

$("#buttonsubmit").on("click", function (event) {

    event.preventDefault();
    trainName = $("#train-name").val();
    destination = $("#destination").val();
    firstTrainTime = $("#first-train-time").val();
    freq = $("#freq").val();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrivalTime = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrivalTime).format("hh:mm A"));

    database.ref(trainName).set({
        trainName: trainName,
        destination: destination,
        freq: freq,
        firstTrainTime: firstTrainTime,
        nextArrivalTime: moment(nextArrivalTime).format("hh:mm A"),
        minutesAway: minutesAway
    });

    $("#train-name").val(" ");
    $("#destination").val(" ");
    $("#first-train-time").val(" ");
    $("#freq").val(" ");
})

database.ref().on("child_added", function (childSnapshot) {

    var newRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().freq),
        $("<td>").text(childSnapshot.val().nextArrivalTime),
        $("<td>").text(childSnapshot.val().minutesAway)
    );

    $("#tbody").append(newRow);

});