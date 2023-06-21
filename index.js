
var colors = [];
var level = 0;
var index = 0;
var buttons_disabled = true;
var game_started = false;

$(document).ready(function () {

    $("body").bind('keypress',function(e) {
        if (e.keyCode == 65 || e.keyCode == 97 && game_started == false) {
            resetGame();
            $("body").removeClass("game-over");
            game_started = true;
            newLevel();
        }
    });

async function flashColors(colors) {
    
    for (let i = 0; i < colors.length; i++) {
        const element = colors[i];
        colorFlash(element);
        await sleep(1000);
    }

    buttons_disabled = false;
}

function addColor(color_array) {
    color_array.push(Math.floor(Math.random()*4))
}

var buttonColors = ["green", "red", "yellow", "blue"];

function colorFlash(color_number) {
    $("#" + buttonColors[color_number]).fadeIn(500).fadeOut(500).fadeIn(500);  
    audio = new Audio("sounds/" + buttonColors[color_number] + ".mp3");
    audio.play()
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function newLevel() {
    index = 0;
    addColor(colors);
    flashColors(colors);
    level++;
    logEverything()
    $("#level-title").text("Level : " + (parseInt(level)));
    await sleep(2000);
}

function Lose() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    $("#level-title").text("Wrong, You lose!");
    $("#level-subtitle").text("Press A to start again.");
    game_started = false;
}

function resetGame(){
    index = 0;
    colors = [];
    level = 0;
    $("#level-subtitle").text("");


}
function logEverything() {
    console.log(index, colors, level)
}



async function checkCorrect(color) {

    if (colors[index++] == color) {
        var correct_sound = new Audio("sounds/"+ buttonColors[color] +".mp3")
        correct_sound.play();    
        if (index == colors.length)
        {
            var correct_sound = new Audio("sounds/right.mp3");
            correct_sound.play();
            buttons_disabled = true;
            await sleep(1000);
            newLevel();
        }

    }
    else{
        Lose();
    }
}


    $(".btn").click(async function (e) { 

        if (!buttons_disabled) {

            if (game_started) {
               
                var color = buttonColors.indexOf($(this)[0].id);
                $(this).fadeOut(200).fadeIn(200);
                checkCorrect(color);
                
            }
        }
    
        
    });
    

});

