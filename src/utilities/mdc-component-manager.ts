export interface MdcComponentManager {
  handleAfterCreate(element: Element): void;

  handleAfterRemoved(element: Element): void;
}

export let createMdcComponentManager = (mdcConstructor: new (element: Element) => any): MdcComponentManager => {
  return {
    handleAfterCreate: (element: Element) => {
      let mdcComponent = new mdcConstructor(element);
      Object.defineProperty(element, '_mdcComponent', {
        value: mdcComponent,
        writable: false,
        enumerable: false,
        configurable: true
      });
    },
    handleAfterRemoved: (element: Element) => {
      (element as any)._mdcComponent.destroy();
    }
  };
};
