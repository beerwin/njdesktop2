# Events

NjDesktop components are inherited from the `HasEvent` class. This is an event system capable to support multiple event listeners for a given event type.

Event handlers have 2 parameters: `source`, `data`. `source` is the object which emits the event, `data` contains information related to the event.

Events can be attached with the `.on()` method. Detachable with the (`.off()`) method. The event handlers can be programmatically triggered with the `triggerListeners(listenerGroup, data)` method. The `triggerListeners` method is asynchronous.

>Data sent in the `triggerListeners` method must match the structure of the data parameter of the appropriate listener.

All classes which inherit the `HasEvent` class trigger a `destroy` event when destroyed. The `destroy()` method needs to be called to achieve this.

You can implement this event system in your own classes by deriving them from this class.

---
[<-- List views](./listviews.md) |
[Index](./index.md) |