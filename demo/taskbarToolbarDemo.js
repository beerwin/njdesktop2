import { NJ_TOOLBUTTON_TEXT } from "../src/njToolButtonTypes";

const TaskbarToolbarDemo = class {
    constructor(desktop) {
        this.windowCount = 0;

        const toolButton = desktop.addTaskbarToolButton({
            title: "New window",
            type: NJ_TOOLBUTTON_TEXT
        });

        toolButton.on('click', () => {
            ++ this.windowCount;
            desktop.createWindow(this.windowCount + " Test Window name");
        })
    }
}

export default TaskbarToolbarDemo;