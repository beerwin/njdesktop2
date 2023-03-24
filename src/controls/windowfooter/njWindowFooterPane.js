import HasEvents from "../../hasEvents";

const NjWindowFooterPane = class extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('window-footer-pane');
        this.element.addEventListener('click', e => {
            this.triggerListeners('click', {nativeEvent: e});
        });
        parentElement.appendChild(this.element);
    }

    setContentText(text) {
        this.element.innerText = text;
    }

    setContent(element) {
        this.element.parentNode.appendChild(element);
    }

    setContentObject(object) {
        this.contentObject = object;
        this.contentObject.setParent(this.element);
    }

    destroy() {
        if (this.contentObject) {
            this.contentObject.destroy();
        }
        this.element.parentElement.removeChild(this.element);
        super.destroy();
    }
}

export default NjWindowFooterPane;