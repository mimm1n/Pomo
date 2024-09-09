
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//context is used for drawing on the canvas

//character
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight; //that way the dino feet touch the very bottom of the border to the hieght of the dino
let dinoImg;

//
let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
}

//on.load is for when apge laods
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getAnimations.Context('2d'); //used 4 drawing on the board

    dinoImg = new  Image();
    dinoImg.src = "./"

}