// using big.js for ease of floating point math
Big.DP = 5; // big.js max decimal places for division and sqrt methods
Big.RM = 1; // big.js rounding mode, Rounds towards nearest neighbour. If equidistant, rounds away from zero.

var num = ''; // currently displayed number
var expr = []; // complete pre equal expression
var curExpr = ''; // current string version of the expression
var isDec = false; // current number is decimal?
var result; // result of expression
var isRollover = false; // is number the result of the last expression?

$(document).ready(function(){
    $('.clear').click(function(){
        if (num) {
            curExpr = curExpr.slice(0, -num.length); // remove only the num entered at end of expr
        }
        num = ''; // reset num
        $('.screen h3').text('0');
        $('.expr').text(curExpr);
    });
    $('.all-clear').click(function(){
        expr = [];
        num = '';
        curExpr = '';
        $('.screen h3').text('0');
        $('.expr').text('');
        isDec = false;
    });
    $('.num').click(function(){
        if (isRollover) { // jQuery utility, if num is type Number, it is the result of the last operation, don't add to, clear and restart
            $('.all-clear').click();
            isRollover = false;
        } else if (num === '0') {
            num = '';
            curExpr = curExpr.slice(0, -1);
        }
        num += $(this).attr('value'); // add button value
        curExpr += $(this).attr('value');
        $('.screen h3').text(num); // display
        $('.expr').text(curExpr);
    });
    $('.dot').click(function(){
        if (isRollover) {
            $('.all-clear').click();
            isRollover = false;
        }
        if (!isDec) { // only add decimal point if none exists yet
            num += '.';
            curExpr += '.';
            $('.screen h3').text(num);
            $('.expr').text(curExpr);
            isDec = true;
        }
    });
    $('.op').click(function(){
        if (num !== ''){ // only push to expr if num has been entered
            expr.push(num);
            expr.push($(this).attr('value')); // push operator into expression array
            num = '';
            curExpr += $(this).attr('value');
            $('.expr').text(curExpr);
            isDec = false; // reset isDec tracker
            isRollover = false;
        }
    });
    $('.eq').click(function(){
        if (num === '.') num = 0;
        if (num !== '') { // if there is an unpushed number
            expr.push(num); // push into expression
        } else if (isNaN(parseInt(expr[expr.length - 1]))) { // else if last element is NaN (is an operator)
            expr.splice(expr.length -1); // remove it
        }
        if (expr.length === 1) result = expr[0]; // if only a value, result equals that value
        while(expr.length > 2){ // operate on groups of three array objects
            var operation = opBig(expr[1]); // create a big.js math function based on operator
            result = operation(expr[0],expr[2]);
            expr.splice(0,3); // remove the first three items
            expr.unshift(result); // add result to the beginning for the next operation
        }
        expr.shift(); // remove result from expr for next expr
        num = result; // set num to result for next expr if not cleared
        curExpr = result.toString(); // stringify result for curExpr
        $('.expr').text(curExpr); // and display result as beginning of next expression
        $('.screen h3').text(result); // display result
        isRollover = true;
    });
});

function opBig(op) {
    switch (op) {
        case '+':
        return function(a,b) {
            a = new Big(a);
            b = new Big(b);
            return a.plus(b).toString();
        }
        case '-':
        return function(a,b){
            a = new Big(a);
            b = new Big(b);
            return a.sub(b).toString();
        }
        case '*':
        return function(a,b){
            a = new Big(a);
            b = new Big(b);
            return a.mul(b).toString();
        }
        case '/':
        return function(a,b){
            a = new Big(a);
            b = new Big(b);
            return a.div(b).toString();
        }
        default:
        console.log('error!');
    }
}
