const mergeArrays = (a, b) => {
    const c = [];
    for (let i = 0, j = 0; i < a.length || j < b.length;) {
        const [aId, aVal] = a[i] ?? [1001, 1001];
        const [bId, bVal] = b[j] ?? [1001, 1001];
        if (aId < bId) {
            c.push(a[i]);
            ++i;
        } else if (aId > bId) {
            c.push(b[j]);
            ++j;
        } else {
            c.push([aId, aVal + bVal]);
            ++i;
            ++j;
        }
    }
    return c;
};