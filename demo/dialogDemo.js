import NjDialogAction from "../src/controls/dialogaction/njDialogAction";

const DialogDemo = class {
    constructor(desktop) {
        desktop.getIconList().addIcon({
            icon: 'url(https://njdesktop.nagyervin.eu/images/bws_logo2k9.png)',
            title: 'Dialog',
            dblclick: () => {
                const dialog = desktop.createDialog({
                    title: 'Dialog',
                    width: 500,
                    height: 200,
                });
                const element = document.querySelector('#dialogContent').cloneNode(true);
                dialog.setContentElement(element);
                element.style.display = 'initial';
                dialog.getFooter().addAction(new NjDialogAction(null, {
                    title: "Ok",
                    click: () => {
                        alert("OK clicked");
                        dialog.close();
                    }
                }))
                dialog.getFooter().addAction(new NjDialogAction(null, {
                    title: "Cancel",
                    click: () => {
                        dialog.close();
                    }
                }))
            }
        });
    }
}

export default DialogDemo;