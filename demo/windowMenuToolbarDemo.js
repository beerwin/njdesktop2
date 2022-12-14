import NjMenu from "../src/njMenu";
import NjMenuItem from "../src/njMenuItem";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";

const WindowMenuToolbarDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Window with toolbars and menus',
            dblclick: () => {
                const aWindow = desktop.createWindow('Test window name');
                const toolbar = new ToolBar();
                const toolbarMenu = new NjMenu();
                const toolbarMenuItem = new NjMenuItem({
                    title: "Menu in toolbar with text",
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>') + ')'
                });
                toolbarMenu.addItem(toolbarMenuItem);
                const toolbarMenuItem2 = new NjMenuItem({ title: "Menu item 2" })
                toolbarMenuItem.addItem(toolbarMenuItem2);
                const toolbarMenuItem3 = new NjMenuItem({ title: "Menu item 3" })
                toolbarMenuItem.addItem(toolbarMenuItem3);
        
                const toolbarMenuItem4 = new NjMenuItem({
                    title: "Menu item in toolbar",
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>') + ')',
                    iconOnly: true
                });
                toolbarMenu.addItem(toolbarMenuItem4);
                const toolbarMenuItem5 = new NjMenuItem({ title: "Menu item 2" })
                toolbarMenuItem4.addItem(toolbarMenuItem5);
        
                toolbar.addMenu(toolbarMenu);
                aWindow.addToolbar(toolbar);
                toolbar.addToolButton({
                    title: "Tool button icon only",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z" /></svg>') + ')',
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
                const openMenu = new NjMenuItem({
                    title: 'Open...',
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>') + ')'
                });
                fileMenu.addItem(openMenu);
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
        
            }
        });
    }
}

export default WindowMenuToolbarDemo;