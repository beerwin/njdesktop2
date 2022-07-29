import HasEvents from "./hasEvents";

class NjDialogFooter extends HasEvents {
    constructor(parentNode) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-dialog-footer');

        this.actionContainer = document.createElement('div');
        this.actionContainer.classList.add('nj-actions');
        this.explanationContainer = document.createElement('div');
        this.explanationContainer.classList.add('nj-explanation');
        this.element.appendChild(this.explanationContainer);
        this.element.appendChild(this.actionContainer);

        this.actions = [];

        if (parentNode) {
            parentNode.appendChild(this.element);
        }
    }

    setParent(parentNode) {
        parentNode.appendChild(this.element);
    }

    addAction(action) {
        this.actions.push(action);
        action.setParent(this.actionContainer);
    }

    getExplanationContainer() {
        return this.explanationContainer;
    }

    getComputedHeight() {
        const computedStyle = window.getComputedStyle(this.element);
        return parseInt(computedStyle.height.replace('px', ''));
    }

    destroy() {
        super.destroy();
        this.actions.forEach(a => a.destroy());
        this.element.parentElement.removeChild(this.element);
    }
}

export default NjDialogFooter;