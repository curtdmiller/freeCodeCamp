var squares = document.getElementsByTagName('td'),
    tokenModal = document.getElementsByClassName('token-modal')[0],
    xButton = document.getElementById('x-button'),
    oButton = document.getElementById('o-button'),
    stat = document.getElementsByClassName('status')[0],
    game = new Game(),
    userToken,
    compToken;

// EVENTS SETUP
// callback factory to avoid closure inside for loop
function makeEventCallback(index) {
    return function(){
        if (game.turn === "comp"){
            UI.updateStatus("It's not your turn!");
            // console.log("not your turn");
        } else if (game.availableMoves.indexOf(index) !== -1) { // if move still available
            userTurn(index);
        } else {
            UI.updateStatus("Not available, pick an empty square.");
            // console.log("move not available");
        }
    }
}
for (var i = 0; i < squares.length; i++){
    squares[i].onclick = makeEventCallback(i);
}
xButton.addEventListener("click", function(){
    userToken = "fa-times";
    compToken = "fa-circle";
    game.reset();
    game.turn = "user";
    UI.modalToggle();
    UI.updateStatus("Your turn");
    UI.reset();
});
oButton.addEventListener("click", function(){
    userToken = "fa-circle";
    compToken = "fa-times";
    game.reset();
    game.turn = "comp";
    UI.modalToggle();
    UI.updateStatus("Computer turn")
    UI.reset();
    compTurn();
});

// UI module
var UI = (function(){
    var reset = function (){
        for (var i = 0; i < squares.length; i++){
            squares[i].firstChild.classList = "fa";
        }
    }
    var mark = function (position, token){
        squares[position].firstChild.classList.toggle(token); // mark it
    }
    var updateStatus = function (str){
        stat.innerHTML = str;
    }
    var modalToggle = function (){
        tokenModal.style.display = tokenModal.style.display === "none" ? "block" : "none";
    }
    return {
        mark: mark,
        reset: reset,
        modalToggle: modalToggle,
        updateStatus: updateStatus
    }
})();

// Game object constructor
function Game(){
    this.availableMoves = [0,1,2,3,4,5,6,7,8];
    this.turn = "";
    this.result = "";
    this.userMoves = [];
    this.compMoves = [];
};
Game.prototype.update = function(pos){
    this.availableMoves.splice(this.availableMoves.indexOf(pos), 1); // remove from available
    if (this.turn === "user"){
        this.userMoves.push(pos);
    } else {
        this.compMoves.push(pos);
    }
}
Game.prototype.switchTurns = function() {
    this.turn = this.turn === "user" ? "comp" : "user";
}
Game.prototype.checkForWin = function(moves) {
    var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (var i = 0, length = wins.length; i < length; i++){
        var won = true;
        for (var j = 0; j < 3; j++){
            if (moves.indexOf(wins[i][j]) === -1) won = false;
        }
        if (won === true) {
            return true;
        }
    }
    return false;
}
Game.prototype.isOver = function() {
    if (this.checkForWin(this.compMoves)) { // check if game is over
        this.result = "Computer wins."
        return true;
    } else if (this.checkForWin(this.userMoves)){
        this.result = "You win!"
        return true;
    } else if (this.availableMoves.length === 0) { // if no more moves and no winner
        this.result = "Tie";
        return true;
    } else {
        return false;
    }
}
Game.prototype.reset = function(){
    this.availableMoves = [0,1,2,3,4,5,6,7,8];
    this.userMoves = [];
    this.compMoves = [];
}
Game.prototype.score = function (){
    if(this.result === "Computer wins."){
        return 10 - this.compMoves.length;
    } else if (this.result === "You win!"){
        return this.compMoves.length - 10;
    } else {
        return 0;
    }
}
Game.prototype.copyGame = function (source) {
    this.availableMoves = source.availableMoves.slice(0); // make a copy of the array, don't just pass a reference...
    this.turn = source.turn;
    this.result = source.result;
    this.userMoves = source.userMoves.slice(0);
    this.compMoves = source.compMoves.slice(0);
};

function userTurn(position) {
    UI.mark(position, userToken) // mark it
    game.update(position);
    if (game.isOver()){
        UI.updateStatus(game.result);
        setTimeout(UI.modalToggle, 1000);
    } else {
        game.switchTurns();
        UI.updateStatus("Computer Turn");
        compTurn();
    }
}
function compTurn(){
    var mmresults = [];
    // iterate through all possible next moves
    for (var i = 0; i < game.availableMoves.length; i++){
        var tempGame = new Game();
        tempGame.copyGame(game);
        tempGame.update(game.availableMoves[i]);
        tempGame.switchTurns();
        mmresults.push({"pos": game.availableMoves[i], "score": minimax(tempGame)});
    }
    // sort the minimax results in descending order
    mmresults.sort(function(a,b){
        if (a.score > b.score) {
            return -1;
        } else if (a.score < b.score) {
            return 1;
        } else {
            return 0;
        }
    });
    // mmresults.forEach(function(el){
    //     console.log(el.pos + ", score: " + el.score);
    // })
    // console.log('---------------------');

    // find last member of the sorted array which has an equivalent score to the first
    var lastEQIndex = mmresults.length - 1;
    while (mmresults[lastEQIndex].score !== mmresults[0].score){
        lastEQIndex--;
    }
    var choice = Math.floor(Math.random() * lastEQIndex); // choose a random equivalent index
    var pos = mmresults[choice].pos; // play the position stored at chosen index

    UI.mark(pos, compToken);
    game.update(pos);
    if (game.isOver()){
        UI.updateStatus(game.result);
        setTimeout(UI.modalToggle, 1000);
    } else {
        game.switchTurns();
        UI.updateStatus("Your turn");
    }
}
function minimax(curGame){
    if(curGame.isOver()){
        return curGame.score();
    } else {
        var score;
        // user is minimizing, set to impossibly bad score first.
        if (curGame.turn === "user"){
            score = 100;
        } else { // else comp turn
            score = -100;
        }
        // iterate through all available moves
        for (var i = 0; i < curGame.availableMoves.length; i++){
            var nextGame = new Game();
            nextGame.copyGame(curGame);
            nextGame.update(curGame.availableMoves[i]); // take turn
            nextGame.switchTurns(); // switch turn so that the recursive call has the correct turn
            var nextScore = minimax(nextGame); // the recursive call. drill down until an end is reached and a score is returned.
            if (curGame.turn === "user") { // curGame turn! not nextGame--determine the best scenario for this turn based on the result of the next.
                if (nextScore < score) { // find the user ideal (minimum) score returned from the possible results--either the score from a finished game, or the computer's resultant ideal move (as determined by future minimax calls)
                    score = nextScore;
                }
            } else {
                if (nextScore > score){ // find the comp ideal (maximum) score of all nextScores.
                    score = nextScore;
                }
            }
        }
        return score;
    }
}
