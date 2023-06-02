import NjIconList, { NjIconlistOrientation, NjIconlistView } from "../src/controls/iconlist/njIconList";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON } from "../src/njToolButtonTypes";
import { dataSvg, lgIcon, mdIcon, smIcon, tileIcon, xlIcon } from "./assets/iconRepository";

const IconListApp = class {
    constructor(desktop) {
        const w = desktop.createWindow('Window with icons');
        const toolbar = new ToolBar();
        const iconList = new NjIconList(null, {
            orientation: NjIconlistOrientation.VERTICAL,
            view: NjIconlistView.M,
        });

        this.toolButtonXL = toolbar.addToolButton({
            title: "Extra large icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(xlIcon(desktop.dark)),
            click: () => {
                iconList.setView(NjIconlistView.XL);
            }
        });

        this.toolButtonL = toolbar.addToolButton({
            title: "Large icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(lgIcon(desktop.dark)),
            click: () => {
                iconList.setView(NjIconlistView.L);
            }
        });

        this.toolButtonM = toolbar.addToolButton({
            title: "Medium icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(mdIcon(desktop.dark)),
            click: () => {
                iconList.setView(NjIconlistView.M);
            }
        });

        this.toolButtonS = toolbar.addToolButton({
            title: "Small icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(smIcon(desktop.dark)),
            click: () => {
                iconList.setView(NjIconlistView.S);
            }
        });

        this.toolButtonTile = toolbar.addToolButton({
            title: "Tile",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(tileIcon(desktop.dark)),
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

        desktop.on('themeChange', this.themeChange.bind(this));
        w.on('close', () => {
            desktop.off('themeChange', this.themeChange);
        })
    }

    themeChange(sender, {dark}) {
        this.toolButtonXL.setIcon(dataSvg(xlIcon(dark)));
        this.toolButtonL.setIcon(dataSvg(lgIcon(dark)));
        this.toolButtonM.setIcon(dataSvg(mdIcon(dark)));
        this.toolButtonS.setIcon(dataSvg(smIcon(dark)));
        this.toolButtonTile.setIcon(dataSvg(tileIcon(dark)));
    }

    
}

const IconListDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'window with icons',
            dblclick: () => {
                new IconListApp(desktop);
            }
        });
    }
}

export default IconListDemo;