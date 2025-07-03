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

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge(target?: unknown, ...sources: unknown[]) {
  if (!target) return sources[0];

  if (!sources?.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}
