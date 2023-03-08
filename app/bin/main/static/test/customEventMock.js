export class CustomEventMock extends Event{
    constructor(type, eventInit = {}) {
        const { bubbles = false, cancelable = false, detail = null } = eventInit;
        super(type, { bubbles, cancelable });
        this.detail = detail;
    }
  }