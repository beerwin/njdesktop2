export const dayOfWeek = (dayOfWeekNumber, locales, length) => {
    const datePrefix = ('2020-03-');
    const d = new Date(datePrefix + (dayOfWeekNumber));
    return d.toLocaleDateString(locales ?? ['ro'], {weekday: length ?? 'short'});
}