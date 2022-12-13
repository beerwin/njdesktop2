import HasEvents from "../../hasEvents";

class NjDialogAction extends HasEvents {
    constructor(parentElement, config) {
        super();
        this.element = document.createElement('button');
        this.element.classList.add('nj-dialog-action');
        this.setTitle(config?.title ?? '');
        if (config?.click) {
            this.on('click', config.click)
        }
        this.element.addEventListener('click', (e) => {
            this.triggerListeners('click', {nativeEvent: e});
        });
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
    }

    setTitle(title) {
        this.title = title;
        this.element.innerText = title;
    }

    setParent(parentNode) {
        parentNode.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        this.parentElement.removeChild(this.element);
    }
}

export default NjDialogAction;