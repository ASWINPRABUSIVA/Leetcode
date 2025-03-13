var minZeroArray = function (nums, queries) {
    let l = 0, r = queries.length + 1; // Binary search range

    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (isGood(mid)) {
            r = mid; // Try to minimize k
        } else {
            l = mid + 1;
        }
    }

    return l === queries.length + 1 ? -1 : l;

    function isGood(k) {
        const sweepLine = Array(nums.length + 1).fill(0);

        for (let i = 0; i < k; i++) {
            const [s, e, val] = queries[i];
            sweepLine[s] += val;
            sweepLine[e + 1] -= val;
        }

        let acc = 0;
        for (let i = 0; i < nums.length; i++) {
            acc += sweepLine[i];
            if (acc < nums[i]) return false; // Can't fully zero this index
        }

        return true;
    }
};