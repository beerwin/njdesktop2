import HasEvents from "./hasEvents";
import NjIcon from "./njIcon";

export const NjIconlistOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
}

export const NjIconlistView = {
    XL: 'xl',
    L: 'l',
    M: 'm',
    S: 's',
    TILE: 'tile'
}

const NjIconList = class extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-icon-list');
        this.element.classList.add(config?.orientation ?? NjIconlistOrientation.VERTICAL);
        if (config?.preventScroll) {
            this.element.classList.add('nj-prevent-scroll');
        }
        this.setView(config?.view ?? NjIconlistView.M);
        
        this.icons = [];
        if (!!parentElement) {
            parentElement.appendChild(this.element);
        }
    }

    addIcon(config) {
        const icon = new NjIcon(this.element, config);
        icon.on('click', (source, data) => {
            console.log(data.nativeEvent);
            if (!data.nativeEvent.ctrlKey && !data.nativeEvent.shiftKey) {
                this.clearSelection();
            }

            if (data.nativeEvent.shiftKey) {
                const currentIndex = this.icons.indexOf(source);
                for (let i = Math.min(this.lastSelectionIndex ?? 0, currentIndex); i<= Math.max(this.lastSelectionIndex ?? 0, currentIndex); i++) {
                    this.icons[i].setSelected(true);
                }
            } else {
                data.nativeEvent.ctrlKey ? source.toggleSelection() : source.setSelected(true);
            }
            this.lastSelectionIndex = this.icons.indexOf(source);
        });
        this.icons.push(icon);
        return icon;
    }

    removeIcon(icon) {
        this.icons = this.icons.filter(i => i === icon);
        icon.destroy();
    }

    setView(view) {
        this.element.classList.remove('nj-' + this.view);
        this.view = view;
        this.element.classList.add('nj-' + this.view);
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    clearSelection() {
        this.icons.forEach(i => i.setSelected(false));
    }

    destroy() {
        super.destroy();
        this.icons.forEach(i => i.destroy());
    }
}

export default NjIconList;