var squares = document.getElementsByTagName('td'),
    turn = 0,
    availableMoves = [0,1,2,3,4,5,6,7,8],
    xMoves = [],
    oMoves = [],
    timer;

function takeTurn(position) {
    turn++;
    if (availableMoves.indexOf(position) !== -1) { // if move still available
        if (turn % 2) { // if odd
            squares[position].firstChild.classList.toggle("fa-times"); // mark it
            availableMoves.splice(availableMoves.indexOf(position), 1); // remove from available
            xMoves.push(position); // add to x moves
            if (checkForWin(xMoves)) { // check if game is over
                console.log("x win");
                availableMoves = []; // discontinue play
                timer = setTimeout(reset, 2000); // delay clear to relish results.
            } else if (availableMoves.length === 0) { // if no more moves and no winner
                console.log('tie');
                timer = setTimeout(reset, 2000); // delay clear to relish results.
            }
        } else { // even
            squares[position].firstChild.classList.toggle("fa-circle-o");
            availableMoves.splice(availableMoves.indexOf(position), 1);
            oMoves.push(position);
            if (checkForWin(oMoves)) {
                console.log("o win");
                availableMoves = [];
                timer = setTimeout(reset, 2000);
            } else if (availableMoves.length === 0) {
                console.log('tie');
                timer = setTimeout(reset, 2000); // delay clear to relish results.
            }
        }
    } else {
        console.log("move not available");
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

// callback factory to avoid closure inside for loop
function makeEventCallback(index) {
    return function(){
        takeTurn(index);
    }
}
for (var i = 0; i < squares.length; i++){
    squares[i].onclick = makeEventCallback(i);
}
function reset(){
    turn = 0;
    availableMoves = [0,1,2,3,4,5,6,7,8];
    xMoves = [];
    oMoves = [];
    for (var i = 0; i < squares.length; i++){
        squares[i].firstChild.classList = "fa";
    }
}
