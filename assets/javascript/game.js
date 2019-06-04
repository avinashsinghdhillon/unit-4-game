//Global variables
let yourPlayer;
let enemyPlayer;
let yourAttackPower = 0;
let yourCharLoaded = false;
let enemyLoaded = false;
let enemyCnt = 0;

//create the character objects
let hansSolo = {
    name: "Hans Solo",
    healthPoints: 120,
    baseAttack: 6,
    attackPower: 6,
    counterAttackPower: 10,
};

let lukeSkywalker = {
    name: "Luke Skywalker",
    healthPoints: 100,
    baseAttack: 6,
    attackPower: 6,
    counterAttackPower: 5,
};

let yoda = {
    name: "Yoda",
    healthPoints: 120,
    baseAttack: 6,
    attackPower: 6,
    counterAttackPower: 12,
};

let darthVader = {
    name: "Darth Vader",
    healthPoints: 180,
    baseAttack: 6,
    attackPower: 6,
    counterAttackPower: 13,
};


//this is the hover function event
$(".icon").hover(function (){
    var hoverObj = assignCharObj($(this).attr("id"));
    $("#allCharName").text("Name: " + hoverObj.name);
    $("#allCharHP").text("Health: " + hoverObj.healthPoints);
    $("#allCharAtt").text("Attack: " + hoverObj.attackPower);
    $("#allCharCntrAtt").text("Cntr Attk: " + hoverObj.counterAttackPower);
    $("#allCharStats").css({
        "opacity": 1,
    })
});


//these are the click event function

$(".icon").click(function (event){
    console.log($(this));
    //if "Your Character" is not loaded, the first click loads that
    if(!yourCharLoaded){
        selectYourChar($(this).attr("id"));
        //assign this character's object to "Your Character"
        yourPlayer = assignCharObj($(event.target).attr("id"));
        //turn off clicking on this character
        $(this).off("click");

    }else if(!enemyLoaded){
    //if "your character" is loaded but the enemy character is not, the click loads that
        selectEnemy($(event.target).attr("id"));
        //assign this character's object to "Defender/Enemy Character"
        enemyPlayer = assignCharObj($(event.target).attr("id"));
        //turn off clicking on this character
        $(this).off("click");
    }
    //else{ //if both characters are loaded, the click event should do nothing}     
});



$("#butReset").click(function(){
    resetGame();
});

//these are the named functions

function selectYourChar (idValue) {
    yourCharLoaded = true;
    //change the border color to green for friendly combatant
    $("#" + idValue).css ({
        "border-color": "darkGreen",
    })

    //move this icon to "Your Character" section
    $("#yourCharIcon").append($("#" + idValue));
    $("#selectCharMsg").css({
        "opacity": 0,
    });
    $("#yourCharSec").css({
        "opacity": 1,
    });
    //move the remaining conbatants to the "Enemies Available" section
    $("#enemyCharIcons").prepend($("#charIcons").children());
    enemyCnt = $("#enemyCharIcons").children().length;

    $("#enemiesAvailSec").css({
        "opacity": 1,
    });

    //Change the border color to red for enemy combatants
    $("#enemyCharIcons").children().css({
        "border-color": "red",
    });
}

function selectEnemy(idValue){
    enemyLoaded = true;
    $("#enemyIcon").append($("#" + idValue));
    enemyLoaded = true;
    $("#enemiesAvailMsg").text("Enemy left to defeat")
    $("#defenderSec").css({
        "opacity": 1,
    });
    $("#fightSec").css({
        "opacity": 1,
    });

}

//when player clicks the attack button
$("#butAtt").click(function (){
    if(!enemyLoaded) {
        return;
    }
    //your player attack lowers enemy health points
    enemyPlayer.healthPoints = enemyPlayer.healthPoints - yourPlayer.attackPower;
    $("#dmgDealt").text("Your damage done: " + yourPlayer.attackPower);
    $("#cntrAttDmgDealt").text("Counter attack damage dealt by your enemy: " + enemyPlayer.counterAttackPower);
    $("#enemyHealthMsg").text("Defender health: " + enemyPlayer.healthPoints);

    //the enemy's counter attack lowers your player's HP
    yourPlayer.healthPoints = yourPlayer.healthPoints - enemyPlayer.counterAttackPower;
    $("#yourCharHealthMsg").text("Your Character health: " + yourPlayer.healthPoints);
    
    //if your player survives, increase their attack power;
    if(yourPlayer.healthPoints > 0){
        yourPlayer.attackPower = yourPlayer.attackPower + yourPlayer.baseAttack;
    }else {
        //display message for loss
        $("#resetMsg").text("You Lost ! Click Reset to play again.");
        //enable reset game button
        $("#resetSec").css ({
            "opacity": 1,
        });
    }
    //if the enemy player has lost all its HP select another enemy 
    if(enemyPlayer.healthPoints <= 0){
        enemyVanquished();
        if(enemyCnt > 0){
            //ask player to click to select next enemy/defender
            $("#enemiesAvailMsg").text("Select next Enemy to attack")
            // the players click event will load the next enemy

        }else{
            //if the player has defeated all the enemies, display win message
            $("#resetMsg").text("You Won !!! Click Reset to play again.");
            //enable reset game saction
            $("#resetSec").css ({
            "opacity": 1,
        });
        }
    }
});

//
function assignCharObj (charName){
switch (charName) {

    case "hansSolo":
        return hansSolo;
        break;
    case "lukeSkywalker":
        return lukeSkywalker;
        break;
    case "yoda":
        return yoda;
        break;
    case "darthVader":
        return darthVader;
        break;
    default:
        return darthVader;
        break;
    }
}


function enemyVanquished(){
    enemyCnt--;
    enemyLoaded = false;
    //move the defeated character to the defeated section and hide it
    $("#defeatedEnemyIcons").append($("#enemyIcon").children());
};

function resetGame() {
    //reset all globals
    yourPlayer = null;
    enemyPlayer = null;
    yourAttackPower = 0;
    yourCharLoaded = false;
    enemyLoaded = false;
    enemyCnt = 0;

    //reset health and attack of all combatants
    hansSolo.healthPoints = 120;
    hansSolo.attackPower = 6;
    lukeSkywalker.healthPoints = 100;
    lukeSkywalker.attackPower = 6;
    yoda.healthPoints = 120;
    yoda.attackPower = 6;
    darthVader.healthPoints = 180;
    darthVader.attackPower = 6;

    //hide all hidden sections
    $(".hidden").css({
        "opacity": 0,
    })

    //replace all icons to the "charIcons" Div
    $("#charIcons").append($(".icon"));
    $(".icon").css({
        "border-color": "yellow",
    });

    //reset all message texts

    $("#selectCharMsg").css({
        "opacity": 1,
    })
    $("#yourCharHealthMsg").text("Your Character");
    $("#enemyHealthMsg").text("Defender");

    //reset click to "on" on all characters
    $(".icon").click(function (event){
        debugger;
        //if "Your Character" is not loaded, the first click loads that
        if(!yourCharLoaded){
            selectYourChar($(this).attr("id"));
            //assign this character's object to "Your Character"
            yourPlayer = assignCharObj($(event.target).attr("id"));
            //turn off clicking on this character
            $(this).off("click");

    
        }else if(!enemyLoaded){
        //if "your character" is loaded but the enemy character is not, the click loads that
            selectEnemy($(event.target).attr("id"));
            //assign this character's object to "Defender/Enemy Character"
            enemyPlayer = assignCharObj($(event.target).attr("id"));
            //turn off clicking on this character
            $(this).off("click");
        }
        //else{ //if both characters are loaded, the click event should do nothing}     
    });


}