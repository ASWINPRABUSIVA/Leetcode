/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (str1, str2) {
    const m = str1.length, n = str2.length;

    // Step 1: Compute LCS using DP
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Step 2: Backtrack to construct SCS
    let i = m, j = n, scs = [];

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            scs.push(str1[i - 1]); // Add common character from LCS
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            scs.push(str1[i - 1]); // Take from str1
            i--;
        } else {
            scs.push(str2[j - 1]); // Take from str2
            j--;
        }
    }

    // Add remaining characters from either string
    while (i > 0) scs.push(str1[--i]);
    while (j > 0) scs.push(str2[--j]);

    return scs.reverse().join('');
};