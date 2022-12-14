import NjMenu from "../src/njMenu";
import NjMenuItem from "../src/njMenuItem";

const ThemeDemo = class {
    constructor(desktop) {
        const taskbarSubMenu = new NjMenu();
        const themeMenu = new NjMenuItem({ title: "Choose theme" });
        taskbarSubMenu.addItem(themeMenu);
        const redmond7MenuItem = new NjMenuItem({
            title: "redmond 7 theme",
            click: () => {
                desktop.setTheme('redmond7');
            }
        })
        themeMenu.addItem(redmond7MenuItem);


        const defaultThemeMenuItem = new NjMenuItem({
            title: "Default theme",
            click: () => {
                desktop.setTheme(null);
            }
        });

        themeMenu.addItem(defaultThemeMenuItem);

        desktop.addTaskbarSubMenu(taskbarSubMenu);
    }
}

export default ThemeDemo;