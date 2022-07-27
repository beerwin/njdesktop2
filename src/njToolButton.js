const { HasEvents } = require("./hasEvents");
const { NJ_TOOLBUTTON_TEXT } = require("./njToolButtonTypes");

const ToolButton = class extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('button');
        this.element.classList.add('nj-tool-button');
        this.element.classList.add(config.type ?? NJ_TOOLBUTTON_TEXT);
        if (!!config.icon) {
            this.element.style.backgroundImage = config.icon;
        }
        this.element.setAttribute('title', config.title ?? '');
        this.element.innerText = config.title ?? '';

        if (config.click) {
            this.on('click', config.click);
        }
        
        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', {nativeEvent: e});
        });
        
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        this.element.parentElement.removeChild(this.element);
    }
}

module.exports = {
    ToolButton,
}