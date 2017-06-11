export interface MDCEnhancer {
  /**
   * Should be attached to the afterCreate of the root element.
   */
  handleCreate(element: HTMLElement): void;
  /**
   * Should be attached to the afterUpdate of the root element.
   */
  handleUpdate(element: HTMLElement): void;
  /**
   * Returns the component instance. (only after the DOM was rendered)
   */
  getComponent(): any;
}

/**
 * MDC Components need to be initialized after being added to the DOM and they need to be destoyed after being removed.
 *
 * Maquette provides the right callbacks, and when connected propery, this service makes sure the MDC components work.
 */
export interface MDCService {
  /**
   * Should be attached to the afterUpdate of the outermost element
   */
  afterAppUpdate(): void;

  /**
   * Each maquette component that represents an MDC component should create one enhancer to add to its root VNode
   * @param mdcConstructor For example MDCToolbar
   */
  createEnhancer(mdcConstructor: Function): MDCEnhancer;
}

interface EnhancerState {
  destroy(): void;
  initialize(): void;
}

export let createMDCService = (): MDCService => {
  let previousComponents: EnhancerState[] = [];
  let componentsToInitialize: EnhancerState[] = [];
  let componentsToKeep: EnhancerState[] = [];

  return {
    afterAppUpdate: () => {
      // Destroy components that are no longer present in the DOM
      previousComponents.forEach(c => {
        if (componentsToKeep.indexOf(c) === -1) {
          c.destroy();
        }
      });
      // Initialize the new components
      componentsToInitialize.forEach(c => c.initialize());
      // Remember the components that are currently present
      previousComponents = componentsToKeep;
      previousComponents.push(...componentsToInitialize);
      componentsToKeep = [];
      componentsToInitialize = [];
    },
    createEnhancer: (mdcConstructor: new (element: HTMLElement) => any): MDCEnhancer => {
      let mdcComponent: any | undefined;
      let state: EnhancerState | undefined;
      return {
        handleCreate: (element: HTMLElement) => {
          state = {
            initialize: () => {
              // Element was added to the DOM
              mdcComponent = new mdcConstructor(element);
            },
            destroy: () => {
              // Element was removed from the DOM
              mdcComponent.destroy();
              mdcComponent = undefined;
            }
          };
          componentsToInitialize.push(state);
        },
        handleUpdate: (element: HTMLElement) => {
          componentsToKeep.push(state!);
        },
        getComponent: () => mdcComponent
      };
    }
  };
};
