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
