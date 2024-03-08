var buttonColors = ["red", "blue", "yellow", "green"];

//the pattern provided by the game chosen randomnly is stored 
var gamePattern = [];

//the buttons clicked by the user is stored 
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
    checkAnswer(userClickedPattern.length - 1);
});

//checking the current answer against the user input
function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");

        //adding the game over animation if the users clicks the wrong button
        gameOver();

        //to reset game values for a complete startover
        startOver();
    }
}

//function to add the game over animation and change the heading on wrong user input
function gameOver() {

    $("body").addClass("game-over");
    $("h1").text("Game Over, press any key to restart");


    setTimeout( function () {
        $("body").removeClass("game-over");
    }, 250);

}

// Starting the game again if the user inputs the wrong value 
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

function nextSequence() {

    //when the next sequence is called we need to make sure the user clicked patter is empty again and the level is incremented 
    userClickedPattern = [];
    level++;

    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    //add animation to the randomnly choosen button
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //add audio to the randomnly choosen button
    playSound(randomChosenColor);

}

function playSound(name) {

   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();

}

function animatePress(currentColor) {
    
    $("#" + currentColor).addClass("pressed");

    //to remove the effect after a 100 milliseconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


