import {Component, h, VNode} from "maquette";

export interface Page extends Component {
  renderMaquette: () => VNode;
}

export interface RouterConfig {
  match(url: string): Page | undefined;
  notFoundPage?: Page;
  location: Location;
}

export let createRouter = (config: RouterConfig): Page => {
  let {
    match,
    location,
    notFoundPage = {renderMaquette: () => h('div', ['Not Found'])}
  } = config;

  let currentPage: Page = notFoundPage;

  let findRoute = () => {
    currentPage = match(location.pathname) || notFoundPage;
  };

  findRoute();

  return {
    renderMaquette: () => currentPage.renderMaquette()
  };
};