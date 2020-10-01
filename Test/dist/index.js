"use strict";
var gameScreen = new Array(100);
var trim = "";
for (var i = 0; i < gameScreen.length; i++) {
    gameScreen[i] = new Array(90);
}
for (var i = 0; i < gameScreen.length; i++) {
    for (var j = 0; j < gameScreen[i].length; j++) {
        gameScreen[i][j] = ' ';
    }
}
for (var i = 3; i < 10; i++) {
    gameScreen[i][3] = '*';
}
for (var i = 3; i < 20; i++) {
    gameScreen[4][i] = '*';
}
for (var i = 0; i < gameScreen.length; i++) {
    for (var j = 0; j < gameScreen[i].length; j++) {
        trim += gameScreen[i][j];
    }
    trim += "\n";
}
console.log(trim);
