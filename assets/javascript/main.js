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

  var connectionsRef = database.ref("/connections");

  var connectedRef = database.ref(".info/connected");

  connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);
  
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });


  
  