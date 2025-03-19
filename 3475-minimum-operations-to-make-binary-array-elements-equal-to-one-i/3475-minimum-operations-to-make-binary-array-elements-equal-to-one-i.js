/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    let operations = 0;
    let n = nums.length;

    for (let i = 0; i <= n - 3; i++) {
        if (nums[i] === 0) {
            // Flip the current triplet (i, i+1, i+2)
            nums[i] ^= 1;
            nums[i + 1] ^= 1;
            nums[i + 2] ^= 1;
            operations++;
        }
    }

    // After processing, if any `0` remains, return -1
    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) return -1;
    }

    return operations;
};