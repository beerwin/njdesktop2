import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_INPUT, NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";

const Browser = class {
    constructor() {
        this.iframeElement = document.createElement('iframe');
        this.iframeElement.classList.add('nj-browser-frame');
    }

    navigate(location) {
        this.iframeElement.setAttribute('src', location);
    }

    setParent(parentElement) {
        parentElement.appendChild(this.iframeElement);
    }

    destroy() {
        this.iframeElement.parentElement.removeChild(this.iframeElement);
    }
}


const BrowserDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Browser demo',
            dblclick: () => {
                const homeLocation = 'https://nagyervin.eu';
                const w = desktop.createWindow('Browser demo');
                const browser = new Browser();
                const toolbar = new ToolBar(null, { classes: ['flexing-toolbar']});
                w.addToolbar(toolbar);
                const inputToolbar = toolbar.addToolButton({
                    type: NJ_TOOLBUTTON_INPUT,
                    value: homeLocation,
                    classes: ['location-input'],
                });
                const goButton = toolbar.addToolButton({
                    title: 'Go',
                    type: NJ_TOOLBUTTON_TEXT,
                    click: () => {
                        browser.navigate(inputToolbar.getValue());
                    },
                    classes: ['go-tool-button'],
                })
                w.setContentObject(browser);
                browser.navigate(homeLocation);
            }
        });
    }
}

export default BrowserDemo;