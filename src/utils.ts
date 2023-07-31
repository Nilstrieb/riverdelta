export function encodeUtf8(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

export class Ids {
  nextId: number = 0;

  public next(): number {
    return this.nextId++;
  }
}

export function unwrap<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new Error("tried to unwrap undefined value");
  }
  return value;
}

/**
 * A `Map` that can have arbitrarily complex keys.
 * It uses JSON+string equality instead of refernece equality.
 */
export class ComplexMap<K, V> {
  inner: Map<string | number, V> = new Map();

  public get(key: K): V | undefined {
    return this.inner.get(this.mangleKey(key));
  }

  public set(key: K, value: V) {
    this.inner.set(this.mangleKey(key), value);
  }

  private mangleKey(key: K): string | number {
    if (typeof key === "string" || typeof key === "number") {
      return key;
    }
    return JSON.stringify(key);
  }
}
