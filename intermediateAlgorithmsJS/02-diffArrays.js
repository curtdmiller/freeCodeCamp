/*
 * Diff Two arrays
 *
 * Compare two arrays and return a new array with any items only found in one of the
 * two given arrays, but not both. In other words, return the symmetric difference
 * of the two arrays.
 *
 */


function diffArray(arr1, arr2) {
    var fArr1 = arr1.filter(function(val){
        return arr2.indexOf(val) == -1;
    });
    var fArr2 = arr2.filter(function(val){
        return arr1.indexOf(val) == -1;
    });
    return fArr1.concat(fArr2);
}

diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]); // should return ["pink wool"].
diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]); // should return ["diorite", "pink wool"].
diffArray(["andesite", "grass", "dirt", "dead shrub"], ["andesite", "grass", "dirt", "dead shrub"]); // should return [].
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]); // should return [4].
diffArray([1, "calf", 3, "piglet"], [1, "calf", 3, 4]); // should return ["piglet", 4].
diffArray([], ["snuffleupagus", "cookie monster", "elmo"]); // should return ["snuffleupagus", "cookie monster", "elmo"].
diffArray([1, "calf", 3, "piglet"], [7, "filly"]); // should return [1, "calf", 3, "piglet", 7, "filly"].
