const HTMLWindowContent = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Content from HTML element',
            dblclick: () => {
                const w = desktop.createWindow('Window content set from HTML');
                const element = document.querySelector('#typography').cloneNode(true);
                element.classList.add('text-content');
                w.setContentElement(element);
                element.style.display = 'block';
            }
        })
    }
}

export default HTMLWindowContent;