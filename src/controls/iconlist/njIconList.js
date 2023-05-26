import HasEvents from "../../hasEvents";
import NjIcon from "./njIcon";

export const NjIconlistOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
}

export const NjIconlistView = {
    XL: 'xl',
    L: 'l',
    M: 'm',
    S: 's',
    TILE: 'tile'
}

const NjIconList = class extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.originPoint = {left: 0, top: 0};
        this.selectionRectangle = this.resetSelectionRectangle();
        this.isMouseDown = false;
        this.selectionRectangleElement = null;
        this.element = document.createElement('div');
        this.element.classList.add('nj-icon-list');
        this.element.classList.add(config?.orientation ?? NjIconlistOrientation.VERTICAL);
        if (config?.preventScroll) {
            this.element.classList.add('nj-prevent-scroll');
        }
        this.setView(config?.view ?? NjIconlistView.M);
        
        this.icons = [];
        if (!!parentElement) {
            parentElement.appendChild(this.element);
        }

        if (config.dragDropSelect ?? true) {
            this.attachEvents();
        }
    }

    attachEvents() {
        this.element.addEventListener("mousedown", this.mouseDown.bind(this));
        this.element.addEventListener("mousemove", this.mouseMove.bind(this));
        this.element.addEventListener("mouseup", this.mouseUp.bind(this));
    }

    mouseDown(e) {
        this.isMouseDown = true;
        const bc = this.element.getBoundingClientRect();
        this.originPoint = {
            left: e.clientX + this.element.scrollLeft - bc.left, 
            top: e.clientY + this.element.scrollTop - bc.top,
        };
        this.selectionRectangle = this.normalizeSelectionRectangle({
            ...this.originPoint,
            right: this.originPoint.left,
            bottom: this.originPoint.top,
        });
    }

    mouseMove(e) {
        if (!this.isMouseDown) {
            return;
        }

        const bc = this.element.getBoundingClientRect();

        const currentPoint = {
            right: e.clientX + this.element.scrollLeft - bc.left,
            bottom: e.clientY + this.element.scrollTop - bc.top,
        }


        this.selectionRectangle = this.normalizeSelectionRectangle({
            left: this.originPoint.left,
            top: this.originPoint.top,
            ...currentPoint,
        });

        if (Math.abs(this.selectionRectangle.right - this.selectionRectangle.left) > 5 
            || Math.abs(this.selectionRectangle.bottom - this.selectionRectangle.top) > 5) {
            this.clearSelection();            
            this.drawSelectionRectangle();
            this.selectIconsByDrag();
        }
    }

    mouseUp() {
        this.isMouseDown = false;
        this.selectIconsByDrag();
        this.hideSelectionRectangle();
    }

    resetSelectionRectangle() {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        };
    }

    selectIconsByDrag() {
        if (!this.selectionRectangleElement) {
            return;
        }
        for (let x in this.icons) {
            const br = this.icons[x].element.getBoundingClientRect();
            const sr = this.selectionRectangleElement.getBoundingClientRect();
            this.icons[x].setSelected(this.doesOverlap(br, sr));
        }
    }

    hideSelectionRectangle() {
        this.selectionRectangle = this.resetSelectionRectangle();
        if (!this.selectionRectangleElement) {
            return;
        }

        this.selectionRectangleElement.parentNode.removeChild(this.selectionRectangleElement);
        this.selectionRectangleElement = null;

        this.originPoint = {left: 0, top:0};
    }

    drawSelectionRectangle() {
        if (!this.selectionRectangleElement) {
            this.selectionRectangleElement = document.createElement('div');
            this.selectionRectangleElement.classList.add('selection-rectangle');
            this.element.appendChild(this.selectionRectangleElement);
        }

        this.selectionRectangleElement.style.left = this.selectionRectangle.left + 'px';
        this.selectionRectangleElement.style.top = this.selectionRectangle.top + 'px';

        this.selectionRectangleElement.style.width = (this.selectionRectangle.right - this.selectionRectangle.left) + 'px';
        this.selectionRectangleElement.style.height = (this.selectionRectangle.bottom - this.selectionRectangle.top) + 'px';
    }

    normalizeSelectionRectangle(r) {
        return {
            left: Math.min(r.left, r.right),
            top: Math.min(r.top, r.bottom),
            right: Math.max(r.left, r.right),
            bottom: Math.max(r.top, r.bottom),
        }
    }

    doesOverlap(r1, r2) {
        if (r1.right < r2.left || r2.right < r1.left) {
            return false;
        }

        if (r1.bottom < r2.top || r2.bottom < r1.top) {
            return false;
        }

        return true;
    }

    addIcon(config) {
        const icon = new NjIcon(this.element, config);
        icon.on('click', (source, data) => {
            if (!data.nativeEvent.ctrlKey && !data.nativeEvent.shiftKey) {
                const s = this.icons.filter(i => i.isSelected());
                if (s.length === 1 && s[0] === source) {
                    return;
                }
                this.clearSelection();
            }

            if (data.nativeEvent.shiftKey) {
                const currentIndex = this.icons.indexOf(source);
                for (let i = Math.min(this.lastSelectionIndex ?? 0, currentIndex); i<= Math.max(this.lastSelectionIndex ?? 0, currentIndex); i++) {
                    this.icons[i].setSelected(true);
                }
            } else {
                data.nativeEvent.ctrlKey ? source.toggleSelection() : source.setSelected(true);
            }
            this.lastSelectionIndex = this.icons.indexOf(source);
            this.triggerListeners('onselect', this.icons.filter(i => i.isSelected()));
        });
        icon.on('dblclick', (source, data) => {
            this.clearSelection();
            source.setSelected(true);
            this.lastSelectionIndex = this.icons.indexOf(source);
            this.triggerListeners('input', {
                ...data,
                item: source,
            });
        })
        this.icons.push(icon);
        return icon;
    }

    removeIcon(icon) {
        this.icons = this.icons.filter(i => i === icon);
        icon.destroy();
    }

    setView(view) {
        this.element.classList.remove('nj-' + this.view);
        this.view = view;
        this.element.classList.add('nj-' + this.view);
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    clearSelection() {
        this.icons.forEach(i => i.setSelected(false));
    }

    clear() {
        this.icons.forEach(i => i.destroy());
        this.icons = [];
    }

    destroy() {
        super.destroy();
        this.icons.forEach(i => i.destroy());
        this.element.parentElement.removeChild(this.element);
    }
}

export default NjIconList;