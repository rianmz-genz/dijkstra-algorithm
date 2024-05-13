class DijkstraAlgorithm {
    constructor(graph) {
        this.graph = graph;
    }

    findShortestPath(start, target) {
        const inf = Number.MAX_SAFE_INTEGER;
        let dist = {};
        let prev = {};
        let q = Object.keys(this.graph);
        
        for (let u of q) {
            dist[u] = inf;
            prev[u] = null;
        }
        
        dist[start] = 0;

        const x = v => dist[v];

        while (q.length !== 0) {
            let u = q.reduce((acc, curr) => x(curr) < x(acc) ? curr : acc);
            q = q.filter(node => node !== u);

            for (let [v, w] of this.graph[u]) {
                let alt = dist[u] + w;
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }

        let trav = [];
        let jarak = [];
        let temp = target;
        
        while (temp !== start) {
            if (prev[temp] === null) break;
            trav.push(prev[temp]);
            jarak.push(dist[temp] - dist[prev[temp]]);
            temp = prev[temp];
        }

        trav.reverse();
        trav.push(target);
        jarak.reverse();

        let hasil = "";

        if (trav.length === 1) {
            hasil = `Tidak ada rute dari ${start} ke ${target}`;
        } else {
            for (let i = 0; i < trav.length; i++) {
                if (i === 0) {
                    hasil += trav[i];
                } else {
                    hasil += ` ${jarak[i - 1]}-> ${trav[i]}`;
                }
            }
            hasil += ` = ${dist[target]}`;
        }

        return hasil;
    }
}

const graph = {
    "A": [['B', 20], ['D', 80], ['G', 90]],
    'B': [['F', 60], ['D', 70]],
    'C': [['F', 50], ['H', 20]],
    'D': [['G', 20], ['C', 10]],
    'E': [['B', 50], ['G', 30]],
    'F': [['D', 40], ['C', 30]],
    'G': [['A', 20]],
    'H': []
};

const dijkstraAlgorithm = new DijkstraAlgorithm(graph);
const shortestPath = dijkstraAlgorithm.findShortestPath('A', 'H');
console.log(shortestPath);
