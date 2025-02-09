/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs = function(nums) {
    let map = new Map();// we create a map to store the count of non bad pairs
    let count = 0; // stores non bad pair
    let n = nums.length;

   for(let i=0;i<n;i++){
// since  (j - i != nums[j] - nums[i])==(nums[i] - i != nums[j] - j)
        let diff  = nums[i]-i; 
        if(map.has(diff)){// if map already has same diff then its a non bad pair so count the pairs
            count +=map.get(diff);
        }
// increment the current diff to the count if not present make it 1
        map.set(diff,(map.get(diff)||0)+1);
   } 
// we have the count of all non bad pairs
// So we now subtract the all pair with not bad pair
// bad pair = (all possible pair - not bad pair)
   return ((n*(n-1))/2)-count;
};