/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumIndex = function (nums) {
    const n = nums.length;
    let candidate = -1, count = 0;

    // Step 1: Find the dominant element using Boyer-Moore Majority Voting Algorithm
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Step 2: Count the occurrences of the dominant element
    let totalCount = nums.reduce((acc, num) => acc + (num === candidate ? 1 : 0), 0);
    if (totalCount * 2 <= n) return -1;  // Confirm it is dominant

    // Step 3: Find the minimum valid split index
    let leftCount = 0;
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === candidate) leftCount++;

        let rightCount = totalCount - leftCount;
        if (leftCount * 2 > i + 1 && rightCount * 2 > (n - i - 1)) {
            return i;
        }
    }

    return -1; // No valid split found
};