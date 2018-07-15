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
  firstDepart = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();



  database.ref().push({
    name: trainName,
    destination: destination,
    firstDepart: firstDepart,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
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
  
    database.ref().push({
      name: trainName,
      destination: destination,
      firstDepart: firstDepart,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
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

database.ref().on("child_added", function (childSnapshot) {

  // var trainDiff = 0;
  // var trainRemainder = 0;
  // var minutesUntilArrival = "";
  // var nextTrainTime = "";

  // trainDiff = moment().diff(moment.unix(childSnapshot.val().time), minutes);
  // trainRemainder = trainDiff % frequency;
  // minutesUntilArrival = frequency - trainRemainder;
  // nextTrainTime = moment().add(minutesUntilArrival, "m").format("hh:mm A");

  var trainTime = moment(childSnapshot.val().firstDepart, "HH:mm").subtract(1, "years");
  
  var timeDiff = moment().diff(moment(trainTime), "minutes");

  var trainFrequency = childSnapshot.val().frequency;
  
  var timeAway = timeDiff % trainFrequency;
  
  var timeUntilNext = trainFrequency - timeAway;

  
  var placeholderTime = moment().add(timeUntilNext, "minutes");
  var arrivalTime = moment(placeholderTime).format("hh:mm");

  console.log(childSnapshot.val());
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().time);
  console.log(childSnapshot.val().frequency);

  $(".table-data").prepend(
    "<tr><td>" + childSnapshot.val().name + "</td>" +
    "<td>" + childSnapshot.val().destination + "</td>" +
    "<td>" + childSnapshot.val().frequency + "</td>" +
    "<td>" + timeUntilNext + " minutes" + "</td>" +
    "<td>" + arrivalTime + "</td></tr>"
  );

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});