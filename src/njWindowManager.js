const { HasEvents } = require("./hasEvents");

const NjWindowManager = class extends HasEvents {
    constructor() {
        super();
        this.windowList = [];
        this.lastPosition = {
            x: 0,
            y: 0,
        };
        this.lastZIndex = 0;
        this.focusedWindow = null;
    }

    add(njWindow) {
        this.windowList.push(njWindow);
        njWindow.on('focus', this.focus.bind(this));
        super.triggerListeners('windowAdded', njWindow);
        njWindow.focus();
    }

    remove(njWindow) {
        this.windowList = this.windowList.filter(w => w !== njWindow).sort((a, b) => a.zIndex > b.zIndex);
        super.triggerListeners('windowRemoved', njWindow);

        if (this.windowList.length === 0) {
            return
        }
        
        this.windowList[this.windowList.length - 1].focus();
    }

    getNextPosition() {
        return {
            x: this.lastPosition.x + 20,
            y: this.lastPosition.y + 20,
        }
    }

    setLastPosition(position) {
        this.lastPosition = {
            x: position.x,
            y: position.y,
        };
    }

    focus(njWindow) {
        if (this.focusedWindow && this.focusedWindow !== njWindow) {
            this.focusedWindow.blur();
        }
        this.focusedWindow = njWindow;
        this.lastZIndex +=1 ;
        this.focusedWindow.setZIndex(this.lastZIndex);
    }

    destroy() {
        super.destroy();
        this.windowList = null;
    }
}

module.exports = {
    NjWindowManager,
}
