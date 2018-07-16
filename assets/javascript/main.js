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

// Click Event with Mouse
$("#btn-add").on("click", function (event) {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();

  if (trainName === "") {
    alert("please enter a train name");
    return false;
  } else if (destination === "") {
    alert("please enter a destination");
    return false;
  } else if (trainTime === "") {
    alert("please enter a train time");
    return false;
  } else if (frequency === "") {
    alert("please enter a frequency");
    return false;
  }

  database.ref().push({
    name: trainName,
    destination: destination,
    trainTime: trainTime,
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

// Enter Event with Enter Key
$(document).keydown(function (e) {
  var key_one = 13;

  if (e.keyCode == key_one) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    if (trainName === "") {
      alert("please enter a train name");
      return false;
    } else if (destination === "") {
      alert("please enter a destination");
      return false;
    } else if (trainTime === "") {
      alert("please enter a train time");
      return false;
    } else if (frequency === "") {
      alert("please enter a frequency");
      return false;
    }

    database.ref().push({
      name: trainName,
      destination: destination,
      trainTime: trainTime,
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
  var trainTime = moment(childSnapshot.val().trainTime, "HH:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(trainTime), "minutes");
  var trainFrequency = childSnapshot.val().frequency;
  var timeAway = timeDiff % trainFrequency;
  var timeUntilNext = trainFrequency - timeAway;
  var time = moment().add(timeUntilNext, "minutes");
  var arrivalTime = moment(time).format("HH:mm");

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