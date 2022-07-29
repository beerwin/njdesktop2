import HasEvents from "./hasEvents";
import { NJ_MINIMIZE, NJ_MAXIMIZE, NJ_RESTORE, NJ_CLOSE } from "./njWindowHeaderButtonTypes";

const NjWindowHeaderButton = class extends HasEvents {
    constructor(parentNode, buttonType) {
        super();
        this.element = document.createElement('button');
        this.element.setAttribute('tabindex', -1);
        this.element.classList.add('nj-window-header-button');
        let buttonTypeClassName = '';
        switch (buttonType) {
            case NJ_MINIMIZE: 
                buttonTypeClassName = 'nj-minimize';
                break;
            case NJ_MAXIMIZE: 
                buttonTypeClassName = 'nj-maximize';
                break;
            case NJ_RESTORE: 
                buttonTypeClassName = 'nj-restore';
                break;
            case NJ_CLOSE: 
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

export default NjWindowHeaderButton;