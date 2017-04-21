var squares = document.getElementsByTagName('td'),
    tokenModal = document.getElementsByClassName('token-modal')[0],
    xButton = document.getElementById('x-button'),
    oButton = document.getElementById('o-button'),
    turn = 0,
    availableMoves = [0,1,2,3,4,5,6,7,8],
    userMoves = [],
    compMoves = [],
    userToken,
    compToken;

// EVENTS SETUP
// callback factory to avoid closure inside for loop
function makeEventCallback(index) {
    return function(){
        if (availableMoves.indexOf(index) !== -1) { // if move still available
            userTurn(index);
        } else {
            console.log("move not available");
        }
    }
}
for (var i = 0; i < squares.length; i++){
    squares[i].onclick = makeEventCallback(i);
}
xButton.addEventListener("click", function(){
    reset();
    userToken = "fa-times";
    compToken = "fa-circle-o";
    tokenModal.style.display = "none";
});
oButton.addEventListener("click", function(){
    reset();
    userToken = "fa-circle-o";
    compToken = "fa-times";
    tokenModal.style.display = "none";
    compTurn();
});

// GAME FUNCTIONS
function mark(position, token){
    squares[position].firstChild.classList.toggle(token); // mark it
}
function userTurn(position) {
    mark(position, userToken) // mark it
    availableMoves.splice(availableMoves.indexOf(position), 1); // remove from available
    userMoves.push(position);
    if (checkForWin(userMoves)) { // check if game is over
        console.log("you win!");
        // availableMoves = []; // discontinue play
        tokenModal.style.display = "block";
    } else if (availableMoves.length === 0) { // if no more moves and no winner
        console.log('tie');
        tokenModal.style.display = "block";
    } else {
        compTurn();
    }
}
function compTurn(){
    // currently random
    var pos = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    mark(pos, compToken);
    availableMoves.splice(availableMoves.indexOf(pos), 1); // remove from available
    compMoves.push(pos);
    if (checkForWin(compMoves)) { // check if game is over
        console.log("computer wins!");
        availableMoves = []; // discontinue play
        tokenModal.style.display = "block";
    } else if (availableMoves.length === 0) { // if no more moves and no winner
        console.log('tie');
        tokenModal.style.display = "block";
    }
}
function checkForWin(moves){
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

function reset(){
    turn = 0;
    availableMoves = [0,1,2,3,4,5,6,7,8];
    userMoves = [];
    compMoves = [];
    for (var i = 0; i < squares.length; i++){
        squares[i].firstChild.classList = "fa";
    }
}
