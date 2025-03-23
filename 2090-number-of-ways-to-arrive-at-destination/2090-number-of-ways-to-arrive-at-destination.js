/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var countPaths = function(n, roads) {
    const graph = buildGraph(n, roads);

    dijkstra(graph);

    return graph[n - 1].ways;
};

const MOD = 10 ** 9 + 7;

const dijkstra = (graph) => {
    const queue = new MinPriorityQueue(e => e.time);
    queue.enqueue({ time: 0, node: 0 });
    
    while(queue.size() > 0) {
        const { node, time } = queue.dequeue();

        if (graph[node].minimumTime < time) {
            continue;
        }

        for (const key of Object.keys(graph[node].connections)) {
            const neighbor = Number(key);
            const neighborTime = time + graph[node].connections[neighbor];

            if (graph[neighbor].minimumTime < neighborTime) {
                continue;
            }

            if (graph[neighbor].minimumTime === neighborTime) {
                graph[neighbor].ways = (graph[neighbor].ways + (graph[node].ways % MOD)) % MOD;

                continue;
            }

            graph[neighbor].minimumTime = neighborTime;
            graph[neighbor].ways = graph[node].ways;

            queue.enqueue({ time: time + graph[node].connections[neighbor], node: neighbor });
        }
    }
}

const buildGraph = (n, roads) => {
    const graph = {};

    for (let i = 0; i < n; i++) {
        graph[i] = {
            connections: {},
            minimumTime: Number.MAX_SAFE_INTEGER,
            ways: 0,
        }
    }

    graph[0].ways = 1;

    for (const [u, v, time] of roads) {
        graph[u].connections[v] = time;
        graph[v].connections[u] = time;
    }

    return graph;
}