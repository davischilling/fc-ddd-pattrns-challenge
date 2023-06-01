import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLogHandler from "./customer-address-changed-handlers/envia-console-log.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

describe("CustomerAddressChangedEvent tests", () => {
  it("should register EnviaConsoleLogHandler on eventDispatcher", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      enviaConsoleLogHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(enviaConsoleLogHandler);
  });

  it("should unregister EnviaConsoleLogHandler from eventDispatcher", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      enviaConsoleLogHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(enviaConsoleLogHandler);

    eventDispatcher.unregister(
      "CustomerAddressChangedEvent",
      enviaConsoleLogHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(0);
  });

  it("should unregister all event handlers fromeventDispatcher", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      enviaConsoleLogHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(enviaConsoleLogHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeUndefined();
  });

  it("should notify event to trigger all handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(enviaConsoleLogHandler, "handle");

    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      enviaConsoleLogHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(enviaConsoleLogHandler);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "1",
      name: "Cliente 1",
      address: {
        street: "Rua 1",
        number: 1,
        city: "Cidade 1",
        zip: "00000-000",
      },
    });

    // Quando o notify for executado o enviaConsoleLogHandler.handle() deve ser chamado
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
