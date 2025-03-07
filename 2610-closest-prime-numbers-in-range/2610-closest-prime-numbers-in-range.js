
const isPrimeNumber = (n) => {
    let factors = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors += 1;
            if (n / i !== i) {
                factors += 1;
            }
        }
        if (factors > 2) {
            return false;
        }
    }
    return true;
};

var closestPrimes = function (left, right) {
    const primeNumbers = [];
    for (let i = left <= 1 ? 2 : left; i <= right; i++) {
        if (isPrimeNumber(i)) {
            primeNumbers.push(i);
        }
    }
    if (primeNumbers.length <= 1) {
        return [-1, -1];
    }
    const answer = [0, 0];
    let minDiff = Number.MAX_VALUE;
    for (let i = 1; i < primeNumbers.length; i++) {
        const absDiff = Math.abs(primeNumbers[i] - primeNumbers[i - 1]);
        if (absDiff < minDiff) {
            minDiff = absDiff;
            answer[0] = primeNumbers[i - 1];
            answer[1] = primeNumbers[i];
        }
    }
    return answer;
};