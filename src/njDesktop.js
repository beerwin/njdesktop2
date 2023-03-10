import NjIconList, { NjIconlistOrientation, NjIconlistView } from "./controls/iconlist/njIconList";
import NjMenu from "./njMenu";
import NjTaskBar from "./njTaskBar";
import NjWindow from "./njWindow";
import {NJ_CLOSE} from "./njWindowHeaderButtonTypes";
import NjWindowManager from "./njWindowManager";
import { WS_NORMAL } from "./njWindowStates";
import NjDialogFooter from './controls/dialogfooter/njDialogFooter';
import NjNotificationArea from "./njNotificationArea";

const njDefaultWidth = 640;
const njDefaultHeight = 480;

const NjDesktop = class {
    constructor(element, config) {
        this.element = element;
        this.element.classList.add('nj-desktop');
        this.config = {
            backgroundImage: '',
            backgroundPosition: 'center center',
            backgroundSize: 'auto',
            ...config
        }
        this.updateBackground();
        this.setTheme(config?.theme ?? 'redmond7');
        this.topContainer = document.createElement('div');
        this.topContainer.classList.add('nj-desktop-top');
        this.element.appendChild(this.topContainer);
        this.windowContainer = document.createElement('div');
        this.windowContainer.classList.add('nj-desktop-window-container');
        this.element.appendChild(this.windowContainer);
        this.taskBar = new NjTaskBar(this.element);
        this.setMenu(new NjMenu(this.topContainer));
        this.notificationArea = new NjNotificationArea(this.topContainer);
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

    updateBackground() {
        this.element.style.backgroundImage = this.config.backgroundImage;
        this.element.style.backgroundPosition = this.config.backgroundPosition;
        this.element.style.backgroundSize = this.config.backgroundSize;
    }

    setBackgroundImage(url) {
        this.config.backgroundImage = url;
        this.updateBackground();
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
        }, config.title, WS_NORMAL, [NJ_CLOSE]);
        w.addClass('nj-dialog');
        w.setFooter(new NjDialogFooter());
        w.on('close', this.windowClosed.bind(this));
        this.windowManager.add(w);
        return w;
    }

    windowClosed(origin) {
        this.windowManager.remove(origin);
    }

    destroy() {
        this.element.classList.remove('.nj-desktop');
        this.windowManager.destroy();
        this.taskBar.destroy();
        this.notificationArea.destroy();
        this.iconList.destroy();
        this.menu.destroy();
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

    getNotificationArea() {
        return this.notificationArea;
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

export default NjDesktop;