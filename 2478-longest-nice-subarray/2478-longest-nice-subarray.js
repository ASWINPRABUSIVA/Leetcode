/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
    let left = 0, bitMask = 0, maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        // If AND is not zero, remove elements from the left
        while ((bitMask & nums[right]) !== 0) {
            bitMask ^= nums[left]; // Remove leftmost element from the bitmask
            left++; // Shrink window
        }

        bitMask |= nums[right]; // Add current element to bitmask
        maxLength = Math.max(maxLength, right - left + 1); // Update max length
    }

    return maxLength;
};