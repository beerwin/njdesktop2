import HasEvents from "./hasEvents";
import NjListViewHeader from "./njListViewHeader";
import njListViewItem from "./njListviewItem";

class NjListView extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.config = config;
        this.element = document.createElement('table');
        this.element.classList.add('nj-listview');
        this.header = new NjListViewHeader(this.element, config.headers);
        this.header.on('sort', this.sort.bind(this));
        this.bodyElement = document.createElement('tbody');
        this.element.appendChild(this.bodyElement);
        this.items= [];
        this.fillItems(config.items);
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    clear() {
        this.items.forEach(i => i.destroy());
        this.items = [];
    }

    fillItems(items) {
        this.clear();
        if (!items) {
            return;
        }
        items.forEach(i => {
            this.addItem(i);
        });
    }

    addItem(config) {
        const item = new njListViewItem(this.bodyElement, config);
        item.on('click', (source, data) => {
            if (!data.nativeEvent.ctrlKey && !data.nativeEvent.shiftKey) {
                this.clearSelection();
            }
            if (data.nativeEvent.shiftKey) {
                const currentIndex = this.items.indexOf(source);
                for (let i = Math.min(this.lastSelectionIndex ?? 0, currentIndex); i<= Math.max(this.lastSelectionIndex ?? 0, currentIndex); i++) {
                    this.items[i].setSelected(true);
                }
            } else {
                data.nativeEvent.ctrlKey ? source.toggleSelection() : source.setSelected(true);
            }
            this.lastSelectionIndex = this.items.indexOf(source);
        });
        this.items.push(item);
    }

    removeItem (item) {
        item.destroy();
        this.items = this.items.filter(i => i !== item);
    }

    clearSelection() {
        this.items.forEach(i => i.setSelected(false));
    }

    getCustomSortCompare(columnId) {
        const header = this.config?.headers?.columns?.find(c => c.columnId === columnId);
        return header?.customSortCompare ?? null;
    }

    sort(source, data) {
        this.bodyElement.classList.add('nj-hidden');
        const customSortCompare = this.getCustomSortCompare(data.columnId);
        this.items.sort((a, b) => {
            const colA = a.column(data.columnId);
            const colB = b.column(data.columnId);
            if (customSortCompare) {
                if (data.direction === 'asc') {
                    return customSortCompare(colA, colB);
                } else {
                    return customSortCompare(colB, colA);
                }
            }
            if (colA === colB) {
                return 0;
            }

            if (data.direction === 'asc') {
                return colA > colB ? 1 : -1;
            }

            return colB > colA ? 1 : -1;
        });

        this.items.forEach(i => {
            i.setParent(null);
            i.setParent(this.bodyElement);
        });

        this.bodyElement.style.display;

        this.bodyElement.classList.remove('nj-hidden');

        this.triggerListeners('sort', data);
    }

    destroy() {
        super.destroy();
        this.header.destroy();
        this.clear();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjListView;