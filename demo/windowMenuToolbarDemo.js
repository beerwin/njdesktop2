import NjMenu from "../src/njMenu";
import NjMenuItem from "../src/njMenuItem";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";
import { cutIcon, dataSvg, openIcon, saveIcon } from "./assets/iconRepository";

const ToolbarApp = class {
    constructor(desktop) {
        const aWindow = desktop.createWindow('Test window name');
        const toolbar = new ToolBar();
        const toolbarMenu = new NjMenu();
        this.toolbarMenuItem = new NjMenuItem({
            title: "Menu in toolbar with text",
            icon: dataSvg(openIcon(desktop.dark))
        });
        toolbarMenu.addItem(this.toolbarMenuItem);
        const toolbarMenuItem2 = new NjMenuItem({ title: "Menu item 2" })
        this.toolbarMenuItem.addItem(toolbarMenuItem2);
        const toolbarMenuItem3 = new NjMenuItem({ title: "Menu item 3" })
        this.toolbarMenuItem.addItem(toolbarMenuItem3);

        this.toolbarMenuItem4 = new NjMenuItem({
            title: "Menu item in toolbar",
            icon: dataSvg(saveIcon(desktop.dark)),
            iconOnly: true
        });
        toolbarMenu.addItem(this.toolbarMenuItem4);
        const toolbarMenuItem5 = new NjMenuItem({ title: "Menu item 2" })
        this.toolbarMenuItem4.addItem(toolbarMenuItem5);

        toolbar.addMenu(toolbarMenu);
        aWindow.addToolbar(toolbar);
        this.cutToolButton = toolbar.addToolButton({
            title: "Tool button icon only",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(cutIcon(desktop.dark)),
        });
        toolbar.addToolButton({
            title: 'A tool button',
            type: NJ_TOOLBUTTON_TEXT
        });

        const windowMenu = new NjMenu();
        aWindow.setMenu(windowMenu);
        const fileMenu = new NjMenuItem({ title: 'File' });
        windowMenu.addItem(fileMenu);
        const newMenu = new NjMenuItem({ title: 'New...', icon: ' ' });
        fileMenu.addItem(newMenu);
        this.openMenu = new NjMenuItem({
            title: 'Open...',
            icon: dataSvg(openIcon(desktop.dark))
        });
        fileMenu.addItem(this.openMenu);
        const openRecent = new NjMenuItem({ title: 'Open recent', icon: ' ' });
        fileMenu.addItem(openRecent);
        const recentItem1 = new NjMenuItem({ title: 'Recent item 1' });
        openRecent.addItem(recentItem1);
        const recentItem2 = new NjMenuItem({ title: 'Recent item 2' });
        openRecent.addItem(recentItem2);
        const recentItem3 = new NjMenuItem({ title: 'Recent item 3' });
        openRecent.addItem(recentItem3);
        const closeMenu = new NjMenuItem({
            title: 'Close', icon: ' ', click: () => {
                aWindow.close();
            }
        })
        fileMenu.addItem(closeMenu);

        setTimeout(() => {
            aWindow.setTitle('Title changed after 3 seconds');
        }, 3000);

        desktop.on('themeChange', this.themeChange.bind(this));
        aWindow.on('close', () => {
            desktop.off('themeChange', this.themeChange);
        })
    }

    themeChange(sender, {dark}) {
        this.toolbarMenuItem.setIcon(dataSvg(openIcon(dark)));
        this.toolbarMenuItem4.setIcon(dataSvg(saveIcon(dark)));
        this.cutToolButton.setIcon(dataSvg(cutIcon(dark)));
        this.openMenu.setIcon(dataSvg(openIcon(dark)));
    }
}

const WindowMenuToolbarDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Window with toolbars and menus',
            dblclick: () => {
                new ToolbarApp(desktop);
            }
        });
    }
}

export default WindowMenuToolbarDemo;