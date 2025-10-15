export type Result<T, E = Error>
  = | { ok: true, value: T }
    | { ok: false, error: E }

export const ok = <T>(value: T): Result<T> => ({ ok: true, value })
export function err<E = Error>(error: E): Result<never, E> {
  return {
    ok: false,
    error,
  }
}
