var trainName = "";
var destination = "";
var frequency = "";
var arrival = "";
var minsAway = "";
var trainTime = "";


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDE7rg8ikZyOkf1OXUhjLrzA8NmA2_kvmY",
  authDomain: "train-scheduler-81564.firebaseapp.com",
  databaseURL: "https://train-scheduler-81564.firebaseio.com",
  projectId: "train-scheduler-81564",
  storageBucket: "train-scheduler-81564.appspot.com",
  messagingSenderId: "841122170069"
};
firebase.initializeApp(config);

var database = firebase.database();

// Click Event
$("#btn-add").on("click", function (event) {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();



  database.ref().set({
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  });

  var addTrain = $(".form-control").val().trim();
    if (addTrain === "") {
        return false;
    }
    else {
        document.forms["inputForm"].reset();
    }
});

// Enter Event
$(document).keydown(function (e) {
  var key_one = 13;

  if (e.keyCode == key_one) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();
  
  
  
    database.ref().set({
      name: trainName,
      destination: destination,
      time: trainTime,
      frequency: frequency,
      arrival: arrival
    });
  
    var addTrain = $(".form-control").val().trim();
      if (addTrain === "") {
          return false;
      }
      else {
          document.forms["inputForm"].reset();
      }
  }
});

database.ref().on("value", function (snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().time);
  console.log(snapshot.val().frequency);

  $(".table-data").append(
    "<tr><td>" + snapshot.val().name + "</td>" +
    "<td>" + snapshot.val().destination + "</td>" +
    "<td>" + snapshot.val().frequency + "</td>" +
    "<td>" + snapshot.val().time + "</td>" +
    "<td>" + snapshot.val().arrival + "</td></tr>"
  );

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});