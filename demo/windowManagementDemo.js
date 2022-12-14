import NjMenuItem from "../src/njMenuItem";

const WindowManagementDemo = class {
    constructor(desktop) {
        const windowMenuItem = new NjMenuItem({
            title: "Window",
        })
        
        const windowCascadeMenuItem = new NjMenuItem({
            title: "Cascade",
            click: () => {
                desktop.cascade();
            }
        });
        
        windowMenuItem.addItem(windowCascadeMenuItem);
        
        const windowTileMenuItem = new NjMenuItem({
            title: "Tile",
            click: () => {
                desktop.tile();
            }
        });
        
        windowMenuItem.addItem(windowTileMenuItem);
        
        desktop.getMenu().addItem(windowMenuItem);
    }
}

export default WindowManagementDemo;