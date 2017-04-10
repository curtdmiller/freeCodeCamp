/* No repeats please
 * Return the number of total permutations of the provided string that don't
 * have repeated consecutive letters. Assume that all characters in the
 * provided string are each unique.
 *
 * For example, aab should return 2 because it has 6 total permutations
 * (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't
 * have the same letter (in this case a) repeating.
 */
function permAlone(str) {
    var count = 0;
    var reg = /(.)\1/; // captured group and backreference already constitute 2 occurences, anything more is unnecessary to detect repetition
    var permutations = heaps(str);
    permutations = permutations.filter(function(el){
        return !reg.test(el);
    });
    // console.log(permutations.length);
    return permutations.length;
}
function lexicographic(str) {
    var perm = [];
    var indices = [];
    // create a set of indices in ascending order to ensure all permutations regardless of letter repeats
    for (var i = 0, length = str.length; i < length; i++){
        indices.push(i)
    }
    perm.push(indices.join(''));
    generateP(indices);

    function generateP(arr){
        var k, l;
        k = findK(arr);
        while (k > -1) {
            l = findL(arr, k);
            arr = swap(arr, k, l);
            arr = reverse(arr, k);
            perm.push(arr.join(''));
            k = findK(arr);
        }
    }
    function findK(arr) { // largest index k such that arr[k] < arr[k+1]
        for (var i = arr.length - 2; i >= 0; i--){
            if(arr[i] < arr[i + 1]){
                return i;
            }
        }
        return -1; // if none exists
    }
    function findL(arr, k) { // largest index l greater than k such that arr[k] < arr[l]
        for (var i = arr.length - 1; i > k; i--){
            if (arr[i] > arr[k]) {
                return i;
            }
        }
    }
    function swap(arr, k, l) {
        var temp = arr[k];
        arr[k] = arr[l];
        arr[l] = temp;
        return arr;
    }
    function reverse(arr, k) {
        var sub = arr.splice(k + 1);
        sub.reverse();
        return arr.concat(sub);
    }
    console.log(perm);
    return perm;
}
function heaps(str) { // version logging all steps, non-recursive for speed adapted from https://en.wikipedia.org/wiki/Heap%27s_algorithm pseudocode for use with a string
    var n = str.length;
    var arr = str.split('');
    var c = [], perms = [];
    var swap = function(arr, k, l) {
        var temp = arr[k];
        arr[k] = arr[l];
        arr[l] = temp;
    }
    var i;
    for( i = 0 ; i < n; i++){ // create array c with n elements each equal to 0
        c[i] = 0;
    }
    perms.push(arr.join(''));
    i = 0;
    var count = 0;
    while (i < n) { // while index is less than the size of the array
        count++;
        // console.log(count + '.');
        // console.log('c[i]: ' + c[i] + ', i: ' + i + ', c[i] < i? ' + (c[i] < i)); //
        if (c[i] < i){ //
            // console.log('i % 2: ' + (i%2));
            if (i % 2 === 0) {
                swap(arr, 0, i);
                // console.log('swap 0 and ' + i);
            } else {
                swap(arr, c[i], i);
                // console.log('swap ' + c[i] + ' and ' + i);
            }
            // console.log(arr);
            perms.push(arr.join(''));
            c[i] += 1;
            i = 0;
        } else {
            // console.log('no swap, c[' + i + '] = 0 and i (' + i + ') += 1');
            c[i] = 0;
            i += 1;
        }
        // console.log('-------------------');
    }
    // console.log(perms);
    return perms;
}

// heaps("aab");
// lexicographic("aab");
permAlone("aab"); // should return a number.
permAlone("aab"); // should return 2.
permAlone("aaa"); // should return 0.
permAlone("aabb"); // should return 8.
permAlone("abcdefa"); // should return 3600.
permAlone("abfdefa"); // should return 2640.
permAlone("zzzzzzzz"); // should return 0.
permAlone("a"); // should return 1.
permAlone("aaab"); // should return 0.
permAlone("aaabb"); // should return 12.
