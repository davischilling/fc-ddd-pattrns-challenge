import OrderItem from "./order_item";
export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  increaseOrderItemQte(id: string): void {
    const items = this._items.map((item) => {
      if (item.id === id) {
        item.addItem();
      }
      return item;
    });
    this.updateItems(items);
  }

  decreaseOrderItemQte(id: string): void {
    try {
      const items = this._items.map((item) => {
        if (item.id === id) {
          item.removeItem();
        }
        return item;
      });
      this.updateItems(items);
    } catch (e) {
      const items = this._items.filter((item) => item.id !== id);
      this.updateItems(items);
    }
  }

  addItem(item: OrderItem): void {
    try {
      const itemExists = this._items.find((i) => i.id === item.id);
      if (itemExists) {
        throw new Error("Item already exists in order");
      }
      const items = [...this._items, item]
      this.updateItems(items)
    } catch (e) {
      this.increaseOrderItemQte(item.id);
    }
  }

  removeItem(id: string): void {
    const itemExists = this._items.some((i) => i.id === id);
    if (!itemExists) {
      throw new Error("Item does not exists in order");
    }
    const items = this._items.filter((item) => item.id !== id);
    this.updateItems(items);
  }

  updateItems(items: OrderItem[]): void {
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }
}
