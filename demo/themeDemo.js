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
                desktop.setTheme('redmond7', false);
            }
        })
        themeMenu.addItem(redmond7MenuItem);

        taskbarSubMenu.addItem(themeMenu);
        const cleanLightMenuItem = new NjMenuItem({
            title: "Clean Light theme",
            click: () => {
                desktop.setTheme('cleanLight', false);
            }
        })
        themeMenu.addItem(cleanLightMenuItem);

        taskbarSubMenu.addItem(themeMenu);
        const cleanDarkMenuItem = new NjMenuItem({
            title: "Clean Dark theme",
            click: () => {
                desktop.setTheme('cleanDark', true);
            }
        })
        themeMenu.addItem(cleanDarkMenuItem);


        const defaultThemeMenuItem = new NjMenuItem({
            title: "Default theme",
            click: () => {
                desktop.setTheme(null, null);
            }
        });

        themeMenu.addItem(defaultThemeMenuItem);

        desktop.addTaskbarSubMenu(taskbarSubMenu);
    }
}

export default ThemeDemo;