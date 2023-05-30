import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(order.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal zero 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      new Order("o1", "c1", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should add item", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    expect(item.quantity).toBe(1);

    item.addItem()
    expect(item.quantity).toBe(2);
  });

  it("should remove item", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    expect(item.quantity).toBe(1);

    item.removeItem()
    expect(item.quantity).toBe(0);
  });

  it("should increase item qte", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);
    const order = new Order("o1", "c1", [item, item2]);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(200);
    expect(item.quantity).toBe(1);
    expect(item2.quantity).toBe(2);

    order.increaseOrderItemQte("i1");
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(300);
    expect(item.quantity).toBe(2);
    expect(item2.quantity).toBe(2);
  });

  it("should decrease item qte", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(200);
    expect(item.quantity).toBe(2);

    order.decreaseOrderItemQte("i1");
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(100);
    expect(item.quantity).toBe(1);
  });

  it('should remove item from order items list if item qte is zero', () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);
    const order = new Order("o1", "c1", [item, item2]);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(200);
    expect(item.quantity).toBe(1);
    expect(item2.quantity).toBe(2);

    order.decreaseOrderItemQte("i1");
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(100);
    expect(item.quantity).toBe(0);
    expect(item2.quantity).toBe(2);
    expect(order.items).toStrictEqual([item2]);
  })

  it('should throw if order items length is zero', () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
      const order = new Order("o1", "c1", [item]);
      order.decreaseOrderItemQte("i1");
    }).toThrowError("Items are required");
  })

  it('should increase item qte if added item is already on the list', () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const order = new Order("o1", "c1", [item]);
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(100);
    expect(item.quantity).toBe(1);

    order.addItem(item);
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(200);
    expect(item.quantity).toBe(2);
  })

  it('should add OrderItem to order', () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);
    const order = new Order("o1", "c1", [item]);
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(100);

    order.addItem(item2);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(200);
    expect(item.quantity).toBe(1);
    expect(item2.quantity).toBe(2);
  })

  it('should throw error if item does not exist in order', () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
      const order = new Order("o1", "c1", [item]);
      order.removeItem("i2");
    }).toThrowError("Item does not exists in order");
  });

  it('should remove item from order', () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);
    const order = new Order("o1", "c1", [item, item2]);
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(200);

    order.removeItem("i1");
    expect(order.items.length).toBe(1);
    expect(order.total()).toBe(100);
    expect(order.items).toStrictEqual([item2]);
  });
});
