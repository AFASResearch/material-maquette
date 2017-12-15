import { h, ProjectorService, VNode } from 'maquette';

export interface Page {
  /**
   * color is put on <html>
   */
  backgroundColor?: string;
  /**
   * Extra classes that are applied to <html>. Can be used to switch to another background color/image
   */
  extraClasses?: string[];
  /**
   * Limits the maximum width for this page
   */
  maxWidth?: number;
  /**
   * Callback that may destroy components that hold on to resources
   */
  exit?(): void;
  renderTitle(): string;
  /**
   * Should start with h('main', {key: ... }
   */
  renderContent(): VNode;
}

export interface RouterConfig {
  notFoundPage?: Page;
  match(url: string): Page | undefined;
}

export interface RouterService {
  start(config: RouterConfig): void;
  getCurrentPage(): Page;
  navigate(url: string): void;
  renderTitle(): VNode;
  renderContent(): VNode;
}

const defaultNotFoundPage: Page = {
  renderTitle: () => 'Not found',
  renderContent: () => h('main', { key: defaultNotFoundPage }, [
    h('h2.mdc-typography--display2', ['Not found'])
  ])
};

export let createRouterService = (dependencies: { projector: ProjectorService, window: Window }): RouterService => {
  let { projector, window } = dependencies;
  let document = window.document;
  let contentElement: HTMLElement | undefined;
  let notFoundPage: Page | undefined;

  let activate = (element: Element) => {
    contentElement = element as HTMLElement;
    let page = currentPage;
    if (page.backgroundColor) {
      window.document.documentElement.style.backgroundColor = page.backgroundColor;
    }
    if (page.extraClasses) {
      window.document.documentElement.classList.add(...page.extraClasses);
    }
    if (page.maxWidth !== undefined) {
      contentElement!.style.maxWidth = `${page.maxWidth}px`;
    }
  };

  let deactivate = () => {
    let page = currentPage;
    if (page.exit) {
      page.exit();
    }
    if (page.backgroundColor) {
      window.document.documentElement.style.backgroundColor = '';
    }
    if (page.extraClasses) {
      window.document.documentElement.classList.remove(...page.extraClasses);
    }
    if (page.maxWidth !== undefined) {
      contentElement!.style.maxWidth = '';
    }
  };

  let currentPage: Page;
  let currentPathname: string | undefined;
  let findRoute: (url: string) => Page;

  return {
    start: (config: RouterConfig) => {
      notFoundPage = config.notFoundPage || defaultNotFoundPage;
      let { match } = config;
      findRoute = (url: string) => match(url) || notFoundPage!;
      currentPathname = document.location.pathname;
      currentPage = findRoute(currentPathname);
      window.onpopstate = () => {
        if (currentPathname !== document.location.pathname) {
          currentPathname = document.location.pathname;
          let newPage = findRoute(currentPathname);
          if (newPage !== currentPage) {
            deactivate();
            currentPage = newPage;
            projector.scheduleRender();
          }
        }
      };
    },

    renderTitle: () => h('span', [currentPage.renderTitle()]),

    renderContent: () => h('main', { key: currentPage, afterCreate: activate }, [currentPage.renderContent()]),

    navigate: (url: string) => {
      currentPathname = url;
      window.history.pushState({}, '', url + document.location.search);
      let newPage = findRoute(url);
      if (newPage !== currentPage) {
        deactivate();
        currentPage = newPage;
      }
    },

    getCurrentPage: () => currentPage

  };
};
