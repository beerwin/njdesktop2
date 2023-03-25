export const listViewConfig = {
    headers: {
        sortedBy: 'name',
        sortDirection: 'asc',
        columns: [
            {
                columnId: 'name',
                value: 'Name'
            },
            {
                columnId: 'type',
                value: 'Type (custom comparer)',
                customSortCompare: (a, b) => {
                    const valueA = parseInt(a);
                    const valueB = parseInt(b);

                    if (valueA === valueB) {
                        return 0;
                    }

                    return valueA > valueB ? 1 : -1;
                }
            },
            {
                columnId: 'size',
                value: 'Size'
            },
            {
                columnId: 'date',
                value: 'Date'
            },
        ]
    }
};
