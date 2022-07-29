const { HasEvents } = require("./hasEvents");
const { NjListViewHeaderItem } = require("./njListviewHeaderItem");

const NjListViewHeader = class extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('thead');
        this.row = document.createElement('tr');
        this.row.classList.add('nj-listview-header');
        this.element.appendChild(this.row);
        this.columns = [];
        config.columns.forEach(i => {
            const columnElement = document.createElement('th');
            this.row.appendChild(columnElement);
            const listViewHeaderItem = new NjListViewHeaderItem(columnElement, {
                text: i.value,
                columnId: i.columnId,
                sortDirection: i.columnId === config.sortedBy ? config.sortDirection : null,
                click: i.click ?? null,
                sort: (source, data) => {
                    if (i.sort) {
                        i.sort(listViewHeaderItem, data);
                    }
                    this.columns.forEach(c => {
                        if (c !== source) {
                            c.setSort(null, false);
                        }
                    });
                    this.sorted(data.columnId, data.direction);
                }
            });
            this.columns.push(listViewHeaderItem);
        });

        if (config.sort) {
            this.on('sort', config.sort);
        }

        if (config.sortedBy) {
            this.sortBy(config.sortedBy, config.sortDirection);
        }
        
        parentElement.appendChild(this.element);
        this.preventSortEvents = false;
    }

    sortBy(columnId, direction) {
        this.preventSortEvents = true;
        this.columns.forEach(c => {
            c.setSort(columnId, direction);
        });
        this.preventSortEvents = false;
        this.sorted(columnId, direction);
    }

    sorted(columnId, direction) {
        this.triggerListeners('sort', { columnId, direction });
    }

    destroy() {
        super.destroy();
        this.columns.forEach(c => c.destroy);
        this.element.parentNode.removeChild(this.element);
    }
}

module.exports = {
    NjListViewHeader,
}