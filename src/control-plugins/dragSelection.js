export default class DragSelection {
    constructor(listControl) {
        this.listControl = listControl;
        this.originPoint = {left: 0, top: 0};
        this.selectionRectangle = this.resetSelectionRectangle();
        this.isMouseDown = false;
        this.selectionRectangleElement = null;
        this.attachEvents();
    }

    getElement() {
        let element = this.listControl.element;
        if (element.nodeName.toLowerCase() === 'table') {
            element = element.parentNode;
        }

        return element;
    }

    attachEvents() {
        const element = this.getElement();
        if (!element) {
            return;
        }
        element.addEventListener("mousedown", this.mouseDown.bind(this));
        element.addEventListener("mousemove", this.mouseMove.bind(this));
        element.addEventListener("mouseup", this.mouseUp.bind(this));
    }

    mouseDown(e) {
        if (e.button > 0) {
            return;
        }
        this.isMouseDown = true;

        const element = this.getElement();

        if (!element) {
            return;
        }

        const bc = element.getBoundingClientRect();
        this.originPoint = {
            left: e.clientX + element.scrollLeft - bc.left, 
            top: e.clientY + element.scrollTop - bc.top,
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

        const element = this.getElement();

        if (!element) {
            return;
        }

        const bc = element.getBoundingClientRect();

        const currentPoint = {
            right: e.clientX + element.scrollLeft - bc.left,
            bottom: e.clientY + element.scrollTop - bc.top,
        }


        this.selectionRectangle = this.normalizeSelectionRectangle({
            left: this.originPoint.left,
            top: this.originPoint.top,
            ...currentPoint,
        });

        if (Math.abs(this.selectionRectangle.right - this.selectionRectangle.left) > 5 
            || Math.abs(this.selectionRectangle.bottom - this.selectionRectangle.top) > 5) {
                this.listControl.clearSelection();            
                this.drawSelectionRectangle();
                this.listControl.selectItemsByDrag(this.selectionRectangleElement.getBoundingClientRect());
        }
    }

    mouseUp() {
        this.isMouseDown = false;
        if (this.selectionRectangleElement) {
            this.listControl.selectItemsByDrag(this.selectionRectangleElement.getBoundingClientRect());
            this.hideSelectionRectangle();
        }
        window.getSelection()?.removeAllRanges();
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
            this.getElement().appendChild(this.selectionRectangleElement);
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

    resetSelectionRectangle() {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        };
    }

    destroy() {
        if (this.selectionRectangleElement) {
            this.selectionRectangleElement.parentNode.removeChild(this.selectionRectangleElement);
        }
    }
}