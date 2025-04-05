var subsetXORSum = function(nums) {
    const n = nums.length;
    let total = 0;
    for (let mask = 0; mask < (1 << n); mask++) {
        let subsetXor = 0;
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subsetXor ^= nums[i];
            }
        }
        total += subsetXor;
    }
    return total;
};