/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function getPrimeScores(arr) {
    // this function basically computes the prime factors of an array
    if (arr.length === 0) return [];
    
    const maxNum = Math.max(...arr);
    const sieve = Array(maxNum + 1).fill(true);
    sieve[0] = sieve[1] = false;
    
    // Sieve of Eratosthenes to find primes up to maxNum
    for (let i = 2; i * i <= maxNum; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= maxNum; j += i) {
                sieve[j] = false;
            }
        }
    }
    
    const primes = [];
    for (let i = 2; i <= maxNum; i++) {
        if (sieve[i]) primes.push(i);
    }
    
    // Function to compute the prime score of a single number
    function getPrimeScore(num) {
        if (num === 1) return 0;
        let score = 0;
        let remaining = num;
        
        for (const p of primes) {
            if (p * p > remaining) break;
            if (remaining % p === 0) {
                score++;
                while (remaining % p === 0) {
                    remaining = Math.floor(remaining / p);
                }
            }
        }
        
        if (remaining > 1) score++;
        return score;
    }
    
    return arr.map(getPrimeScore);
}
function fastExponentiation(a, b, mod) {
    let result = 1n; // Start with BigInt 1
    a = BigInt(a) % mod; // Ensure base is BigInt
    b = BigInt(b); // Ensure exponent is BigInt
    while (b > 0n) {
        if (b % 2n === 1n) {
            result = (result * a) % mod;
        }
        a = (a * a) % mod;
        b = b / 2n;
    }
    return result % mod; // Returns a BigInt
}
var maximumScore = function(nums, k) {
    const MOD = BigInt(1e9 + 7);
    let n = nums.length;
    let s = getPrimeScores(nums); // calculate Prime score of nums
    let left = [], right = [];
    let stack = [], top = -1;
    for(let i = 0; i<n; i++){ // fill up left array
        top = stack.length-1; 
        if(top>=0 && stack[top][0]>=s[i]){
            left.push(stack[top][1]);
        } else{
            while(top>=0 && stack[top][0]<s[i]){
                stack.pop();
                top--;
            }
            if(top>=0) left.push(stack[top][1]);
            else left.push(-1);
        }
        stack.push([s[i], i])
    }
    stack = [], top = -1;
    for(let i = n-1; i>=0;i--){ // fill up right array
        top = stack.length-1; 
        if(top>=0 && stack[top][0]>s[i]){
            right[i] = stack[top][1];
        } else{
            while(top>=0 && stack[top][0]<=s[i]){
                stack.pop();
                top--;
            }
            if(top>=0) {right[i] = stack[top][1]}
            else {right[i] = n}
        }
        stack.push([s[i], i])
    }
    const customSort = (s1, s2) => {
        // sort the nums array on these criteria
        let scoreDiff = s[s1[1]] - s[s1[1]];
        if(scoreDiff!==0) return scoreDiff;
        let valDiff = s1[0] - s2[0];
        if(valDiff!==0) return valDiff;
        return s1[1] - s2[1];
    }
    let numsSorted = nums.map((val, i) => [val, i]); // we need indices too!
    numsSorted.sort(customSort); // numsSorted is now sorted (ascending order)
    
    let ans = BigInt(1), remK = k, i = n - 1; // run loop from the end
    while(remK && i>=0){
        let tempS = numsSorted[i];
        let range = (tempS[1] - left[tempS[1]]) * (right[tempS[1]] - tempS[1]);
        let min = Math.min(range, remK);
        ans = (BigInt(ans) * fastExponentiation(tempS[0], min, MOD)) % MOD
        remK -= min;
        i--;
    }
    return Number(ans);
};