var gamePattern = [];
var buttonColors =["red","blue","green","yellow"];
var userClickedPattern =[];

var started=false;
var level =0;

$(document).keypress(function(){
    
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }

      startOver();


});



$(".btn").click(function (){
    var userChosenColor= $(this).attr("id");
   
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    playGame(userClickedPattern.length-1);
    

});




function playGame(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      } 
    }else{
        playSound("wrong");
        $("h1").text("Game Over. Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
        
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
 
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // console.log(gamePattern);
    playSound(randomChosenColor);
   
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass('pressed');
        //....and whatever else you need to do
    }, 100);
    }
    
    function startOver(){
        level =0;
        gamePattern=[];
        userClickedPattern=[];
        $("h1").text("press a key to start");
        nextSequence();
    }