
export default class BaseError extends Error {
  public constructor(message?: any) {
    super(message);

    Object.defineProperty(this, "name", {
      get: () => (this.constructor as any).name,
    });
  }
}
