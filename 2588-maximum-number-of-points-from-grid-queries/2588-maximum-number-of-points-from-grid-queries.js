/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
var maxPoints = function(grid, queries) {
    let m = grid.length, n = grid[0].length, k = queries.length;
    
    // Store queries with their original indices
    let queriesSorted = queries.map((val, index) => [val, index]).sort((a, b) => a[0] - b[0]);

    // Min-Heap (Priority Queue)
    let minHeap = new MinHeap();
    minHeap.push([grid[0][0], 0, 0]); // (value, row, col)

    // Visited array
    let visited = Array.from({ length: m }, () => Array(n).fill(false));
    visited[0][0] = true;

    // Answer array
    let answer = new Array(k).fill(0);
    
    // Possible moves: right, left, down, up
    let directions = [[0,1], [0,-1], [1,0], [-1,0]];

    // Counter for valid cells
    let points = 0;

    // Process each query in sorted order
    for (let [query, index] of queriesSorted) {
        // Expand the heap while values are less than the query
        while (!minHeap.isEmpty() && minHeap.peek()[0] < query) {
            let [value, r, c] = minHeap.pop();
            points++;  // Earn a point
            
            // Explore adjacent cells
            for (let [dr, dc] of directions) {
                let nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    minHeap.push([grid[nr][nc], nr, nc]);
                }
            }
        }

        // Store result for this query
        answer[index] = points;
    }

    return answer;
};

// Min-Heap (Priority Queue) Implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    peek() {
        return this.heap.length ? this.heap[0] : null;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;

            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}