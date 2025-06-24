const has = Object.prototype.hasOwnProperty;

const deepEqual = (foo: any, bar: any): boolean => {
  if (foo === bar) return true;

  if (foo && bar && foo.constructor === bar.constructor) {
    const { constructor } = foo;

    if (constructor === Date) return isDateEqual(foo, bar);

    if (constructor === RegExp) return isRegExpEqual(foo, bar);

    if (foo.constructor === Array) return isArrayEqual(foo, bar);

    if (!constructor || typeof foo === "object") return isObjectEqual(foo, bar);
  }

  return isSelfEqual(foo, bar);
};

const isSelfEqual = (foo: unknown, bar: unknown): boolean =>
  foo !== foo && bar !== bar;

const isRegExpEqual = (foo: RegExp, bar: RegExp): boolean =>
  foo.toString() === bar.toString();

const isDateEqual = (foo: Date, bar: Date): boolean =>
  foo.getTime() === bar.getTime();

const isArrayEqual = (foo: unknown[], bar: unknown[]): boolean => {
  let { length } = foo;

  if (length === bar.length) {
    while (length-- && deepEqual(foo[length], bar[length]));
  }

  return length === -1;
};

const isObjectEqual = (
  foo: Record<string, unknown>,
  bar: Record<string, unknown>
): boolean => {
  let length = 0;

  for (const key in foo) {
    if (has.call(foo, key) && ++length && !has.call(bar, key)) return false;

    if (!(key in bar) || !deepEqual(foo[key], bar[key])) return false;
  }

  return Object.keys(bar).length === length;
};

export default deepEqual;
