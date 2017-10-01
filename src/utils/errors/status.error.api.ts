export default interface IStatusError extends Error {
  readonly status: number;
  readonly description?: string;
}
