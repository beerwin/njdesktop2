import HasEvents from "./hasEvents";
import { NJ_TOOLBUTTON_INPUT, NJ_TOOLBUTTON_TEXT } from "./njToolButtonTypes";

const ToolButton = class extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.config = config;
        this._value = config.value ?? '';
        this.enabled = true;
        switch (config.type) {
            default: 
                this.createButton(parentElement);
                break;
            case NJ_TOOLBUTTON_INPUT:
                this.createInput(parentElement);
                break;
        }
        if (this.config.classes) {
            this.element.classList.add(...this.config.classes);
        }
    }

    createButton(parentElement) {
        this.element = document.createElement('button');
        this.element.classList.add('nj-tool-button');
        this.element.classList.add(this.config.type ?? NJ_TOOLBUTTON_TEXT);
        if (!!this.config.icon) {
            this.element.style.backgroundImage = this.config.icon;
        }
        this.element.setAttribute('title', this.config.title ?? '');
        this.element.innerText = this.config.title ?? '';

        if (this.config.click) {
            this.on('click', this.config.click);
        }
        
        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', {nativeEvent: e});
        });
        
        parentElement.appendChild(this.element);
    }

    createInput(parentElement) {
        this.element = document.createElement('input');
        this.element.classList.add('nj-tool-button');
        this.element.classList.add('nj-tool-button-text');
        this.element.classList.add('nj-tool-button-input');
        this.element.setAttribute('type', this.config.inputType ?? 'text');
        this.element.setAttribute('value', this._value);
        parentElement.appendChild(this.element);
        this.element.addEventListener('input', (e) => {
            this.inputChange(e.target.value);
        });
        if (this.config.change) {
            this.on('change', this.config.change);
        }
    }

    setIcon(icon) {
        this.element.style.backgroundImage = icon;
        if (!icon) {
            this.element.classList.add('nj-tool-button-text');
        } else {
            this.element.classList.remove('nj-tool-button-text');
        }
    }

    setEnabled(value) {
        this.enabled = value;
        if (this.enabled) {
            this.element.removeAttribute('disabled');
        } else {
            this.element.setAttribute('disabled', true);
        }
    }

    inputChange(value) {
        this._value = value;
        this.triggerListeners('change', value);
    }

    getValue() {
        return this._value;
    }

    destroy() {
        super.destroy();
        this.element.parentElement.removeChild(this.element);
    }
}

export default ToolButton;