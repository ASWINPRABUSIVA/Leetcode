var maximumTripletValue = function(nums) {
    let maxi = Number.MIN_SAFE_INTEGER;
    let diff = 0;
    let res = 0;
    
    for (let i = 0; i < nums.length; i++) {
        maxi = Math.max(maxi, nums[i]);
        if (i >= 2)
            res = Math.max(res, diff * nums[i]);
        if (i >= 1)
            diff = Math.max(diff, maxi - nums[i]);
    }
    
    return res;
};