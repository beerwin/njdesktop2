# NjDesktop 2

NjDesktop 2 is the modern version of the robust Javascript destop framework for modern browsers. It has shed most of its dependencies. The only runtime dependency is Interact.js for moving and resizing the windows. Also the Interact library provides more functionality which can be useful when building apps with NjDesktop.

Features:

- Compatible with all modern versions of major browsers.
  - Internet Explorer and legacy versions of Edge are not officially supported. You may get lucky if it works in them
- CSS driven: all visual behaviors are controlled by css rules. Some aspects (window positioning, z-index) are computed with Javascript, but are applied via styles.
- Event system. Almost all NjDesktop components are inheriting the HasEvents class. This provides a robust and easily extensible event handling system for NjDesktop.
- Fully integrated theme support. NjDesktop themes are now an integral part of the system and are completely driven by CSS classes. Just invent a new theme name and apply it to the main unit (the theme name must be a valid CSS class name). Build a new CSS file based on this new class name (take redmond7.scss as an example).
- Menu support over the desktop, in the taskbar, inside windows and inside toolbars
- Toolbar support in taskbar and windows (windows can have multiple toolbars)
- Icon list with multiple icon sizes and views, multiselect, available on desktop and inside windows
- List view with sorting and multi-select available inside windows
- Robust tiling support
- Cascade
- Object-oriented design
- Plain Javascript implementation, with the exception of dragging and resizing (Interact.js)

## Differences from NjDesktop 1 features

> Important note: This version is not compatible with NjDesktop 1

- Desktop icons are not draggable
- Simpler API
- Generic icon list, that can be appended to windows and desktop
- Generic menus (available for dekstop, toolbars, taskbar and windows), but they can also added anywhere 
- Generic toolbars (available for taskbar and windows)
- Better dialogs
- Window footers
- Generic listview with multiselect, sorting and custom item column rendering
- No desktop widgets