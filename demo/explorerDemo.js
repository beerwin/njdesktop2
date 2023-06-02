import NjTreeview from "../src/controls/treeview/njTreeview";
import NjListView from "../src/controls/listview/njListView";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";
import DemoFileRepository from "./explorerDemo/demoFileRepository";
import NjIconList, { NjIconlistOrientation, NjIconlistView } from "../src/controls/iconlist/njIconList";
import NjWindowFooter from "../src/controls/windowfooter/njWindowFooter";
import { treeviewConfig, treeviewItems, withIcons } from "./explorerDemo/treeviewRepository";
import { listViewConfig } from "./explorerDemo/listViewRepository";
import interact from "interactjs";
import { dataSvg, lgIcon, mdIcon, smIcon, tileIcon, xlIcon } from "./assets/iconRepository";

const EXPLORER_VIEW_TYPE_LIST = 1;
const EXPLORER_VIEW_TYPE_ICON = 2;

const Explorer = class {
    constructor(desktop) {
        this.desktop = desktop;
        this.repository = new DemoFileRepository();
        this.w = this.desktop.createWindow('Explorer');
        this._createControlScaffolding();
        this._createStatusbar();
        this._createTreeview();
        this.w.on('destroy', this.destroyWindow.bind(this));
        this.path = '';
        this.switchToView(EXPLORER_VIEW_TYPE_LIST);
        this._createToolbar();
        desktop.on('themeChange', this.themeChange.bind(this));
        this.w.on('close', () => {
            desktop.off('themeChange', this.themeChange);
        });
    }

    _createTreeview() {
        this.tw = new NjTreeview(null, treeviewConfig);
        this.tw.setParent(this.treeviewHolder);
        this.tw.fillItems(withIcons(treeviewItems));
        this.tw.on('input', this.twInput.bind(this));
    }

    _createControlScaffolding() {
        this.controlHolder = document.createElement('div');
        this.controlHolder.classList.add('nj-demo-control-holder');
        this.treeviewHolder = document.createElement('div');
        this.treeviewHolder.classList.add('control-holder');
        this.listViewHolder = document.createElement('div');
        this.listViewHolder.classList.add('control-holder')
        this.controlHolder.appendChild(this.treeviewHolder);
        this.controlHolder.appendChild(this.listViewHolder);
        this.w.setContentElement(this.controlHolder);
        this._makeTreeviewHolderResizable();
    }

    _makeTreeviewHolderResizable() {
        interact(this.treeviewHolder).resizable({
            edges: {
                right: true,
            },
            listeners: {
                start: (e) => {
                    this.treeviewHolder.classList.add('resizing');
                },
                move: e => {
                    if (e.rect.width >= 200) {
                        this.treeviewHolder.style.flexBasis = e.rect.width + 'px';
                    }
                },
                end: (e) => {
                    e.target.addEventListener('click', (event) => event.stopImmediatePropagation(), {capture: true, once: true});
                    this.treeviewHolder.classList.remove('resizing');
                    return false;
                }
            },
        });
    }

    _createStatusbar() {
        this.statusBar = new NjWindowFooter();
        this.statusBarPane = this.statusBar.addPane();
        this.statusBarPane.setContentText('No selected items');
        this.statusbarPane2 = this.statusBar.addPane();
        const icon = document.createElement('span');
        icon.classList.add('window-footer-icon');
        this.statusbarPane2.setContent(icon);
        this.statusbarPane2.element.style.minWidth = '30px';
        icon.style.backgroundImage = 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)';        
        this.w.setFooter(this.statusBar);
    }

    _createToolbar() {
        const tb = new ToolBar();
        this.w.addToolbar(tb);
        this.up = tb.addToolButton({
            title: 'Level up',
            type: NJ_TOOLBUTTON_TEXT,
            click: () => {
                const currentFolder = this.tw.findSelected()?.item.fullPath ?? '';
                if (!currentFolder) {
                    return;
                }
                const parentArray = currentFolder.split('/');
                parentArray.pop();
                const parentFolder = parentArray.join('/');
                this.path = parentFolder;
                if (!parentFolder) {
                    this.tw.findSelected().setSelected(false);
                    this.fillItems(this.repository.getByDir(this.path, this.viewType === EXPLORER_VIEW_TYPE_ICON ? 'icon' : 'list'));
                } else {
                    this.tw.selectWith(item => item.item.fullPath === parentFolder);
                }
            }
        });
        this.toolButtonXL = tb.addToolButton({
            title: "Extra large icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(xlIcon(this.desktop.dark)),
            click: () => {
                if (this.viewType !== EXPLORER_VIEW_TYPE_ICON) {
                    this.switchToView(EXPLORER_VIEW_TYPE_ICON, NjIconlistView.XL);
                } else {
                    this.lw.setView(NjIconlistView.XL)
                }
            }
        });

        this.toolButtonL = tb.addToolButton({
            title: "Large icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(lgIcon(this.desktop.dark)),
            click: () => {
                if (this.viewType !== EXPLORER_VIEW_TYPE_ICON) {
                    this.switchToView(EXPLORER_VIEW_TYPE_ICON, NjIconlistView.L);
                } else {
                    this.lw.setView(NjIconlistView.L)
                }
            }
        });

        this.toolButtonM = tb.addToolButton({
            title: "Medium icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(mdIcon(this.desktop.dark)),
            click: () => {
                if (this.viewType !== EXPLORER_VIEW_TYPE_ICON) {
                    this.switchToView(EXPLORER_VIEW_TYPE_ICON, NjIconlistView.M);
                } else {
                    this.lw.setView(NjIconlistView.M)
                }
            }
        });

        this.toolButtonS = tb.addToolButton({
            title: "Small icons",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(smIcon(this.desktop.dark)),
            click: () => {
                if (this.viewType !== EXPLORER_VIEW_TYPE_ICON) {
                    this.switchToView(EXPLORER_VIEW_TYPE_ICON, NjIconlistView.S);
                } else {
                    this.lw.setView(NjIconlistView.S)
                }
            }
        });

        this.toolButtonTile = tb.addToolButton({
            title: "Tile",
            type: NJ_TOOLBUTTON_ICON,
            icon: dataSvg(tileIcon(this.desktop.dark)),
            click: () => {
                if (this.viewType !== EXPLORER_VIEW_TYPE_ICON) {
                    this.switchToView(EXPLORER_VIEW_TYPE_ICON, NjIconlistView.TILE);
                } else {
                    this.lw.setView(NjIconlistView.TILE)
                }
            }
        });

        this.toolButtonList = tb.addToolButton({
            title: "List",
            type: NJ_TOOLBUTTON_TEXT,
            click: () => {
                if (this.viewType !== EXPLORER_VIEW_TYPE_LIST) {
                    this.switchToView(EXPLORER_VIEW_TYPE_LIST);
                } 
            }
        });
    }

    themeChange(sender, {dark}) {
        this.toolButtonXL.setIcon(dataSvg(xlIcon(dark)));
        this.toolButtonL.setIcon(dataSvg(lgIcon(dark)));
        this.toolButtonM.setIcon(dataSvg(mdIcon(dark)));
        this.toolButtonS.setIcon(dataSvg(smIcon(dark)));
        this.toolButtonTile.setIcon(dataSvg(tileIcon(dark)));
    }

    switchToView(viewType, iconSize = NjIconlistView.M) {
        if (this.lw) {
            this.lw.destroy();
        }
        this.viewType = viewType;
        switch (viewType) {
            case EXPLORER_VIEW_TYPE_LIST:
                this.lw = new NjListView(null, listViewConfig);
                break;
            case EXPLORER_VIEW_TYPE_ICON:
                this.lw = new NjIconList(null, {
                    orientation: NjIconlistOrientation.VERTICAL,
                    view: iconSize,
                });
        }
        this.lw.setParent(this.listViewHolder);
        this.lw.on('input', this.lwInput.bind(this));
        this.lw.on('onselect', this.lwOnSelect.bind(this));
        this.fillItems(this.repository.getByDir(this.path, this.viewType === EXPLORER_VIEW_TYPE_ICON ? 'icon' : 'list'))
    }

    fillItems(data) {
        if (this.viewType === EXPLORER_VIEW_TYPE_ICON) {
            this.lw.clear();
            for (let x in data) {
                this.lw.addIcon({
                    icon: this.getIcon(data[x]),
                    title: data[x].name,
                    tileDetailKey: 'type',
                    metadata: {...data[x]}
                })
            }
        } else {
            this.lw.fillItems(data.map(x => {
                const type = x.columns.find(c => c.columnId === 'type').value;
                return {
                    ...x,
                    icon: this.getIcon({type}),
                    iconColumn: 'name',
                }
            }));
        }
    }

    getIcon(file) {
        switch (file.type) {
            default: return 'url(assets/img/file.svg)';
            case 'dir': return 'url(assets/img/folder.svg)';
        }
    }

    destroyView () {
        this.lw.destroy();
    }

    twInput(sender, value) {
        this.path = value.item.item.fullPath;
        this.fillItems(this.repository.getByDir(this.path, this.viewType === EXPLORER_VIEW_TYPE_ICON ? 'icon' : 'list'));
    }

    lwInput(sender, value) {
        const lwItem = value.item;
        let typeValue;
        let fullPath;
        if (this.viewType === EXPLORER_VIEW_TYPE_LIST) {
            const type = lwItem.item.columns.find(c => c.columnId === 'type');
            typeValue = type.value;
            fullPath = lwItem.item.fullPath;
        } else {
            typeValue = lwItem.metadata.type;
            fullPath = lwItem.metadata.fullPath;
        }
        if (typeValue === 'dir') {
            this.tw.selectWith((item) => {
                return item.item.fullPath === fullPath;
            });
        }
    }

    lwOnSelect(sender, values) {
        this.statusBarPane.setContentText(values.length + ' selected.');
        console.log(values);
    }

    destroyWindow() {
        this.tw.destroy();
        this.lw.destroy();
    }

}

const ExplorerDemo = class {
    constructor(desktop) {
        this.desktop = desktop;
        this.icon = desktop.getIconList().addIcon({
            icon: 'url(assets/img/folder.svg)',
            title: 'Files',
            dblclick: () => {
                new Explorer(this.desktop);
            }
        });
    }


}

export default ExplorerDemo;