import { marked } from "marked";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON } from "../src/njToolButtonTypes";
import { backIcon, dataSvg, fwdIcon, homeIcon } from "./assets/iconRepository";

const homeUrl = 'https://raw.githubusercontent.com/beerwin/njdesktop2/master/docs/index.md';

const DocumentationApp = class {
    constructor(desktop) {
        this.history = [];
        this.historyIndex = -1;
        this.toolButtonHome = null;
        this.toolButtonBack = null;
        this.toolButtonForward = null;
        const w = desktop.createWindow('Documentation');
        const toolbar = new ToolBar();

        this.toolButtonBack = toolbar.addToolButton({
            title: "Back",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(backIcon(desktop.dark)),
            click: () => {
                this.goBack(w);
            }
        });

        this.toolButtonForward = toolbar.addToolButton({
            title: "Forward",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(fwdIcon(desktop.dark)),
            click: () => {
                this.goForward(w);
            }
        });

        this.toolButtonHome = toolbar.addToolButton({
            title: "Home",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(homeIcon(desktop.dark)),
            click: async () => {
                await this.openHome(w);
            }
        });

        w.addToolbar(toolbar);

        desktop.on('themeChange', this.themeChange.bind(this));
        w.on('close', () => {
            desktop.off('themeChange', this.themeChange);
        });

        this.openHome(w);
    }

    themeChange(sender, {dark}) {
        this.toolButtonBack.setIcon(dataSvg(backIcon(dark)));
        this.toolButtonForward.setIcon(dataSvg(fwdIcon(dark)));
        this.toolButtonHome.setIcon(dataSvg(homeIcon(dark)));
    }

    async openHome(w) {
        await this.openMd(w, homeUrl);
        this.addToHistory(homeUrl);
    }

    async openMd(w, file) {
        const content = await fetch(file);
        const contentContainer = document.createElement('div');
        let contentText = await content.text();
        contentText = contentText.replace(/\.\//gi, 'https://raw.githubusercontent.com/beerwin/njdesktop2/master/docs/');
        contentContainer.innerHTML = marked.parse(contentText);
        contentContainer.classList.add('text-content');
        contentContainer.querySelectorAll('a').forEach(l => {
            l.addEventListener('click', async e => {
                contentContainer.parentNode.removeChild(contentContainer);
                e.preventDefault();
                const fragmentArray = e.currentTarget.href.split('#');
                this.addToHistory(e.currentTarget.href);
                await this.openMd(w, e.currentTarget.href);
                if (fragmentArray.length > 1) {
                    document.querySelector('#' + fragmentArray.pop())?.scrollIntoView();
                }
                return false;
            });
        })
        w.setContentElement(contentContainer);
    }

    addToHistory(file) {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(file);
        this.historyIndex++;
        this.updateToolbar();
    }

    async goBack(w) {
        this.historyIndex--;
        await this.openMd(w, this.history[this.historyIndex]);
        this.updateToolbar();
    }

    async goForward(w) {
        this.historyIndex++;
        await this.openMd(w, this.history[this.historyIndex]);
        this.updateToolbar();
    }

    updateToolbar() {
        this.toolButtonForward.setEnabled(this.history.length > 0 && this.historyIndex <= this.history.length - 2);
        this.toolButtonBack.setEnabled(this.history.length > 0 && this.historyIndex >= 1);
        this.toolButtonHome.setEnabled(this.history[this.historyIndex] !== homeUrl);
    }
}

const Documentation = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(assets/img/file.svg)',
            title: 'Documentation',
            dblclick: async () => {
                new DocumentationApp(desktop);
            }
        });
    }

    
}

export default Documentation;