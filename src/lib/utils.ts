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

export function debounce(callback: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: any) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
