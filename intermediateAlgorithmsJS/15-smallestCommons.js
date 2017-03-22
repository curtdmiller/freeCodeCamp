/* Smallest Common Multiple
 *
 * Find the smallest common multiple of the provided parameters that can be
 * evenly divided by both, as well as by all sequential numbers in the range
 * between these parameters.
 *
 * The range will be an array of two numbers that will not necessarily be in numerical order.
 *
 * e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is
 * evenly divisible by all numbers between 1 and 3.
 */

function smallestCommons(arr) {
    var common = false;
    var mul;
    arr.sort();
    for(var i = 1; !common; i++) { // increment index while common not found
        mul = arr[1] * i; // try next lowest multiple of higher term
        var divisible = true;
        for(var l = arr[0], g = arr[1]; l < g; l++) { // for integers from arr[0] to arr[1]
            if(mul % l > 0) { // if not divisible, set divisible and break loop-no more checking needed
                divisible = false;
                break;
            }
        }
        if (divisible) common = true;
    }
    return mul;
}
smallestCommons([3, 2]);
smallestCommons([1, 5]); // should return 60.
smallestCommons([5, 1]); // should return 60.
smallestCommons([1, 13]); // should return 360360.
smallestCommons([23, 18]); // should return 6056820.
