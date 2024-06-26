export class InstanceFactory<T> {
  constructor(private generatorFn: () => T) {}

  getSingleRecord(override: Partial<T> = {}): T {
    return {
      ...this.generatorFn(),
      ...override,
    };
  }

  getArray(length: number, overrides: Partial<T>[] = []): T[] {
    return Array.from(new Array(length)).map((_, i) =>
      this.getSingleRecord(overrides[i]),
    );
  }
}
