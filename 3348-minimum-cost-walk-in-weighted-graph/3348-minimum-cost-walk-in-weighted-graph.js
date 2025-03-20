var minimumCost = function (n, edges, query) {
    let parent = Array.from({ length: n }, (_, i) => i);
    let minPathCost = Array(n).fill(Infinity);

    const findRoot = (node) => {
        if (parent[node] !== node) {
            parent[node] = findRoot(parent[node]); // Path compression
        }
        return parent[node];
    };

    const union = (u, v, weight) => {
        let rootU = findRoot(u);
        let rootV = findRoot(v);

        if (rootU !== rootV) {
            parent[rootU] = rootV;
            minPathCost[rootV] &= minPathCost[rootU] & weight;
        } else {
            minPathCost[rootV] &= weight; // Update cost within the same component
        }
    };

    // Step 1: Initialize DSU and process edges
    for (let [u, v, w] of edges) {
        if (minPathCost[u] === Infinity) minPathCost[u] = w;
        if (minPathCost[v] === Infinity) minPathCost[v] = w;
        union(u, v, w);
    }

    // Step 2: Answer queries in O(1)
    return query.map(([start, end]) => {
        if (start === end) return 0;
        if (findRoot(start) !== findRoot(end)) return -1;
        return minPathCost[findRoot(start)];
    });
};