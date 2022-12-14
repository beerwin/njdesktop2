import HasEvents from "../../hasEvents";

class njListViewItem extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('tr');
        this.element.classList.add('nj-listview-item');
        if (config.classes) {
            this.element.classList.add(...config.classes);
        }
        this.columns = [];
        this.item = {...config};
        this.item.columns.forEach(c => {
            const columnElement = document.createElement('td');
            c.columnElement = columnElement;
            if (this.item.icon && (this.item.iconColumn ?? '') === c.columnId) {
                this.icon = document.createElement('div');
                this.icon.classList.add('list-icon');
                this.icon.style.backgroundImage = this.item.icon;
                this.textContainer = document.createElement('span');
                c.columnElement.appendChild(this.icon);
                c.columnElement.appendChild(this.textContainer);
            }
            this.setColumnText(c, c.value, this.item);
            this.element.appendChild(columnElement);
        });

        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', {nativeEvent: e});
        });
        this.element.addEventListener('dblclick', (e) => {
            this.triggerListeners('dblclick', {nativeEvent: e});
        })
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

    toggleSelection() {
        this.setSelected(!this.isSelected());
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
            this.setColumnText(column, value, this.item);
        }
    }

    setColumnText(column, value, item) {
        if (column.customRender) {
            column.customRender(column, value, item);
        } else {
            if (this.item.icon && column.columnId === ((this.item.iconColumn ?? ''))) {
                this.textContainer.innerText = value;
            } else {
                column.columnElement.innerText = value;
            }
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

export default njListViewItem;