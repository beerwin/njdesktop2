import NjMenuItem from "../src/njMenuItem";

const TopMenuDemo = class {
    constructor(desktop) {
        const menuItem = new NjMenuItem({
            title: 'A menu'
        });
        
        const menuItem2 = new NjMenuItem({
            title: 'A second menu'
        });
        menuItem.addItem(menuItem2)
        const menuItem3 = new NjMenuItem({
            title: 'A third menu'
        });
        menuItem.addItem(menuItem3)
        const menuItem4 = new NjMenuItem({
            title: 'A fourth menu'
        });
        menuItem2.addItem(menuItem4)
        
        desktop.getMenu().addItem(menuItem);
    }
}

export default TopMenuDemo;