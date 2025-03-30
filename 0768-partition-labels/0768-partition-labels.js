/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    const n = s.length
    const lastOccurrence = new Map();
    const partitions = [];
    let start = 0;
    let end = 0;
    for (let i = 0; i < n; i++) {
        lastOccurrence.set(s[i], i);
    }
    for (let i = 0; i < n; i++) {
        end = Math.max(end, lastOccurrence.get(s[i]));
        if (i === end) {
            partitions.push(end - start + 1);
            start = i + 1;
        }
    }
    return partitions;    
};