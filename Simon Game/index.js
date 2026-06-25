var arr = ['green', 'red', 'yellow', 'blue'];
var gamePattern = [];
var userPattern = [];
var gameLevel = 0;
var playerTurn = false;
var processing = false;

$(document).keydown (function(event){
    if(event.key == 'A' || event.key == 'a' && playerTurn == false){
            startGame();
        }
});

function startGame (){
     gamePattern = [];
     userPattern = [];
     gameLevel = 0;
     nextLevel();
    }

    function nextLevel (){
    processing = false;    
    gameLevel++;
    userPattern = [];

    $('h1').html('Level ' + gameLevel);
    var randomColor = arr [Math.floor(Math.random() * arr.length)];
    gamePattern.push(randomColor);

    $('.' + randomColor).addClass('pressed');
    soundsPlayer('.' + randomColor);
    setTimeout(function (){
        $('.' + randomColor).removeClass('pressed');
    }, 100);

    setTimeout(function() {
        playerTurn = true;
    }, 500);
    
    }

    
    $('.btn').click (function(){
        if(playerTurn == false) return; 

        var userClickedID = $(this).attr('id');
        var clickedBtn = $(this);
    
        userPattern.push(userClickedID); 
    
        soundsPlayer('.' + userClickedID);
        $(this).addClass("pressed");
        setTimeout(function () 
        {$(clickedBtn).removeClass("pressed")},90);

        checkAnswer();
    });


    function checkAnswer(){
            for(var i = 0; i < userPattern.length; i++){
                if(userPattern[i] === gamePattern[i]){
                    if (userPattern.length === gamePattern.length && !processing) {
                        processing = true;
                        playerTurn = false;
                        setTimeout (function() {nextLevel();
                     }, 1000);
    
                }
                } else {
                    playerTurn = false;
                   gameOver();
                }
            }  
}
    
function gameOver(){
    soundsPlayer('wrong');
    $('body').css('background-color', 'red');
    $('h1').html ('You Lost');

   setTimeout (function(){
    $('body').css('background-color', '#011F3F');
    startGame();
   }, 700); 
   
}



function soundsPlayer (aud){
    switch (aud){
        case '.yellow': 
        var yellow = new Audio('./sounds/yellow.mp3');
        yellow.play();
        break;

        case '.red': 
        var red = new Audio('./sounds/red.mp3');
        red.play();
        break;

        case '.green': 
        var green = new Audio('./sounds/green.mp3');
        green.play();
        break;

        case '.blue': 
        var blue = new Audio('./sounds/blue.mp3');
        blue.play();
        break;

        case 'wrong':
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
        break;
    }
}





