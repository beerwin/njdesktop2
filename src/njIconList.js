const { HasEvents } = require("./hasEvents");
const { NjIcon } = require("./njIcon");

const NjIconlistOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
}

const NjIconlistView = {
    XL: 'xl',
    L: 'l',
    M: 'm',
    S: 's',
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
            if (!data.nativeEvent.controlKey) {
                this.clearSelection();
            }

            source.setSelected(true);
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

module.exports = {
    NjIconList,
    NjIconlistOrientation,
    NjIconlistView,
}