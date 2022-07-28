const { HasEvents } = require("./hasEvents");
const { WS_NORMAL } = require("./njWindowStates");

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
        if (parseInt(this.focusedWindow.zIndex()) === parseInt(this.lastZIndex)) {
            return;
        }
        this.lastZIndex +=1 ;
        this.focusedWindow.setZIndex(this.lastZIndex);
    }

    tile(width, height) {
        if (this.windowList.length === 0) {
            return;
        }
        const windowCount = this.windowList.length;
        let colCount = Math.ceil(Math.sqrt(windowCount));
        let rowCount = Math.floor(Math.sqrt(windowCount));
        let hasShortRow = windowCount % colCount > 0;
        let windowHeight = height / rowCount;
        if (windowCount === 3) {
            colCount = 3;
            rowCount = 1;
            hasShortRow = false;
        } else {
            if (hasShortRow) {
                if ( rowCount * windowHeight === height && ((rowCount + 1) * colCount - windowCount <= colCount)) {
                    rowCount += 1;
                }
                windowHeight = height / rowCount;
            }
        }
        windowHeight = height / rowCount;
        let windowWidth = width / colCount;

        let wLeft = 0;
        let wTop = 0;
        let i = 0;
        let row = 0;
        this.windowList.forEach(w => {
            i++;
            const oldRect = {...w.rect}
            if (wLeft > width - windowWidth) {
                wLeft = 0;
                row ++;
                wTop = (row) * windowHeight;
            }
            if (row + 1 === rowCount && hasShortRow) {
                windowWidth = width / Math.ceil(windowCount % colCount);
            }
            w.setWidth(windowWidth);
            w.setHeight(windowHeight);
            w.setLeft(wLeft);
            w.setTop(wTop);
            w.triggerListeners('move', {oldRect, rect: w.rect});
            w.triggerListeners('resize', {oldRect, rect: w.rect});
            wLeft += windowWidth;
        });
    }

    cascade(width, height) {
        if (this.windowList.length === 0) {
            return;
        }        

        this.windowList.sort((a, b) => {
            const aZIndex = parseInt(a.zIndex());
            const bZIndex = parseInt(b.zIndex());
            if (aZIndex === bZIndex) {
                return 0;
            }
            return aZIndex > bZIndex ? 1 : -1;
        });

        this.lastPosition = {x: 0, y: 0};
        this.windowList.forEach(w => {
            if (w.getState() !== WS_NORMAL) {
                w.restore();
            }
            const oldRect = {...w.rect};
            w.setLeft(this.lastPosition.x);
            w.setTop(this.lastPosition.y);
            w.setWidth(500);
            w.setHeight(360);
            this.lastZIndex++;
            w.setZIndex(this.lastZIndex);
            this.lastPosition = this.getNextPosition();
            w.triggerListeners('move', {oldRect, rect: w.rect});
            w.triggerListeners('resize', {oldRect, rect: w.rect});
        })
    }

    destroy() {
        super.destroy();
        this.windowList = null;
    }
}

module.exports = {
    NjWindowManager,
}
