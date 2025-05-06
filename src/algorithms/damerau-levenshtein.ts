interface DamerauLevenshteinResult {
    steps: number
    relative: number
    similarity: number
}

function damerauLevenshtein(a: string, b: string, limit?: number): DamerauLevenshteinResult {
    const lenA = a.length,
        lenB = b.length,
        matrix = [];

    // If the limit is not defined it will be calculate from this and that args.
    limit = (limit || ((lenB > lenA ? lenB : lenA))) + 1;

    for (let i = 0; i < limit; i++) {
        matrix[i] = [i];
        matrix[i].length = limit;
    }
    for (let i = 0; i < limit; i++) {
        matrix[0][i] = i;
    }

    if (Math.abs(lenA - lenB) > (limit || 100)) {
        return prepare(limit || 100);
    }
    if (lenA === 0) {
        return prepare(lenB);
    }
    if (lenB === 0) {
        return prepare(lenA);
    }

    // Calculate matrix.
    let j, this_i, that_j, cost, min, t;
    for (let i = 1; i <= lenA; ++i) {
        this_i = a[i - 1];

        // Step 4
        for (j = 1; j <= lenB; ++j) {
            // Check the jagged ld total so far
            if (i === j && matrix[i][j] > 4) return prepare(lenA);

            that_j = b[j - 1];
            cost = (this_i === that_j) ? 0 : 1; // Step 5
            // Calculate the minimum (much faster than Math.min(...)).
            min = matrix[i - 1][j] + 1; // Deletion.
            if ((t = matrix[i][j - 1] + 1) < min) min = t;   // Insertion.
            if ((t = matrix[i - 1][j - 1] + cost) < min) min = t;   // Substitution.

            // Update matrix.
            matrix[i][j] = (i > 1 && j > 1 && this_i === b[j - 2] && a[i - 2] === that_j && (t = matrix[i - 2][j - 2] + cost) < min) ? t : min; // Transposition.
        }
    }

    return prepare(matrix[lenA][lenB]);


    function prepare(steps: number) {
        const length = Math.max(lenA, lenB)
        const relative = length === 0
            ? 0
            : (steps / length);
        const similarity = 1 - relative
         return {
             steps: steps,
             relative: relative,
             similarity: similarity
         }
    }
}
export { damerauLevenshtein }