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
  /**
   * color is put on <html>
   */
  backgroundColor?: string;
  /**
   * Limits the maximum width for this page
   */
  maxWidth?: number;
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
  let contentElement: HTMLElement | undefined;

  let activate = (page: Page) => {
    if (page.backgroundColor) {
      window.document.documentElement.style.backgroundColor = page.backgroundColor;
    }
    if (page.maxWidth !== undefined) {
      contentElement!.style.maxWidth = page.maxWidth + 'px';
    }
  };

  let deactivate = (page: Page) => {
    if (page.exit) {
      page.exit();
    }
    if (page.backgroundColor) {
      window.document.documentElement.style.backgroundColor = '';
    }
    if (page.maxWidth !== undefined) {
      contentElement!.style.maxWidth = '';
    }
  };

  let findRoute = (url: string) => match(url) || notFoundPage;
  let currentPage: Page = notFoundPage;
  let currentPathname: string | undefined;

  return {

    start: (options: RouterStartParameters) => {
      contentElement = options.contentElement as HTMLElement;
      currentPathname = document.location.pathname;
      currentPage = findRoute(currentPathname);
      activate(currentPage);

      options.titleElement.innerHTML = '';
      projector.merge(options.titleElement, () => h('span', [currentPage.title()]));
      options.contentElement.innerHTML = '';
      projector.merge(options.contentElement, () => h('main', [currentPage.content()]));

      let handleAfterCreate = () => setTimeout(mdcService.afterAppUpdate);
      projector.append(document.body, () => h('div', { afterCreate: handleAfterCreate, afterUpdate: mdcService.afterAppUpdate }));
      window.onpopstate = () => {
        if (currentPathname !== document.location.pathname) {
          currentPathname = document.location.pathname;
          let newPage = findRoute(currentPathname);
          if (newPage !== currentPage) {
            deactivate(currentPage);
            currentPage = newPage;
            activate(currentPage);
          }
        }
      };
    },

    navigate: (url: string) => {
      currentPathname = url;
      window.history.pushState({}, '', url + document.location.search);
      let newPage = findRoute(url);
      if (newPage !== currentPage) {
        deactivate(currentPage);
        currentPage = newPage;
        activate(currentPage);
      }
    },

    getCurrentPage: () => currentPage

  };
};
