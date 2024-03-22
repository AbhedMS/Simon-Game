var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var userClick = 0;

var started = false

$(document).keypress(function(){
    if(!started){
        console.log("Game started");
        $("body").removeClass("game-over");
        gamePattern = [];
        newSequence();
        started = true;
    }
});


$(".btn").click(function(){
    userClick++;

    console.log("No of clicks: " + userClick);

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function (){
        $("#" + userChosenColor).removeClass("pressed");
    }, 100);

    console.log("Color you clicked: " + userChosenColor);
    console.log("Color you should have clicked: " + gamePattern[userClick - 1]);
    
    if(userChosenColor === gamePattern[userClick - 1]){
        console.log("correct");
        if(userClick === gamePattern.length){
            newSequence();
        }
        
    }else{
        $("#level-title").text("Game Over. Press anykey to Restart.");
        started = false;
        level = 0;
        $("body").addClass("game-over")
        playSound("wrong");
    }
});



// functions
function newSequence() {

    console.log("New sequence added");
    level++;
    $("#level-title").text("Level " + (level));
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(function (){
        $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
        playSound(randomChosenColor);
    }, 1000);

    console.log("Game Pattern: " + gamePattern);

    userClick = 0;
}

function playSound(name) {

    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(currentColor).addClass("pressed")
    setTimeout(function () {
        $(currentColor).removeClass("pressed");
    }, 100);
}