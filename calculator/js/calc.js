var num = ''; // currently displayed number
var expr = []; // complete pre equal expression
var curExpr = ''; // current string version of the expression
var isDec = false; // current number is decimal?
var dec = 0; // current number of digits after decimal point
var sigfig = 0; // sig figs for entire expression
var result; // result of expression
var isRollover = false; // is number the result of the last expression?
$(document).ready(function(){
    $('.clear').click(function(){
        if (num) {
            curExpr = curExpr.slice(0, -num.length); // remove only the num entered at end of expr
        }
        num = ""; // reset num
        $('.screen h3').text('0');
        $('.expr').text(curExpr);
        dec = 0;
    });
    $('.all-clear').click(function(){
        expr = [];
        num = '';
        curExpr = '';
        $('.screen h3').text('0');
        $('.expr').text('');
        isDec = false;
        dec = 0;
        sigfig = 0;
    });
    $('.num').click(function(){
        if (isRollover) { // jQuery utility, if num is type Number, it is the result of the last operation, don't add to, clear and restart
            $('.all-clear').click();
            isRollover = false;
        } else if (isDec) {
            dec++; // if decimal, increase dec count
            if (dec > sigfig) { // if the current number has more decimals than sig fig (all numbers in expression)
                sigfig = dec;
            }
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
        if (num != ''){ // only push to expr if num has been entered and it is not a holdover result from last expression
            expr.push(num);
            expr.push($(this).attr('value')); // push operator into expression array
            num = '';
            curExpr += $(this).attr('value');
            $('.expr').text(curExpr);
            isDec = false; // reset isDec tracker
            dec = 0; // reset current number decimal count
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
            var operation = operator(expr[1]); // create a math function based on operator
            if (sigfig) {
                result = operation(parseFloat(expr[0]), parseFloat(expr[2])); // use the returned function
                result = result.toFixed(sigfig); // round to sig figs
            } else {
                result = operation(parseInt(expr[0]), parseInt(expr[2]));
            }
            expr.splice(0,3); // remove the first three items
            expr.unshift(result) // add result to the beginning for the next operation
        }
        expr.shift(); // remove result from expr for next expr
        num = result; // set num to result for next expr if not cleared
        curExpr = result.toString(); // stringify result for curExpr
        $('.expr').text(curExpr); // and display result as beginning of next expression
        $('.screen h3').text(result); // display result
        isRollover = true;
    });
});

function operator(op) {
    switch (op) {
        case '+':
        return function(a,b){
            return a + b;
        }
        break;
        case '-':
        return function(a,b){
            return a - b;
        }
        break;
        case '*':
        return function(a,b){
            return a * b;
        }
        break;
        case '/':
        return function(a,b){
            return a / b;
        }
        break;
        default:
        console.log('error!');
    }
}
