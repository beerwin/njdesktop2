import HasEvents from "../../hasEvents";
import NjWindowFooterPane from "./njWindowFooterPane";

const NjWindowFooter = class extends HasEvents {
    constructor() {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-window-footer');
        this.panes = [];
    }

    setParent(parentNode) {
        parentNode.appendChild(this.element);
    }

    addPane() {
        const pane = new NjWindowFooterPane(this.element);
        this.panes.push(pane);
        return pane;
    }

    removePane(pane) {
        this.panes = this.panes.filter(p => p !== pane);
        pane.destroy();
    }

    getComputedHeight() {
        const computedStyle = window.getComputedStyle(this.element);
        return parseInt(computedStyle.height.replace('px', ''));
    }

    destroy() {
        this.parentNode.removeChild(this.element);
        super.destroy();
    }
}

export default NjWindowFooter;