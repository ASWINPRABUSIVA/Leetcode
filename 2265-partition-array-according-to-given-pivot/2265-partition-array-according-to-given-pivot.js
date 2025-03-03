/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function(nums, pivot) {
    const low = [];
    const mid = [];
    const high = [];
    
    for (let num of nums) {
        if (num < pivot) { low.push(num); }
        else if (num === pivot) { mid.push(num); }
        else { high.push(num); }
    }
    
    return [...low, ...mid, ...high];    
};