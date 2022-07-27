const { HasEvents } = require("./hasEvents");

class NjIcon extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-icon');
        this.iconElement = document.createElement('span');
        this.iconElement.classList.add('nj-icon-picture');
        this.element.appendChild(this.iconElement);
        this.textElement = document.createElement('span');
        this.textElement.classList.add('nj-icon-text');
        this.element.append(this.textElement);
        this.setTitle(config.title);
        this.setIcon(config.icon);
        this.setSelected(false);
        if (config.dblclick) {
            this.on('dblclick', config.dblclick);
        }
        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', {nativeEvent: e});
        })
        this.element.addEventListener('dblclick', (e) => {
            this.triggerListeners('dblclick', {nativeEvent: e});
        });
        parentElement.appendChild(this.element);
    }

    setTitle(title) {
        this.title = title;
        this.textElement.innerText = this.title;
    }

    setIcon(icon) {
        this.icon = icon;
        this.iconElement.style.backgroundImage = icon;
    }

    setParent(parentElement) {
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
        return 
    }

    destroy() {
        super.destroy();
        this.element.parentElement.removeChild(this.element);
    }
}

module.exports = {
    NjIcon,
}