class EventEmitter {
  constructor() {
    // Хранилище для событий и их подписчиков
    this.events = {};
  }

  // Метод для подписки на событие
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return this;
  }

  // Метод для отписки от события
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }

    return this;
  }

  // Метод для оповещения о событии
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(data));
    }

    return this;
  }
}

// Пример использования

const cb = () => null;

// Создаем экземпляр класса EventEmitter
const eventEmitter = new EventEmitter();

eventEmitter.on("test", cb).off("test", cb);
