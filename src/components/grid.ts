import {h, VNode, VNodeChildren} from "maquette";
import {createSelector} from "../utilities";

export interface GridConfig {
  extraClasses?: string[];
}

export let createGrid = (config: GridConfig) => {
  let selector = createSelector('div.mdc-layout-grid', undefined, config.extraClasses);
  return {
    wrap: (renderContent: () => VNodeChildren): VNode => {
      return h(
        selector,
        renderContent()
      );
    }
  }
};
