/**
 * NjDesktop 2
 * 
 * Copyright (c) Nagy Ervin
 * 
 * License: MIT
 */

import {
    NjDesktop,
} from "../index";
import DialogDemo from "./dialogDemo";
import ExplorerDemo from "./explorerDemo";
import HTMLWindowContent from "./htmlWindowContentDemo";
import IconListDemo from "./iconListDemo";
import ListViewDemo from "./listViewDemo";
import TaskbarToolbarDemo from "./taskbarToolbarDemo";
import ThemeDemo from "./themeDemo";
import TopMenuDemo from "./topMenuDemo";
import TreeViewDemo from "./treeViewDemo";
import WidgetCalendarControlDemo from "./widgetCalendarControlDemo";
import WindowEventsDemo from "./windowEventsDemo";
import WindowManagementDemo from "./windowManagementDemo";
import WindowMenuToolbarDemo from "./windowMenuToolbarDemo";
import BrowserDemo from "./browserDemo";
import Documentation from "./documentation";

const desktop = new NjDesktop(document.querySelector('#desktop'), {
    theme: 'redmond7',
    backgroundImage: 'url("https://njdesktop.nagyervin.eu/images/colorful-hq-background-1920x1200.jpg")',
});

new WindowMenuToolbarDemo(desktop);
new HTMLWindowContent(desktop);
new WindowEventsDemo(desktop);
new DialogDemo(desktop);
new IconListDemo(desktop);
new ListViewDemo(desktop);
new TreeViewDemo(desktop);

new TaskbarToolbarDemo(desktop);
new ThemeDemo(desktop);

new TopMenuDemo(desktop);
new WindowManagementDemo(desktop);

new WidgetCalendarControlDemo(desktop);

new ExplorerDemo(desktop);

new BrowserDemo(desktop);

new Documentation(desktop);