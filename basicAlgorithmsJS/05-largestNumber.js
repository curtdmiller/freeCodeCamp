/*
 * Return Largest Numbers in Arrays
 * Return an array consisting of the largest number from each provided sub-array. For simplicity, the provided array will contain exactly 4 sub-arrays.
 */

function largestOfFour(arr) {
    var largestArray = [];
    var currentLargest;
    for (var i = 0; i < arr.length; i++) {
        currentLargest = arr[i][0];
        for (var j = 1; j < arr[i].length; j++){
            if (currentLargest < arr[i][j]){
                currentLargest = arr[i][j];
            }
        }
        largestArray.push(currentLargest);
    }
    return largestArray;
}

function largestOfFourAlternative(arr) {
    var largestArray = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i].sort(function(a,b){
            return b - a;
        });
        largestArray.push(arr[i][0]);
    }
    return largestArray;
}

largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]) // should return [27,5,39,1001].
largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]) // should return [9, 35, 97, 1000000].

largestOfFourAlternative([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]) // should return [27,5,39,1001].
largestOfFourAlternative([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]) // should return [9, 35, 97, 1000000].