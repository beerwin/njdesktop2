const { HasEvents } = require("./hasEvents");
const { NjTaskBarButtonList } = require("./njTaskBarButtonList");
const { ToolBar } = require("./njToolBar");

class NjTaskBar extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-taskbar');
        this.toolbar = new ToolBar(this.element);
        this.buttonList = new NjTaskBarButtonList(this.element);
        parentElement.appendChild(this.element);
    }

    addWindowButton(njWindow) {
        this.buttonList.addWindowButton(njWindow);
    }

    removeWindowButton(njWindow) {
        this.buttonList.removeWindowButton(njWindowButton);
    }

    getToolbar() {
        return this.toolbar;
    }

    destroy() {
        super.destroy();
        this.buttonList.destroy();
        this.toolbar.destroy();
        this.element.parentElement.removeChild(this.element);
    }
}

module.exports = {
    NjTaskBar
}