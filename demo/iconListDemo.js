import NjIconList, { NjIconlistOrientation, NjIconlistView } from "../src/controls/iconlist/njIconList";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON } from "../src/njToolButtonTypes";

const IconListDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'window with icons',
            dblclick: () => {
                const w = desktop.createWindow('Window with icons');
                const toolbar = new ToolBar();
                const iconList = new NjIconList(null, {
                    orientation: NjIconlistOrientation.VERTICAL,
                    view: NjIconlistView.M,
                });
        
                const toolButtonXL = toolbar.addToolButton({
                    title: "Extra large icons",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6 7H8L9 9.5L10 7H12L10 12L12 17H10L9 14.5L8 17H6L8 12L6 7M13 7H15V15H19V17H13V7Z" /></svg>') + ')',
                    click: () => {
                        iconList.setView(NjIconlistView.XL);
                    }
                });
        
                const toolButtonL = toolbar.addToolButton({
                    title: "Large icons",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M9 7V17H15V15H11V7H9Z" /></svg>') + ')',
                    click: () => {
                        iconList.setView(NjIconlistView.L);
                    }
                });
        
                const toolButtonM = toolbar.addToolButton({
                    title: "Medium icons",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M9 7C7.9 7 7 7.9 7 9V17H9V9H11V16H13V9H15V17H17V9C17 7.9 16.11 7 15 7H9Z" /></svg>') + ')',
                    click: () => {
                        iconList.setView(NjIconlistView.M);
                    }
                });
        
                const toolButtonS = toolbar.addToolButton({
                    title: "Small icons",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M11 7C9.9 7 9 7.9 9 9V11C9 12.11 9.9 13 11 13H13V15H9V17H13C14.11 17 15 16.11 15 15V13C15 11.9 14.11 11 13 11H11V9H15V7H11Z" /></svg>') + ')',
                    click: () => {
                        iconList.setView(NjIconlistView.S);
                    }
                });
        
                const toolButtonTile = toolbar.addToolButton({
                    title: "Tile",
                    type: NJ_TOOLBUTTON_ICON,
                    icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10" /></svg>') + ')',
                    click: () => {
                        iconList.setView(NjIconlistView.TILE);
                    }
                });
        
                w.addToolbar(toolbar);
        
                const start = new Date(2016, 0, 1);
                const end = new Date();
        
                for (let i = 0; i <= 99; i++) {
        
                    iconList.addIcon({
                        icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
                        title: 'Some icon ' + (i + 1),
                        tileDetailKey: 'fileType',
                        metadata: {
                            fileType: 'Application',
                            size: Math.round(Math.random() * 1000000),
                            date: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
                        }
                    });
                }
        
                w.setContentObject(iconList);
            }
        });
    }
}

export default IconListDemo;