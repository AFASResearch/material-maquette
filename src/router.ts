import {h, Projector, VNode} from "maquette";
import {MaterialMaquetteServicesBase} from "./services";
import {MDCService} from "./mdc-service";

export interface Page {
  /**
   * Callback that may destroy components that hold on to resources
   */
  exit?: () => void;
  /**
   * Replace elements with id="placeholder-..." with the specified content
   */
  renderPlaceholders: {[placeholderId: string]: () => VNode};
}

export interface RouterConfig {
  match(url: string): Page | undefined;
  notFoundPage?: Page;
  document: Document;
  projector: Projector;
}

export interface Router {
  start: (placeholders: {[placeholderId: string]: Element}) => void;
}

export let createRouter = (dependencies: {mdcService: MDCService}, config: RouterConfig): Router => {
  let { mdcService } = dependencies;
  let {
    match,
    document,
    projector,
    notFoundPage = {renderPlaceholders: {content: () => h('div', ['Not Found'])}}
  } = config;

  let currentPage: Page = notFoundPage;

  let findRoute = () => {
    currentPage = match(document.location.pathname) || notFoundPage;
  };

  findRoute();

  return {
    start: (placeholders: {[placeholderId: string]: Element}) => {
      Object.keys(placeholders).forEach(placeholderId => {
        let element = placeholders[placeholderId];
        while(element.firstChild) {
          element.removeChild(element.firstChild);
        }
        projector.merge(element, () => {
          let renderPlaceholder = currentPage.renderPlaceholders[placeholderId];
          return renderPlaceholder ? renderPlaceholder() : h('div', {key: currentPage});
        } )
      });

      let handleAfterCreate = () => setTimeout(mdcService.afterAppUpdate);
      projector.append(document.body, () => h('div', {afterCreate: handleAfterCreate, afterUpdate: mdcService.afterAppUpdate}));
    }
  };
};