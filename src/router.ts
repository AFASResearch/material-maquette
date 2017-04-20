import {h, Projector, VNode} from "maquette";

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
  location: Location;
  projector: Projector;
}

export interface Router {
  start: (placeholders: {[placeholderId: string]: Element}) => void;
}

export let createRouter = (config: RouterConfig): Router => {
  let {
    match,
    location,
    projector,
    notFoundPage = {renderPlaceholders: {content: () => h('div', ['Not Found'])}}
  } = config;

  let currentPage: Page = notFoundPage;

  let findRoute = () => {
    currentPage = match(location.pathname) || notFoundPage;
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
          return renderPlaceholder ? renderPlaceholder() : h('div');
        } )
      });
    }
  };
};