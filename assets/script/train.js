// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBy5XOJO31QPtq40auWeUZhFkraAhqHZ3w",
    authDomain: "week7-trainproject.firebaseapp.com",
    databaseURL: "https://week7-trainproject.firebaseio.com",
    projectId: "week7-trainproject",
    storageBucket: "week7-trainproject.appspot.com",
    messagingSenderId: "405008950185"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  // 2. Button for adding train
  $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainStart = $("#trainTimeInput").val().trim();
    var trainFrequency = $("#frequencyInput").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainNameDB: trainName,
        trainDestinationDB: trainDestination,
        trainStartDB: trainStart,
        trainFrequencyDB: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);

    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainNameDB;
    var trainDestination = childSnapshot.val().trainDestinationDB;
    var trainStart = childSnapshot.val().trainStartDB;
    var trainFrequency = childSnapshot.val().trainFrequencyDB;
  
    // Calculations of next train and minutes away
    var trainTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    var remainderTime = diffTime % trainFrequency;
    var trainMinutesAway = trainFrequency - remainderTime;
    var trainNext = moment().add(trainMinutesAway, "minutes");

    childSnapshot.val().trainNameDB;
    childSnapshot.val().trainDestinationDB;
    childSnapshot.val().trainFrequencyDB;
    childSnapshot.val().nextArrivalDb;
    childSnapshot.val().minutesAwayDb;

    $("#scheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + " mins" + "</td><td>" + moment(trainNext).format("hh:mm") + "</td><td>" + trainMinutesAway + "</td></tr>");



    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });













    // // Employee Info
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainStart);
    // console.log(trainFrequency);

    // var diffTime = moment().diff(moment.unix(trainStart), "minutes");
    // var timeRemainder = moment().diff(moment.unix(trainStart), "minutes") % trainFrequency ;
    // var minutes = trainFrequency - timeRemainder;

    // var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 

  
    // // To calculate the months worked
    // var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // // Time apart (remainder)
    // var tRemainder = diffTime % trainFrequency;

    // // Minute Until Train
    // var tMinutesTillTrain = trainFrequency - tRemainder;

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");    
  
    // Calculate the total billed rate
    // var empBilled = empMonths * trainFrequency;
    // console.log(empBilled);
  
    // Create the new row
    // var newRow = $("<tr>").append(
    //   $("<td>").text(trainName),
    //   $("<td>").text(trainDestination),
    //   $("<td>").text(trainFrequency),
    // //   $("<td>").text(nextTrain),
    //   $("<td>").text(tMinutesTillTrain)
    // );
  
    // Append the new row to the table
//     $("#scheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
//     // $("#scheduleTable > tbody").append(newRow);
//   });