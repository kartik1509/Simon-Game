var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var level = 0;
var start = 0;

$(document).keypress(function(){
    if(start === 0) {
        start = 1;
        // $("#level-title").text("level "+level);
        newSequence();
    }
});


$(".btn").click(function() {
    // var userChosenColour = $(event.currentTarget ).css("background-color");   gives the rgb code
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function newSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100);
    $("#"+randomChosenColour).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name+".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = 0;
}