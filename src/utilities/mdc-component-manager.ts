export interface MdcComponentManager {
  handleAfterCreate(element: Element): void;

  getComponent(element: Element): any;

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
    getComponent: (element: Element) => {
      return (element as any)._mdcComponent;
    },
    handleAfterRemoved: (element: Element) => {
      (element as any)._mdcComponent.destroy();
    }
  };
};
