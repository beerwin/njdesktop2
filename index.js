import NjDesktop from "./src/index";

const desktop = new NjDesktop.NjDesktop(document.querySelector('#desktop'), {
    theme: 'redmond7',
    backgroundImage: 'url("https://njdesktop.nagyervin.eu/images/colorful-hq-background-1920x1200.jpg")',
});

desktop.getIconList().addIcon({
    icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
    title: 'Window with toolbars and menus',
    dblclick: () => {
        const aWindow = desktop.createWindow('Test window name');
        const toolbar = new NjDesktop.ToolBar();
        const toolbarMenu = new NjDesktop.NjMenu();
        const toolbarMenuItem = new NjDesktop.NjMenuItem({
            title: "Menu in toolbar with text", 
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>') + ')'
        });
        toolbarMenu.addItem(toolbarMenuItem);
        const toolbarMenuItem2 = new NjDesktop.NjMenuItem({title: "Menu item 2"})
        toolbarMenuItem.addItem(toolbarMenuItem2);
        const toolbarMenuItem3 = new NjDesktop.NjMenuItem({title: "Menu item 3"})
        toolbarMenuItem.addItem(toolbarMenuItem3);

        const toolbarMenuItem4 = new NjDesktop.NjMenuItem({
            title: "Menu item in toolbar", 
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>') + ')',
            iconOnly: true
        });
        toolbarMenu.addItem(toolbarMenuItem4);
        const toolbarMenuItem5 = new NjDesktop.NjMenuItem({title: "Menu item 2"})
        toolbarMenuItem4.addItem(toolbarMenuItem5);

        toolbar.addMenu(toolbarMenu);
        aWindow.addToolbar(toolbar);
        toolbar.addToolButton({
            title: "Tool button icon only",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M19,3L13,9L15,11L22,4V3M12,12.5A0.5,0.5 0 0,1 11.5,12A0.5,0.5 0 0,1 12,11.5A0.5,0.5 0 0,1 12.5,12A0.5,0.5 0 0,1 12,12.5M6,20A2,2 0 0,1 4,18C4,16.89 4.9,16 6,16A2,2 0 0,1 8,18C8,19.11 7.1,20 6,20M6,8A2,2 0 0,1 4,6C4,4.89 4.9,4 6,4A2,2 0 0,1 8,6C8,7.11 7.1,8 6,8M9.64,7.64C9.87,7.14 10,6.59 10,6A4,4 0 0,0 6,2A4,4 0 0,0 2,6A4,4 0 0,0 6,10C6.59,10 7.14,9.87 7.64,9.64L10,12L7.64,14.36C7.14,14.13 6.59,14 6,14A4,4 0 0,0 2,18A4,4 0 0,0 6,22A4,4 0 0,0 10,18C10,17.41 9.87,16.86 9.64,16.36L12,14L19,21H22V20L9.64,7.64Z" /></svg>') + ')',
        });
        toolbar.addToolButton({
            title: 'A tool button',
            type: NjDesktop.NJ_TOOLBUTTON_TEXT
        });

        const windowMenu = new NjDesktop.NjMenu();
        aWindow.setMenu(windowMenu);
        const fileMenu = new NjDesktop.NjMenuItem({title: 'File'});
        windowMenu.addItem(fileMenu);
        const newMenu = new NjDesktop.NjMenuItem({title: 'New...', icon: ' '});
        fileMenu.addItem(newMenu);
        const openMenu = new NjDesktop.NjMenuItem({
            title: 'Open...', 
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z" /></svg>') + ')'
        });
        fileMenu.addItem(openMenu);
        const openRecent = new NjDesktop.NjMenuItem({title: 'Open recent', icon: ' '});
        fileMenu.addItem(openRecent);
        const recentItem1 = new NjDesktop.NjMenuItem({title: 'Recent item 1'});
        openRecent.addItem(recentItem1);
        const recentItem2 = new NjDesktop.NjMenuItem({title: 'Recent item 2'});
        openRecent.addItem(recentItem2);
        const recentItem3 = new NjDesktop.NjMenuItem({title: 'Recent item 3'});
        openRecent.addItem(recentItem3);
        const closeMenu = new NjDesktop.NjMenuItem({title: 'Close', icon: ' ', click: () => {
            aWindow.close();
        }})   
        fileMenu.addItem(closeMenu);
        
        setTimeout(() => {
            aWindow.setTitle('Title changed after 3 seconds');
        }, 3000);
        
    }
});

desktop.getIconList().addIcon({
    icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
    title: 'Content from HTML element',
    dblclick: () => {
        const w = desktop.createWindow('Window content set from HTML');
        const element = document.querySelector('#typography').cloneNode(true);
        w.setContentElement(element);
        element.style.display = 'initial';
    }
})

desktop.getIconList().addIcon({
    icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
    title: 'Window with events',
    dblclick: () => {
        const w = desktop.createWindow('Window with events');
        const element = document.createElement('div');
        w.setContentElement(element);
        element.style.display = 'initial';
        w.on('titleUpdated', (source, data) => {
            const row = document.createElement('div');
            row.innerText = "Title changed to: " + data;
            element.appendChild(row);
        });
        w.on('resize', (source, data) => {
            const row = document.createElement('div');
            row.innerText = "Resizing: " + JSON.stringify(data);
            element.appendChild(row);
        });
        w.on('resized', (source, data) => {
            const row = document.createElement('div');
            row.innerText = "RESIZED: " + JSON.stringify(data);
            element.appendChild(row);
        });
        w.on('move', (source, data) => {
            const row = document.createElement('div');
            row.innerText = "Moving: " + JSON.stringify(data);
            element.appendChild(row);
        });
        w.on('moved', (source, data) => {
            const row = document.createElement('div');
            row.innerText = "MOVED: " + JSON.stringify(data);
            element.appendChild(row);
        });

        w.on('stateChange', (source, data) => {
            const row = document.createElement('div');
            row.innerText = "Window state changed: " + data;
            element.appendChild(row);
        });

        w.on('minimize', (source) => {
            const row = document.createElement('div');
            row.innerText = "Minimized";
            element.appendChild(row);
        });

        w.on('maximize', (source) => {
            const row = document.createElement('div');
            row.innerText = "Maximized";
            element.appendChild(row);
        });

        w.on('restore', (source) => {
            const row = document.createElement('div');
            row.innerText = "Restored";
            element.appendChild(row);
        });

        w.on('hide', (source) => {
            const row = document.createElement('div');
            row.innerText = "Hidden";
            element.appendChild(row);
        });
        w.on('show', (source) => {
            const row = document.createElement('div');
            row.innerText = "Shown";
            element.appendChild(row);
        });
        w.on('focus', (source) => {
            const row = document.createElement('div');
            row.innerText = "Focused";
            element.appendChild(row);
        });
        w.on('blur', (source) => {
            const row = document.createElement('div');
            row.innerText = "Lost focus";
            element.appendChild(row);
        });

        w.on('beforeClose', () => {
            const row = document.createElement('div');
            row.innerText = "Close query";
            element.appendChild(row);
            return confirm('Would you like to close this window?');
        });
        w.on('close', () => {
            alert('Closed');
        });
    }
})

desktop.getIconList().addIcon({
    icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
    title: 'Dialog',
    dblclick: () => {
        const dialog = desktop.createDialog({
            title: 'Dialog',
            width: 500,
            height: 200,
        });
        const element = document.querySelector('#dialogContent').cloneNode(true);
        dialog.setContentElement(element);
        element.style.display = 'initial';
        dialog.getFooter().addAction(new NjDesktop.NjDialogAction(null, {
            title: "Ok",
            click: () => {
                alert("OK clicked");
                dialog.close();
            }
        }))
        dialog.getFooter().addAction(new NjDesktop.NjDialogAction(null, {
            title: "Cancel",
            click: () => {
                dialog.close();
            }
        }))
    }
});

desktop.getIconList().addIcon({
    icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
    title: 'window with icons',
    dblclick: () => {
        const w = desktop.createWindow('Window with icons');
        const toolbar = new NjDesktop.ToolBar();
        const iconList = new NjDesktop.NjIconList(null, {
            orientation: NjDesktop.NjIconlistOrientation.VERTICAL,
            view: NjDesktop.NjIconlistView.M,
        });

        const toolButtonXL = toolbar.addToolButton({
            title: "Extra large icons",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M6 7H8L9 9.5L10 7H12L10 12L12 17H10L9 14.5L8 17H6L8 12L6 7M13 7H15V15H19V17H13V7Z" /></svg>') + ')',
            click: () => {
                iconList.setView(NjDesktop.NjIconlistView.XL);
            }
        });

        const toolButtonL = toolbar.addToolButton({
            title: "Large icons",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M9 7V17H15V15H11V7H9Z" /></svg>') + ')',
            click: () => {
                iconList.setView(NjDesktop.NjIconlistView.L);
            }
        });

        const toolButtonM = toolbar.addToolButton({
            title: "Medium icons",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M9 7C7.9 7 7 7.9 7 9V17H9V9H11V16H13V9H15V17H17V9C17 7.9 16.11 7 15 7H9Z" /></svg>') + ')',
            click: () => {
                iconList.setView(NjDesktop.NjIconlistView.M);
            }
        });

        const toolButtonS = toolbar.addToolButton({
            title: "Small icons",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M11 7C9.9 7 9 7.9 9 9V11C9 12.11 9.9 13 11 13H13V15H9V17H13C14.11 17 15 16.11 15 15V13C15 11.9 14.11 11 13 11H11V9H15V7H11Z" /></svg>') + ')',
            click: () => {
                iconList.setView(NjDesktop.NjIconlistView.S);
            }
        });

        const toolButtonTile = toolbar.addToolButton({
            title: "Tile",
            type: NjDesktop.NJ_TOOLBUTTON_ICON,
            icon: 'url(data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10" /></svg>') + ')',
            click: () => {
                iconList.setView(NjDesktop.NjIconlistView.TILE);
            }
        });

        w.addToolbar(toolbar);

        const start = new Date(2016,0,1);
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

desktop.getIconList().addIcon({
    icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
    title: 'window with listView',
    dblclick: () => {
        const w = desktop.createWindow('Window with list view');
        const listView = new NjDesktop.NjListView(null, {
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
        })

        const start = new Date(2016,0,1);
        const end = new Date();

        const items = [];

        for (let i = 0; i <= 99; i++) {
            
                items.push({
                    columns: [
                        {
                            columnId: 'name',
                            value: 'List item ' + i,
                        },
                        {
                            columnId: 'type',
                            value: 'Application ' + i,
                        },
                        {
                            columnId: 'size',
                            value: Math.floor((Math.random() * (40000000000000 - 512 + 1))) + 512,
                            customRender: (column, value, item) => {
                                const levels = ['B', 'kiB', 'MiB', 'GiB', 'TiB'];
                                let unit = 'B';
                                let order = value;
                                let text = order + ' ' + unit
                                for (let level in levels) {
                                    const v = order / 1024;
                                    if (v > 1) {
                                        order = v;
                                        unit = levels[level];
                                        text = order.toFixed(2) + ' ' + unit;
                                    } 
                                }

                                column.columnElement.innerText = text;
                            }
                        },
                        {
                            columnId: 'date',
                            value: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
                            customRender: (column, value, item) => {
                                column.columnElement.innerText = value.toLocaleTimeString("en-CA", {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    second: '2-digit',
                                    hour12: false,
                                }).replace(',','');
                            }
                        },
                    ]
                });
        }

        listView.fillItems(items);

        w.setContentObject(listView);
    }
});            

let windowCount = 0;

const toolButton = desktop.addTaskbarToolButton({
    title: "New window",
    type: NjDesktop.NJ_TOOLBUTTON_TEXT
});

toolButton.on('click', () => {
    ++windowCount;
    desktop.createWindow(windowCount + " Test Window name");
})

const taskbarSubMenu = new NjDesktop.NjMenu();
const themeMenu = new NjDesktop.NjMenuItem({title: "Choose theme"});
taskbarSubMenu.addItem(themeMenu);
const redmond7MenuItem = new NjDesktop.NjMenuItem({
    title: "redmond 7 theme",
    click: () => {
        desktop.setTheme('redmond7');
    }
})
themeMenu.addItem(redmond7MenuItem);


const defaultThemeMenuItem = new NjDesktop.NjMenuItem({
    title: "Default theme",
    click: () => {
        desktop.setTheme(null);
    }
});

themeMenu.addItem(defaultThemeMenuItem);

desktop.addTaskbarSubMenu(taskbarSubMenu);


const menuItem = new NjDesktop.NjMenuItem({
    title: 'A menu'
});

const menuItem2 = new NjDesktop.NjMenuItem({
    title: 'A second menu'
});
menuItem.addItem(menuItem2)
const menuItem3 = new NjDesktop.NjMenuItem({
    title: 'A third menu'
});
menuItem.addItem(menuItem3)
const menuItem4 = new NjDesktop.NjMenuItem({
    title: 'A fourth menu'
});
menuItem2.addItem(menuItem4)

desktop.getMenu().addItem(menuItem);

const windowMenuItem = new NjDesktop.NjMenuItem({
    title: "Window",
})

const windowCascadeMenuItem = new NjDesktop.NjMenuItem({
    title: "Cascade",
    click: () => {
        desktop.cascade();
    }
});

windowMenuItem.addItem(windowCascadeMenuItem);

const windowTileMenuItem = new NjDesktop.NjMenuItem({
    title: "Tile",
    click: () => {
        desktop.tile();
    }
});

windowMenuItem.addItem(windowTileMenuItem);

desktop.getMenu().addItem(windowMenuItem);