import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handler from "./customer-created-handlers/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./customer-created-handlers/envia-console-log-2.handler";
import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerCreatedEvent tests", () => {
  describe("EnviaConsoleLog1Handler", () => {
    it("should register EnviaConsoleLog1Handler on eventDispatcher", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);
    });

    it("should unregister EnviaConsoleLog1Handler from eventDispatcher", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);

      eventDispatcher.unregister(
        "CustomerCreatedEvent",
        enviaConsoleLog1Handler
      );

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handlers fromeventDispatcher", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify event to trigger all handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
      const spyEventHandler = jest.spyOn(enviaConsoleLog1Handler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);

      const customerCreatedEvent = new CustomerCreatedEvent({
        name: "John Doe",
      });

      // Quando o notify for executado o enviaConsoleLog1Handler.handle() deve ser chamado
      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe("EnviaConsoleLog2Handler", () => {
    it("should register EnviaConsoleLog2Handler on eventDispatcher", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);
    });

    it("should unregister EnviaConsoleLog2Handler from eventDispatcher", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);

      eventDispatcher.unregister(
        "CustomerCreatedEvent",
        enviaConsoleLog1Handler
      );

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handlers fromeventDispatcher", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify event to trigger all handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog2Handler();
      const spyEventHandler = jest.spyOn(enviaConsoleLog1Handler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(enviaConsoleLog1Handler);

      const customerCreatedEvent = new CustomerCreatedEvent({
        name: "John Doe",
      });

      // Quando o notify for executado o enviaConsoleLog1Handler.handle() deve ser chamado
      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });
});
