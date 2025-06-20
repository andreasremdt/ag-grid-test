type EventHandler<E> = (event: E) => void;

export function forwardEvent<E>(
  ...handlers: Array<EventHandler<E> | undefined>
): EventHandler<E> {
  return (event: E) => {
    handlers.forEach((handler) => {
      if (handler) {
        handler(event);
      }
    });
  };
}

export function compare(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
