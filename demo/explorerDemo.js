import NjTreeview from "../src/controls/treeview/njTreeview";
import NjListView from "../src/controls/listview/njListView";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";
import DemoFileRepository from "./demoFileLists";
import NjIconList, { NjIconlistOrientation, NjIconlistView } from "../src/controls/iconlist/njIconList";

const listViewConfig = {
    headers: {
        sortedBy: 'name',
        sortDirection: 'asc',
        columns: [
            {
                columnId: 'name',
                value: 'Name'
            },
            {
                columnId: 'type',
                value: 'Type (custom comparer)',
                customSortCompare: (a, b) => {
                    const valueA = parseInt(a);
                    const valueB = parseInt(b);

                    if (valueA === valueB) {
                        return 0;
                    }

                    return valueA > valueB ? 1 : -1;
                }
            },
            {
                columnId: 'size',
                value: 'Size'
            },
            {
                columnId: 'date',
                value: 'Date'
            },
        ]
    }
};

const treeviewConfig = {
    // treeviews not necessarily need headers
    // headers: {
    //     columns: [
    //         {
    //             columnId: 'name',
    //             value: 'Directory',
    //         }
    //     ]
    // }
}

const treeviewItems = [
    {
        columns: [
            {
                columnId: 'name',
                value: 'files',
            },
        ],
        fullPath: 'files',
        expanded: true,
        items: [
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'downloads'
                    },
                ],
                fullPath: 'files/downloads',
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'music'
                    },
                ],
                fullPath: 'files/music',
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'videos'
                    },
                ],
                fullPath: 'files/videos',
                items: [],
            },
        ],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'recovery'
            },
        ],
        fullPath: 'recovery',
        items: [],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'system'
            },
        ],
        fullPath: 'system',
        items: [
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'drivers',
                    },
                ],
                fullPath: 'system/drivers',
                items: [
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'etc'
                            },
                        ],
                        fullPath: 'system/drivers/etc',
                        items: [],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'cache'
                            },
                        ],
                        fullPath: 'system/drivers/cache',
                        items: [
                            {
                                columns: [
                                    {
                                        columnId: 'name',
                                        value: 'internal'
                                    },
                                ],
                                fullPath: 'system/drivers/cache/internal',
                                items: [],
                            },
                            {
                                columns: [
                                    {
                                        columnId: 'name',
                                        value: 'third-party'
                                    },
                                ],
                                fullPath: 'system/drivers/cache/third-party',
                                items: [],
                            },

                        ],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'network'
                            },
                        ],
                        fullPath: 'system/drivers/network',
                        items: [],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'modules'
                            },
                        ],
                        fullPath: 'system/drivers/modules',
                        items: [],
                    },

                ],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'lib'
                    },
                ],
                fullPath: 'system/lib',
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'objects'
                    },
                ],
                fullPath: 'system/objects',
                items: [],
            },

        ],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'users'
            },
        ],
        fullPath: 'users',
        items: [],
    },
]

const withIcons = (items) => {
    return items.map(i => {
        return {
            ...i,
            icon: 'url(assets/img/folder.svg)',
            iconColumn: 'name',
            items: withIcons(i.items)
        }
    })
}

const EXPLORER_VIEW_TYPE_LIST = 1;
const EXPLORER_VIEW_TYPE_ICON = 2;

const Explorer = class {
    constructor(desktop) {
        this.desktop = desktop;
        this.repository = new DemoFileRepository();
        this.w = this.desktop.createWindow('Explorer');
        this.tw = new NjTreeview(null, treeviewConfig);
        this.controlHolder = document.createElement('div');
        this.controlHolder.classList.add('nj-demo-control-holder');
        this.treeviewHolder = document.createElement('div');
        this.treeviewHolder.classList.add('control-holder');
        this.listViewHolder = document.createElement('div');
        this.listViewHolder.classList.add('control-holder')
        this.controlHolder.appendChild(this.treeviewHolder);
        this.controlHolder.appendChild(this.listViewHolder);
        this.tw.setParent(this.treeviewHolder);
        this.tw.fillItems(withIcons(treeviewItems));
        this.w.setContentElement(this.controlHolder);
        this.tw.on('input', this.twInput.bind(this));
        this.w.on('destroy', this.destroyWindow.bind(this));
        this.path = '';
        this.switchToView(EXPLORER_VIEW_TYPE_LIST);
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
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6 7H8L9 9.5L10 7H12L10 12L12 17H10L9 14.5L8 17H6L8 12L6 7M13 7H15V15H19V17H13V7Z" /></svg>') + ')',
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
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M9 7V17H15V15H11V7H9Z" /></svg>') + ')',
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
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M9 7C7.9 7 7 7.9 7 9V17H9V9H11V16H13V9H15V17H17V9C17 7.9 16.11 7 15 7H9Z" /></svg>') + ')',
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
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M11 7C9.9 7 9 7.9 9 9V11C9 12.11 9.9 13 11 13H13V15H9V17H13C14.11 17 15 16.11 15 15V13C15 11.9 14.11 11 13 11H11V9H15V7H11Z" /></svg>') + ')',
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
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10" /></svg>') + ')',
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
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Files',
            dblclick: () => {
                new Explorer(this.desktop);
            }
        });
    }


}

export default ExplorerDemo;