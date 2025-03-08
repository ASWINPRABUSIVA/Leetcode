/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
    let minOperations = Infinity;
    let whiteCount = 0;

    // Initial window
    for (let i = 0; i < k; i++) {
        if (blocks[i] === 'W') whiteCount++;
    }
    minOperations = whiteCount; // Initial minimum operations

    // Slide the window
    for (let i = k; i < blocks.length; i++) {
        if (blocks[i - k] === 'W') whiteCount--; // Remove leftmost
        if (blocks[i] === 'W') whiteCount++;     // Add rightmost

        minOperations = Math.min(minOperations, whiteCount);

        // Early exit if we already found a window with all 'B's
        if (minOperations === 0) return 0;
    }

    return minOperations;
};