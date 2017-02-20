/*
 * Seek and Destroy
 *
 * You will be provided with an initial array (the first argument in the destroyer
 * function), followed by one or more arguments. Remove all elements from the
 * initial array that are of the same value as these arguments.
 */

// linter complains that this one creates function in a loop...
function destroyerA(arr) {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];
        arr = arr.filter(function(val){
            return val !== arg;
        });
    }
    return arr;
}

function destroyer(arr) {
    for (var i = 1; i < arguments.length; i++) {
        while(arr.indexOf(arguments[i]) != -1){
            arr.splice(arr.indexOf(arguments[i]), 1);
        }
    }
    return arr;
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3); // should return [1, 1].
destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3); // should return [1, 5, 1].
destroyer([3, 5, 1, 2, 2], 2, 3, 5); // should return [1].
destroyer([2, 3, 2, 3], 2, 3); // should return [].
destroyer(["tree", "hamburger", 53], "tree", 53); // should return ["hamburger"].
