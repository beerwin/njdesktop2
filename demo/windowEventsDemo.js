const WindowEventsDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Window with events',
            dblclick: () => {
                const w = desktop.createWindow('Window with events');
                const element = document.createElement('div');
                w.setContentElement(element);
                element.style.display = 'initial';
                w.on('titleUpdated', (source, data) => {
                    const row = document.createElement('div');
                    row.innerText = "Title changed to: " + data;
                    element.appendChild(row);
                });
                w.on('resize', (source, data) => {
                    const row = document.createElement('div');
                    row.innerText = "Resizing: " + JSON.stringify(data);
                    element.appendChild(row);
                });
                w.on('resized', (source, data) => {
                    const row = document.createElement('div');
                    row.innerText = "RESIZED: " + JSON.stringify(data);
                    element.appendChild(row);
                });
                w.on('move', (source, data) => {
                    const row = document.createElement('div');
                    row.innerText = "Moving: " + JSON.stringify(data);
                    element.appendChild(row);
                });
                w.on('moved', (source, data) => {
                    const row = document.createElement('div');
                    row.innerText = "MOVED: " + JSON.stringify(data);
                    element.appendChild(row);
                });
        
                w.on('stateChange', (source, data) => {
                    const row = document.createElement('div');
                    row.innerText = "Window state changed: " + data;
                    element.appendChild(row);
                });
        
                w.on('minimize', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Minimized";
                    element.appendChild(row);
                });
        
                w.on('maximize', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Maximized";
                    element.appendChild(row);
                });
        
                w.on('restore', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Restored";
                    element.appendChild(row);
                });
        
                w.on('hide', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Hidden";
                    element.appendChild(row);
                });
                w.on('show', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Shown";
                    element.appendChild(row);
                });
                w.on('focus', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Focused";
                    element.appendChild(row);
                });
                w.on('blur', (source) => {
                    const row = document.createElement('div');
                    row.innerText = "Lost focus";
                    element.appendChild(row);
                });
        
                w.on('beforeClose', () => {
                    const row = document.createElement('div');
                    row.innerText = "Close query";
                    element.appendChild(row);
                    return confirm('Would you like to close this window?');
                });
                w.on('close', () => {
                    alert('Closed');
                });
            }
        })
    }
}

export default WindowEventsDemo;