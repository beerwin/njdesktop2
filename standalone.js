/**
 * NjDesktop 2
 * 
 * Copyright (c) Nagy Ervin
 * 
 * License: MIT
 */

import NjDesktop from './src/njDesktop';
import NjWindow from './src/njWindow';
import ToolBar from './src/njToolBar';
import ToolButton from './src/njToolButton';
import NjMenu from './src/njMenu';
import NjMenuItem from './src/njMenuItem';
import NjIconList, { NjIconlistOrientation, NjIconlistView } from './src/njIconList';
import NjDialogFooter from './src/njDialogFooter';
import NjDialogAction from './src/njDialogAction';
import NjListView from './src/njListView';
import { NJ_CLOSE, NJ_MAXIMIZE, NJ_MINIMIZE, NJ_RESTORE } from './src/njWindowHeaderButtonTypes';
import { WS_MAXIMIZED, WS_NORMAL, WS_MINIMIZED } from './src/njWindowStates';
import { NJ_TOOLBUTTON_ICON, NJ_TOOLBUTTON_TEXT } from './src/njToolButtonTypes';

const cantLoad = function () {
    throw new Error("Cannot load NjDesktop. Variable already used.");
}

!window.NjDesktop || cantLoad();

window.NjDesktop = {
    NjDesktop,
    NjWindow,
    ToolBar,
    ToolButton,
    NjMenu,
    NjMenuItem,
    NjIconList,
    NjDialogFooter,
    NjDialogAction,
    NjListView,
    NJ_CLOSE,
    NJ_MAXIMIZE,
    NJ_MINIMIZE,
    NJ_RESTORE,
    WS_MAXIMIZED,
    WS_NORMAL,
    WS_MINIMIZED,
    NJ_TOOLBUTTON_ICON,
    NJ_TOOLBUTTON_TEXT,
    NjIconlistOrientation,
    NjIconlistView,
};