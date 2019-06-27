
export interface Repo<T> {
  exists (t: T): Promise<T>;
  save (t: T): Promise<T>;
}