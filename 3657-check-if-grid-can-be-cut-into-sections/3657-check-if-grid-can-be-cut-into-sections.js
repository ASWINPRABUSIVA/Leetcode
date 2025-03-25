const checkValidCuts = (_uselessParam, rectangles) =>
    checkLayer(rectangles.map(r => [r[0], r[2]])) || checkLayer(rectangles.map(r => [r[1], r[3]]));


const checkLayer = (segments, sections = 0) => {
    segments.sort(([l1, r1], [l2, r2]) => l1 - l2 || r2 - r1);
    for (let i = 1, upValue = segments[0][1]; i < segments.length; i++) {
        if (segments[i][0] >= upValue && ++sections === 2) {
            return true;
        }
        upValue = Math.max(segments[i][1], upValue);
    }
    return false;
};