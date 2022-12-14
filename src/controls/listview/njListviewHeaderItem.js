import HasEvents from "../../hasEvents";

class NjListViewHeaderItem extends HasEvents {
    constructor(parentNode, config) {
        super();
        this.element = document.createElement('button');
        this.element.classList.add('nj-header-button');
        parentNode.appendChild(this.element);
        this.textContainer = document.createElement('span');
        this.element.appendChild(this.textContainer);
        this.columnId = config.columnId;
        this.sortDirection = config.sortDirection ?? null;
        this.updateClass();
        this.setText(config.text);
        if (config.sort) {
            this.on('sort', config.sort);
        }
        this.on('click', () => {
            if (config.click) {
                this.config.click(this);
            }
            this.toggleSort();
        });
        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', { nativeEvent: e});
        });
    }

    clearSort() {
        this.setSort(null);
    }

    toggleSort() {
        switch (this.sortDirection) {
            default:
                this.setSort('asc');
                break;
            case 'asc':
                this.setSort('desc');
                break;
        }
    }

    setSort(direction, shouldTrigger = true) {
        this.sortDirection = direction;
        this.updateClass();
        if (shouldTrigger) {
            this.triggerListeners('sort', { 
                direction: this.sortDirection, 
                columnId: this.columnId 
            });
        }
    }

    setText(text) {
        this.text = text;
        this.textContainer.innerText = text;
    }

    updateClass() {
        switch (this.sortDirection) {
            default:
                this.element.classList.remove('sorted');
                this.element.classList.remove('asc');
                this.element.classList.remove('desc');
                return;
            case 'asc':
                this.element.classList.remove('desc');
                break;
            case 'desc':
                this.element.classList.remove('asc');
                break;
        }

        if (this.sortDirection) {
            this.element.classList.add(this.sortDirection);
            this.element.classList.add('sorted');
        }
    }

    destroy() {
        parent.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjListViewHeaderItem;