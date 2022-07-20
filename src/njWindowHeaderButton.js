const { HasEvents } = require("./hasEvents");
const NJWindowHeaderButtonTypes = require("./njWindowHeaderButtonTypes");

const NjWindowHeaderButton = class extends HasEvents {
    constructor(parentNode, buttonType) {
        super();
        this.element = document.createElement('button');
        this.element.classList.add('nj-window-header-button');
        let buttonTypeClassName = '';
        switch (buttonType) {
            case NJWindowHeaderButtonTypes.NJ_MINIMIZE: 
                buttonTypeClassName = 'nj-minimize';
                break;
            case NJWindowHeaderButtonTypes.NJ_MAXIMIZE: 
                buttonTypeClassName = 'nj-maximize';
                break;
            case NJWindowHeaderButtonTypes.NJ_RESTORE: 
                buttonTypeClassName = 'nj-restore';
                break;
            case NJWindowHeaderButtonTypes.NJ_CLOSE: 
                buttonTypeClassName = 'nj-close';
                break;
        }
        if (!!buttonTypeClassName) {
            this.element.classList.add(buttonTypeClassName);
        }
        parentNode.appendChild(this.element);
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    show() {
        this.element.classList.remove('nj-hidden');
    }

    hide() {
        this.element.classList.add('nj-hidden');
    }

    handleClick() {
        super.triggerListeners('click');
    }

    destroy() {
        super.destroy();
        this.element.parentNode.removeChild(this.element);
    }
}

module.exports = {
    NjWindowHeaderButton,
}