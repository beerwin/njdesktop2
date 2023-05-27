import { marked } from "marked";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON } from "../src/njToolButtonTypes";

const homeUrl = 'https://raw.githubusercontent.com/beerwin/njdesktop2/master/docs/index.md';

const Documentation = class {
    constructor(desktop) {
        this.history = [];
        this.historyIndex = -1;
        this.toolButtonHome = null;
        this.toolButtonBack = null;
        this.toolButtonForward = null;
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Documentation',
            dblclick: async () => {
                const w = desktop.createWindow('Documentation');
                const toolbar = new ToolBar();
        
                this.toolButtonBack = toolbar.addToolButton({
                    title: "Back",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H6.75L12,18.25L11.34,19L4.84,12.5L11.34,6L12,6.75L6.75,12H19V13Z" /></svg>') + ')',
                    click: () => {
                        this.goBack(w);
                    }
                });
        
                this.toolButtonForward = toolbar.addToolButton({
                    title: "Forward",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,12H16.25L11,6.75L11.66,6L18.16,12.5L11.66,19L11,18.25L16.25,13H4V12Z" /></svg>') + ')',
                    click: () => {
                        this.goForward(w);
                    }
                });
        
                this.toolButtonHome = toolbar.addToolButton({
                    title: "Home",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,8.41L11.5,3.91L4.41,11H6V12L6,19H9V13H14V19H17V11H18.59L17,9.41V6H16V8.41M2,12L11.5,2.5L15,6V5H18V9L21,12H18V20H13V14H10V20H5V12H2Z" /></svg>') + ')',
                    click: async () => {
                        await this.openHome(w);
                    }
                });
        
                w.addToolbar(toolbar);

                await this.openHome(w);
            }
        });
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
        console.log(this.history, this.historyIndex, this.history[this.historyIndex]);
        this.toolButtonForward.setEnabled(this.history.length > 0 && this.historyIndex <= this.history.length - 2);
        this.toolButtonBack.setEnabled(this.history.length > 0 && this.historyIndex >= 1);
        this.toolButtonHome.setEnabled(this.history[this.historyIndex] !== homeUrl);
    }
}

export default Documentation;