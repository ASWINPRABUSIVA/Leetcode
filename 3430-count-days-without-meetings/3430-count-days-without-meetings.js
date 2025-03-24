const countDays = (days, meetings, d = 0) => {
    let last = meetings.sort(([x], [y]) => x - y).reduce(([i, j], [$, I]) => 
        j >= $ ? [i, Math.max(j, I)] : (d += j - i + 1, [$, I]), [0, -1]);
    return days - d - last[1] + last[0] - 1;
};