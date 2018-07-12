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
  
  