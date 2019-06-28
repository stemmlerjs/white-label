
export abstract class BaseFakeRepo<T> {
  protected _items: T[];

  constructor () {
    this._items = [];
  }

  public addFakeItem (t: T): void {
    let found = false;
    for (let item of this._items) {
      if (this.compareFakeItems(item, t)) {
        found = true;
      }
    }

    if (!found) {
      this._items.push(t);
    }
  }

  public removeFakeItem (t: T): void {
    this._items = this._items
      .filter((item) => !this.compareFakeItems(item, t));
  }

  abstract compareFakeItems (a: T, b: T): boolean;
}