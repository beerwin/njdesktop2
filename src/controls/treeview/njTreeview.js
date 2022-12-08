import HasEvents from "../../hasEvents";
import NjListViewHeader from "../../njListViewHeader";
import njListViewItem from "../../njListviewItem";
import NjTreeViewItem from "./njTreeViewItem";

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

        this.renderBranch(this.items, 0, null);

        if (parentElement) {
            this.setParent(parentElement);
        }
    }

    findSelected(parent) {
        const items = parent?.children ?? this.items;
        for (let x in items) {
            if (items[x].isSelected()) {
                return items[x];
            }
            const result = this.findSelected(items[x]);
            if (result) {
                return result;
            }
        }
    }

    renderBranch(items, level, parent) {
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
            let shouldHide = true;
            if (!parent || parent.isExpanded()) {
                shouldHide = false;
            }
            const copy = {
                ...items[x],
            }
            delete copy['items'];
            const item = new NjTreeViewItem(this.bodyElement, {
                ...copy, 
                classes, 
                parent, 
                level,
                expanded: items[x].expanded ?? false, 
                hidden: shouldHide
            });
            item.on('click', this.itemClick.bind(this));
            if (items[x].items.length > 0) {
                this.renderBranch(items[x].items, level + 1, item);
            }
            if (parent) {
                parent.addChild(item, false);
            } else {
                this.items.push(item);
            }
        }
    }

    itemClick(source, data) {
        const selectedItem = this.findSelected();
        if (selectedItem) {
            selectedItem.setSelected(false);
        }
        source.setSelected(true);
        this.triggerListeners('input', {
            source: this,
            item: source,
        });
    }

    addItem(parentItem, data) {
        let level = 0;
        if (parentItem) {
            level = parentItem.item.level + 1;
        }
        const item = new NjTreeViewItem(this.bodyElement, {
            ...data,
            level,
            parent: parentItem,
            classes: ['level-' + level, 'nj-treeview-item'],
            expanded: data.expanded ?? false,
            hidden: !parentItem || parentItem.isExpanded() ? false : true,
        });
        item.on('click', this.itemClick.bind(this));
        if (!parentItem) {
            this.items = [...this.items, item];
        } else {
            parentItem.addChild(item);
        }

        this.reRenderLevelOf(parentItem);
    }

    removeItem(item) {
        const parentItem = item.parentItem;
        for (let x in this.items) {
            if (this.items[x] === item) {
                this.items[x].destroy();
                this.items = this.items.filter(i => i !== item);
                break;
            } else {
                this.items[x].removeChild(item);
            }
        }
        this.reRenderLevelOf(parentItem);
    }

    reRenderLevelOf(parentItem) {
        let i = 0;
        const list = parentItem?.children ?? this.items;
        for (let x in list) {
            list[x].removeClass('first-item');
            list[x].removeClass('middle-item');
            list[x].removeClass('last-item');
            if (i === 0) {
                list[x].addClass('first-item');
            } 

            if (i === list.length - 1) {
                list[x].addClass('last-item');
            }

            if (i > 0 && i < list.length-1) {
                list[x].addClass('middle-item');
            }

            i++;
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