import { h, Projector, VNode } from 'maquette';
import { MDCService } from './mdc-service';

export interface Page {
  /**
   * Callback that may destroy components that hold on to resources
   */
  exit?: () => void;
  title: () => string;
  /**
   * Should start with h('main', {key: ... }
   */
  content: () => VNode;
}

export interface RouterConfig {
  match(url: string): Page | undefined;
  notFoundPage?: Page;
  document: Document;
  projector: Projector;
}

export interface RouterStartParameters {
  titleElement: Element;
  contentElement: Element;
}

export interface Router {
  start: (parameters: RouterStartParameters) => void;
  getCurrentPage(): Page;
  navigate(url: string): void;
}

const defaultNotFoundPage: Page = {
  title: () => 'Not found',
  content: () => h('main', { key: defaultNotFoundPage }, [
    h('h2.mdc-typography--display2', ['Not found'])
  ])
};

export let createRouter = (dependencies: { mdcService: MDCService, window: Window }, config: RouterConfig): Router => {
  let { mdcService, window } = dependencies;
  let {
    match,
    document,
    projector,
    notFoundPage = defaultNotFoundPage
  } = config;

  let currentPage: Page = notFoundPage;

  let findRoute = () => {
    currentPage = match(document.location.pathname) || notFoundPage;
  };

  findRoute();

  return {
    start: (options: RouterStartParameters) => {
      options.titleElement.innerHTML = '';
      projector.merge(options.titleElement, () => h('span', [currentPage.title()]));
      options.contentElement.innerHTML = '';
      projector.merge(options.contentElement, () => currentPage.content());

      let handleAfterCreate = () => setTimeout(mdcService.afterAppUpdate);
      projector.append(document.body, () => h('div', { afterCreate: handleAfterCreate, afterUpdate: mdcService.afterAppUpdate }));
    },
    navigate: (url: string) => {
      window.history.pushState({}, '', url);
      currentPage = match(url) || notFoundPage;
    },
    getCurrentPage: () => currentPage
  };
};
