const { NjIconList, NjIconlistOrientation, NjIconlistView } = require("./njIconList");
const { NjMenu } = require("./njMenu");
const { NjTaskBar } = require("./njTaskBar");
const { NjWindow } = require("./njWindow");
const NJWindowHeaderButtonTypes = require("./njWindowHeaderButtonTypes");
const { NjWindowManager } = require("./njWindowManager");
const NjWindowStates = require("./njWindowStates");

const njDefaultWidth = 400;
const njDefaultHeight = 280;

const NjDesktop = class {
    constructor(element, theme) {
        this.element = element;
        this.element.classList.add('nj-desktop');
        this.setTheme(theme);
        this.topContainer = document.createElement('div');
        this.topContainer.classList.add('nj-desktop-top');
        this.element.appendChild(this.topContainer);
        this.windowContainer = document.createElement('div');
        this.windowContainer.classList.add('nj-desktop-window-container');
        this.element.appendChild(this.windowContainer);
        this.taskBar = new NjTaskBar(this.element);
        this.setMenu(new NjMenu(this.topContainer));
        this.windowManager = new NjWindowManager();
        this.windowManager.on('windowAdded', this.windowAdded.bind(this));
        this.windowManager.on('windowRemoved', this.windowRemoved.bind(this));
        this.iconList = new NjIconList(this.windowContainer, {
            orientation: NjIconlistOrientation.HORIZONTAL,
            preventScroll: true,
            view: NjIconlistView.M,
        });
    }

    setTheme(theme) {
        if (this.theme) {
            this.element.classList.remove(this.theme);
        }
        this.theme = theme;
        if (this.theme) {
            this.element.classList.add(this.theme);
        }
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

    createDialog(config) {
        const style = window.getComputedStyle(this.getWindowContainer());
        const width = parseInt(style.width.replace('px', ''));
        const height = parseInt(style.height.replace('px', ''));
        const w = new NjWindow(this.getWindowContainer(), {
            x: parseInt(width / 2) - parseInt(config.width / 2),
            y: parseInt(height / 2) - parseInt(config.height / 2),
            width: config.width,
            height: config.height
        }, config.title, NjWindowStates.WS_NORMAL, [NJWindowHeaderButtonTypes.NJ_CLOSE]);
        w.addClass('nj-dialog');
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

    addTaskbarToolButton(config) {
        return this.taskBar.getToolbar().addToolButton(config);
    }

    addTaskbarSubMenu(menu) {
        this.taskBar.getToolbar().addMenu(menu);
    }

    setMenu(menu) {
        this.menu = menu;
        menu.setParent(this.topContainer);
    }

    getMenu() {
        return this.menu;
    }

    getIconList() {
        return this.iconList;
    }

    tile() {
        const windowContainer = this.getWindowContainer();
        this.windowManager.tile(windowContainer.offsetWidth, windowContainer.offsetHeight);
    }

    cascade() {
        const windowContainer = this.getWindowContainer();
        this.windowManager.cascade(windowContainer.offsetWidth, windowContainer.offsetHeight);
    }
}

module.exports = {
    NjDesktop,
}