//Global variables
let yourPlayer;


//create the character objects
let darthVader = {
    healthPoints: 180,
    attackPower: 6,
    counterAttackPower: 25,
};

let hansSolo = {
    healthPoints: 120,
    attackPower: 6,
    counterAttackPower: 10,
};

let lukeSkywalker = {
    healthPoints: 100,
    attackPower: 6,
    counterAttackPower: 5,
};

let yoda = {
    healthPoints: 120,
    attackPower: 6,
    counterAttackPower: 20,
};

$("#charIcons").click(function (event){
    //let idVal = $(EventTarget).attr("id");
    selectYourChar($(event.target).attr("id"));
});

$("#enemyCharIcons").click(function (event){
    //let idVal = $(EventTarget).attr("id");
    selectEnemy($(event.target).attr("id"));
})

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

    //debugger;
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