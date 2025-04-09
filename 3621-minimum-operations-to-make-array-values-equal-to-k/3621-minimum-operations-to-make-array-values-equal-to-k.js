const minOperations = (nums, k) => 
    nums.every(v => v >= k) ? new Set(nums.filter(v => v != k)).size : -1;
