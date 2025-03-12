const maximumCount = (nums) => {
    let positives = 0, negatives = 0;
    for (let value of nums) {
        positives += value > 0;
        negatives += value < 0;
    }
    return Math.max(positives, negatives);
};