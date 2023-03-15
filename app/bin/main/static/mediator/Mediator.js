export class Mediator {
    static instance;
  
    constructor() {
        if (Mediator.instance) {
            return Mediator.instance;
        }
        Mediator.instance = this;
        this.subscribers = {};
    }
  
    subscribe(eventType, subscriber, handler) {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push({
            subscriber,
            handler
        });
      }
    
    publish(eventType, data) {
        if (!this.subscribers[eventType]) {
            return;
        }
        this.subscribers[eventType].forEach(({ subscriber, handler }) => {
            handler.call(subscriber, data);
        });
    }
  
    static getInstance() {
        if (!Mediator.instance) {
            Mediator.instance = new Mediator();
        }
        return Mediator.instance;
    }
  }
  