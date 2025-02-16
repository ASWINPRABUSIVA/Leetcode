/**
 * @param {number} n
 * @return {number[]}
 */
var constructDistancedSequence = function(n) {
    const size = 2 * n - 1;
    const result = new Array(size).fill(0);
    const used = new Array(n + 1).fill(false);

    function backtrack(index) {
        if (index === size) return true; // Successfully filled the array
        if (result[index] !== 0) return backtrack(index + 1); // Skip filled positions
        for (let num = n; num >= 1; num--) {
            if (used[num]) continue;
            if (num === 1) { 
                // Place 1 (only once)
                result[index] = 1;
                used[num] = true;
                if (backtrack(index + 1)) return true;
                result[index] = 0;
                used[num] = false;
            } else {
                // Place num at both index and index + num
                if (index + num < size && result[index + num] === 0) {
                    result[index] = result[index + num] = num;
                    used[num] = true;
                    if (backtrack(index + 1)) return true;
                    result[index] = result[index + num] = 0;
                    used[num] = false;
                }
            }
        }
        return false; // Backtrack if no valid placement
    }
    backtrack(0);
    return result;
};