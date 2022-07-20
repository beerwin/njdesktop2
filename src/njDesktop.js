const { NjTaskBar } = require("./njTaskBar");
const { NjWindow } = require("./njWindow");
const { NjWindowManager } = require("./njWindowManager")

const njDefaultWidth = 400;
const njDefaultHeight = 280;

const NjDesktop = class {
    constructor(element) {
        this.element = element;
        this.element.classList.add('nj-desktop');
        this.windowContainer = document.createElement('div');
        this.windowContainer.classList.add('nj-desktop-window-container');
        this.element.appendChild(this.windowContainer);
        this.taskBar = new NjTaskBar(this.element);
        this.windowManager = new NjWindowManager();
        this.windowManager.on('windowAdded', this.windowAdded.bind(this));
        this.windowManager.on('windowRemoved', this.windowRemoved.bind(this));
    }

    getElement() {
        return this.element;
    }

    getWindowContainer() {
        return this.windowContainer;
    }

    windowAdded(origin, njWindow) {
        this.taskBar.addWindowButton(njWindow);
    }

    windowRemoved(origin, njWindow) {

    }

    addWindow(njWindow) {
        this.windowManager.add(njWindow);
    }

    removeWindow(njWindow) {
        this.windowManager.removeWindow(njWindow);
    }

    createWindow(title, state, availableButtons) {
        const nextPosition = this.windowManager.getNextPosition();
        if (nextPosition.y + njDefaultHeight > this.getWindowContainer().offsetHeight) {
            nextPosition.y = 0;
        }

        if (nextPosition.x + njDefaultWidth > this.getWindowContainer().offsetWidth) {
            nextPosition.x = 0;
            nextPosition.y = 0;
        }
        const w = new NjWindow(this.getWindowContainer(), {...nextPosition, width: njDefaultWidth, height: njDefaultHeight}, title || "New window", state, availableButtons);
        w.on('close', this.windowClosed.bind(this));
        this.windowManager.setLastPosition(nextPosition);
        this.windowManager.add(w);
        return w;
    }

    windowClosed(origin) {
        this.windowManager.remove(origin);
    }

    destroy() {
        this.element.classList.remove('.nj-desktop');
        this.windowManager.destroy();
    }
}

module.exports = {
    NjDesktop,
}