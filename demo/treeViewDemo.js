import NjTreeview from "../src/controls/treeview/njTreeview";
import ToolBar from "../src/njToolBar";
import { NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";

const treeItems = [
    {
        columns: [
            {
                columnId: 'name',
                value: 'Lvl1 item 1'
            },
        ],
        expanded: true,
        items: [
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'Lvl2 item 1'
                    },
                ],
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'Lvl2 item 2'
                    },
                ],
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'Lvl2 item 3'
                    },
                ],
                items: [],
            },        
        ],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'Lvl1 item 2'
            },
        ],
        items: [],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'Lvl1 item 3'
            },
        ],
        items: [
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'Lvl2 item 1'
                    },
                ],
                items: [
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'Lvl2 item 1'
                            },
                        ],
                        items: [],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'Lvl3 item 2'
                            },
                        ],
                        items: [
                            {
                                columns: [
                                    {
                                        columnId: 'name',
                                        value: 'Lvl4 item 1'
                                    },
                                ],
                                items: [],
                            },
                            {
                                columns: [
                                    {
                                        columnId: 'name',
                                        value: 'Lvl2 item 2'
                                    },
                                ],
                                items: [],
                            },
                        
                        ],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'Lvl3 item 3'
                            },
                        ],
                        items: [],
                    },
                    {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'Lvl3 item 4'
                            },
                        ],
                        items: [],
                    },
                        
                ],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'Lvl2 item 2'
                    },
                ],
                items: [],
            },
            {
                columns: [
                    {
                        columnId: 'name',
                        value: 'Lvl2 item 3'
                    },
                ],
                items: [],
            },

        ],
    },
    {
        columns: [
            {
                columnId: 'name',
                value: 'Lvl1 item 4'
            },
        ],
        items: [],
    },
]; 

const TreeViewDemo = class  {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'window with treeview',
            dblclick: () => {
                const w = desktop.createWindow('Window with tree view');
                const tw = new NjTreeview(null, {
                    headers: {
                        columns: [
                            {
                                columnId: 'name',
                                value: 'Name',
                            }
                        ]
                    }
                });
        
                
        
                tw.fillItems(treeItems);
                let selectedItem = null;
                tw.on('input', (source, data) => {
                    selectedItem = data.item;
                    w.setTitle(selectedItem.item.columns[0].value);
                })
                const toolbar = new ToolBar();
                w.addToolbar(toolbar);
                toolbar.addToolButton({
                    title: "Add to root",
                    type: NJ_TOOLBUTTON_TEXT,
                    click: () => {
                        tw.addItem(null, {
                            columns: [
                                {
                                    columnId: 'name',
                                    value: 'Added item',
                                }
                            ]
                        })
                    }
                })
                toolbar.addToolButton({
                    title: "Add to selected",
                    type: NJ_TOOLBUTTON_TEXT,
                    click: () => {
                        tw.addItem(selectedItem, {
                            columns: [
                                {
                                    columnId: 'name',
                                    value: 'Added item to selected',
                                }
                            ]
                        })
                    }
                })                
                toolbar.addToolButton({
                    title: "Remove",
                    type: NJ_TOOLBUTTON_TEXT,
                    click: () => {
                        if (selectedItem) {
                            tw.removeItem(selectedItem);
                            selectedItem = null;
                        }
                    }
                })        
                w.setContentObject(tw);
            },
        });
    }
}

export default TreeViewDemo;