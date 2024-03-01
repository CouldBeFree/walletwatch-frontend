class Proxy {
  constructor() {
    this.instance = null;
  }

  init() {
    const events = {};

    return {
      subscribe(evName, fn) {
        events[evName] = events[evName] || [];
        events[evName].push(fn);
      },
      unsubscribe(evName, fn) {
        if (events[evName]) {
          events[evName] = events[evName].filter(f => f !== fn);
        }
      },
      publish(evName, data) {
        if (events[evName]) {
          events[evName].forEach(f => {
            f(data);
          });
        }
      }
    };
  }

  getInstance() {
    if (!this.instance) {
      this.instance = this.init();
    }
    return this.instance;
  }
}

const proxy= new Proxy();

export default proxy.init();
