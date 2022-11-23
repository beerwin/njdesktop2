const eraOf = (year, magnitudeOrder) => {
    const start = Math.floor(year / magnitudeOrder) * magnitudeOrder;
    let end = Math.ceil(year / magnitudeOrder) * magnitudeOrder - 1;
    if (end < start) {
        end = end + magnitudeOrder;
    }
    return {
        start,
        end,
    }
}

export const dayOfWeek = (dayOfWeekNumber, locales, length) => {
    const datePrefix = ('2020-03-');
    const d = new Date(datePrefix + (dayOfWeekNumber));
    return d.toLocaleDateString(locales ?? ['en'], {weekday: length ?? 'short'});
}

export const decadeOf = (year) => {
    return eraOf(year, 10);
}

export const centuryOf = (year) => {
    return eraOf(year, 100);
}

export const millenniaOf = (year) => {
    return eraOf(year, 1000);
}

export const yearList = (year)  => {
    const decade = decadeOf(year);
    const result = [];
    for (let i = decade.start; i <= decade.end; i++) {
        result.push({
            label: i,
            year: i,
            selected: year === i,
        });
    }
    return result;
}

export const decadeList = (year) => {
    const century = centuryOf(year);
    const decade = decadeOf(year);
    const result = [];
    for (let i = 0; i <= 9; i++) {
        const decadeStart = century.start + (i * 10);
        const decadeEnd = decadeStart + 9;
        result.push({
            label: `${decadeStart} - ${decadeEnd}`,
            year: decadeStart,
            selected: decadeStart === decade.start,
        }) 
    }
    return result;
}

export const centuryList = (year) => {
    const millenia = millenniaOf(year);
    const century = centuryOf(year);
    const result = [];
    for (let i = 0; i <= 9; i++) {
        const centuryStart = millenia.start + (i * 100);
        const centuryEnd = centuryStart + 99;
        result.push({
            label: `${centuryStart} - ${centuryEnd}`,
            year: centuryStart,
            selected: centuryStart === century.start,
        }) 
    }
    return result;
}

export const milleniaList = (year, start = 1, end = 2) => {
    const millenia = millenniaOf(year);
    const result = [];
    for (let i = start; i <= end; i++) {
        const milleniaStart = i * 1000;
        const milleniaEnd = milleniaStart + 999;
        result.push({
            label: `${milleniaStart} - ${milleniaEnd}`,
            year: milleniaStart,
            selected: milleniaStart === millenia.start,
        }) 
    }
    return result;
}