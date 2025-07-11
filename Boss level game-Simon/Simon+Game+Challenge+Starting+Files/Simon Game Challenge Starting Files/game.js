var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    level+=1;
    $("h1").text("Level "+level);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour); 
    
    
}

function playSound(name){
    var audioToBePlayed=new Audio("./sounds/"+name+".mp3");
    audioToBePlayed.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

$(".btn").click(function(){
    var newChosenColour=$(this).attr("id");
    userClickedPattern.push(newChosenColour);
    playSound(newChosenColour);
    $("#"+newChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(newChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
})



$(document).keydown(function(){
    if(!started){
    $("h1") .text("Level 0");
    started=true;
    nextSequence();
    }}
)
    


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    else{
        var soun=new Audio("./sounds/wrong.mp3");
        soun.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    }
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}