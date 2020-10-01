let gameScreen:string[][]= new Array(100);
let trim:String = "";
for (let i = 0; i < gameScreen.length; i++) {
    gameScreen[i]=new Array(90);
}
for (let i = 0;i < gameScreen.length; i++) {
    for (let j = 0;j < gameScreen[i].length; j++) {
        gameScreen[i][j]=' ';
    }
}
for (let i = 3; i < 10; i++) {
    gameScreen[i][3]='*';
}
for (let i = 3; i < 20; i++) {
    gameScreen[4][i]='*';
}
for (let i = 0;i < gameScreen.length; i++) {
    for (let j = 0;j < gameScreen[i].length; j++) {
        trim+=gameScreen[i][j];
    }
    trim+="\n"
}
console.log(trim);