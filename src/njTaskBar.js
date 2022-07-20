const { HasEvents } = require("./hasEvents");
const { NjTaskBarButtonList } = require("./njTaskBarButtonList");

class NjTaskBar extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-taskbar');
        this.buttonList = new NjTaskBarButtonList(this.element);
        parentElement.appendChild(this.element);
    }

    addWindowButton(njWindow) {
        this.buttonList.addWindowButton(njWindow);
    }

    removeWindowButton(njWindow) {
        this.buttonList.removeWindowButton(njWindowButton);
    }

    destroy() {
        super.destroy();
        this.buttonList.destroy();
        this.element.parentElement.removeChild(this.element);
    }
}

module.exports = {
    NjTaskBar
}