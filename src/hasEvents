const HasEvents = class {
    constructor() {
        this.handlers = {};
    }

    on(event, listener) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }

        const l = this.handlers[event].find(l => l === listener);
        if (!l) {
            this.handlers[event].push(listener);
        }
    }

    off(event, listener) {
        if (!this.handlers[event]) {
            return;
        }

        this.handlers = this.handlers.filter(l => l !== listener);
    }

    async triggerListeners(event, data) {
        const handlers = this.handlers[event] || [];
        if (handlers.length === 0) {
            return [];
        }

        const values = [];

        for (let x in handlers) {
            values.push(await this.handlers[event][x](this, data));
        }
        return values;
    }

    destroy() {
        this.handlers = {};
    }
}

module.exports = {
    HasEvents
}
