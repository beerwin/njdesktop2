const { HasEvents } = require("./hasEvents");

class njListViewItem extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('tr');
        this.element.classList.add('nj-listview-item');
        this.columns = [];
        this.item = {...config};
        this.item.columns.forEach(c => {
            const columnElement = document.createElement('td');
            columnElement.innerText = c.value;
            c.columnElement = columnElement;
            this.element.appendChild(columnElement);
        });

        this.on('click', () => {
            this.setSelected(true);
        })

        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', {nativeEvent: e, item: this.item});
        });
        parentElement.appendChild(this.element);
    }

    setSelected(selected) {
        this.selected = selected;
        if (!selected) {
            this.element.classList.remove('nj-selected');
        } else {
            this.element.classList.add('nj-selected');
        }
    }

    isSelected() {
        return this.selected;
    }

    column(columnId) {
        const column = this.item.columns.find(c => c.columnId === columnId);
        return column?.value ?? null;
    }

    setColumn (columnId, value) {
        const column = this.item.columns.find(c => c.columnId === columnId);
        if (column) {
            column.value = value;
            column.columnElement.innerText = value;
        }
    }

    setParent(parentElement) {
        if (parentElement === null && !!this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
            return;
        }
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        if (this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
}

module.exports = {
    njListViewItem,
}