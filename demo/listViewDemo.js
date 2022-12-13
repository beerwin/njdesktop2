import NjListView from "../src/controls/listview/njListView";

const ListViewDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'window with listView',
            dblclick: () => {
                const w = desktop.createWindow('Window with list view');
                const listView = new NjListView(null, {
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
                })
        
                const start = new Date(2016, 0, 1);
                const end = new Date();
        
                const items = [];
        
                for (let i = 0; i <= 99; i++) {
        
                    items.push({
                        columns: [
                            {
                                columnId: 'name',
                                value: 'List item ' + i,
                            },
                            {
                                columnId: 'type',
                                value: 'Application ' + i,
                            },
                            {
                                columnId: 'size',
                                value: Math.floor((Math.random() * (40000000000000 - 512 + 1))) + 512,
                                customRender: (column, value, item) => {
                                    const levels = ['B', 'kiB', 'MiB', 'GiB', 'TiB'];
                                    let unit = 'B';
                                    let order = value;
                                    let text = order + ' ' + unit
                                    for (let level in levels) {
                                        const v = order / 1024;
                                        if (v > 1) {
                                            order = v;
                                            unit = levels[level];
                                            text = order.toFixed(2) + ' ' + unit;
                                        }
                                    }
        
                                    column.columnElement.innerText = text;
                                }
                            },
                            {
                                columnId: 'date',
                                value: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
                                customRender: (column, value, item) => {
                                    column.columnElement.innerText = value.toLocaleTimeString("en-CA", {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false,
                                    }).replace(',', '');
                                }
                            },
                        ]
                    });
                }
        
                listView.fillItems(items);
        
                w.setContentObject(listView);
            }
        });
    }
}

export default ListViewDemo;