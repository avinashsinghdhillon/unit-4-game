//Global variables
let yourPlayer;
let enemyPlayer;
let yourAttackPower = 0;
let defenderHealth = 0;
let enemyLoaded = false;

//create the character objects

let hansSolo = {
    healthPoints: 120,
    baseAttack: 6,
    attackPower: 6,
    counterAttackPower: 10,
};

let lukeSkywalker = {
    healthPoints: 100,
    baseAttack: 6,
    attackPower: 6,
    counterAttackPower: 5,
};

let yoda = {
    healthPoints: 120,
    baseAttack: 7,
    attackPower: 7,
    counterAttackPower: 20,
};

let darthVader = {
    healthPoints: 180,
    baseAttack: 7,
    attackPower: 7,
    counterAttackPower: 25,
};

//these are the click events

$("#charIcons").click(function (event){
    selectYourChar($(event.target).attr("id"));
    //assign this character's object to "Your Character"
    yourPlayer = assignCharObj($(event.target).attr("id"));
});

$("#enemyCharIcons").click(function (event){
    selectEnemy($(event.target).attr("id"));
    //assign this character's object to "Defender/Enemy Character"
    enemyPlayer = assignCharObj($(event.target).attr("id"));
});

$("#butAtt").click(function () {

});


//these are the named functions

function selectYourChar (idValue) {
    //change the border color to green for friendly combatant
    $("#" + idValue).css ({
        "border-color": "darkGreen",
    })

    //move this icon to "Your Character" section
    let parentEle = $("#yourCharIcon").append($("#" + idValue));
    $(selectCharMsg).css({
        "opacity": 0,
    });

    //move the remaining conbatants to the "Enemies Available" section
    $("#enemyCharIcons").append($("#charIcons").children());

    //Change the border color to red for enemy combatants
    $("#enemyCharIcons").children().css({
        "border-color": "red",
    });
}

function selectEnemy(idValue){
    $("#enemyIcon").append($("#" + idValue));
}

//
function assignCharObj (charName){
    debugger;
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

//when player clicks the attack button
$("#butAtt").click(function (){
    debugger;
    if(!enemyLoaded) {
        return;
    }
    //the player attack lowers enemy health points
    yourEnemy.healthPoints =- yourPlayer.attackPower;

    //the enemy's counter attack lowers your player's HP
    yourPlayer.healthPoints =- yourEnemy.counterAttackPower;
    
    //if your player survives, increase their attack power;
    if(yourPlayer.healthPoints > 0){
        yourPlayer.attackPower =+ yourPlayer.baseAttack;
    }else {
        //your player has lost the game
        ////////// add code for loss/////////////
    }

    //if the enemy player has lost all its HP select another enemy if possible
    //if()
});