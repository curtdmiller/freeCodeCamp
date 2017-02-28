/*
 * Sum All Numbers in a Range
 *
 * We'll pass you an array of two numbers. Return the sum of those two numbers and
 * all numbers between them.
 *
 * The lowest number will not always come first.
 */

function sumAll(arr) {
    var max = arr.reduce(function(a, b) {
        return Math.max(a, b);
    });
    var min = arr.reduce(function(a, b) {
        return Math.min(a, b);
    });
    var acc = 0;
    for (var i = min; i <= max; i++) {
        acc += i;
    }
    return acc;
}

sumAll([1, 4]); // should return 10.
sumAll([4, 1]); // should return 10.
sumAll([5, 10]); // should return 45.
sumAll([10, 5]); // should return 45.
