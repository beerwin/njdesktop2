import HasEvents from "../../hasEvents";
import NjListViewHeader from "../../njListViewHeader";
import njListViewItem from "../../njListviewItem";

const NjTreeview = class extends HasEvents {
    constructor(parentElement, config) {
        super();

        this.element = document.createElement('table');
        this.element.classList.add('nj-treeview');
        this.element.classList.add('nj-listview');
        if (config.headers) {
            this.header = new NjListViewHeader(this.element, config.headers ?? {});
        }
        this.bodyElement = document.createElement('tbody');
        this.element.appendChild(this.bodyElement);

        this.items = [];
        this.fillItems(config.items);

        this.renderBranch(this.items, 0);

        if (parentElement) {
            this.setParent(parentElement);
        }
    }

    renderBranch(items, level) {
        for (let x in items) {
            let itemClass = 'middle-item';
            switch (parseInt(x)) {
                case 0: 
                    itemClass = 'first-item';
                    break;
                case items.length - 1:
                    itemClass = 'last-item';
                    break;

            }
            const classes = ['level-' + level, 'nj-treeview-item', itemClass];
            if (items[x].items.length > 0) {
                classes.push('expanded');
            }
            const item = new njListViewItem(this.bodyElement, {...items[x], classes});
            this.items.push(item);
            this.renderBranch(items[x].items, level + 1);
        }
    }

    fillItems(items) {
        this.clear();
        if (!items) {
            return;
        }

        this.renderBranch(items, 0);
    }

    clear() {
        for (let x in this.items) {
            this.items[x].destroy();
        }
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        this.clear();
        if (this.header) {
            this.header.destroy();
        }
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjTreeview;