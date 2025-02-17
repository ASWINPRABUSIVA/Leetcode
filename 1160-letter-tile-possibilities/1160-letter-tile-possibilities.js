/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function (tiles) {

    const N = tiles.length;
        
    const sequences = new Set(); // to store unique sequences

    const backtrack = function (str, indexes) {

        // Base case: If sequence length reaches N, stop further recursion
        if (str.length == N) {
            return 0;
        }

        let count = 0;

        for (let i = 0; i < N; i++) {
            
            if (indexes.has(i)) { continue; }   // Skip if this index is already used in the current sequence
            
            const char = tiles[i];  
            const sequence = `${str}${char}`;
            
            if (sequences.has(sequence)) { continue; }  // Skip if this sequence was already counted
            
            sequences.add(sequence);

            indexes.add(i);
            count += (backtrack(sequence, indexes) + 1);
            indexes.delete(i);
        }

        return count;
    }

    const indexes = new Set(); // Keeps track of used indices to ensure characters are used uniquely
    return backtrack('', indexes);
};