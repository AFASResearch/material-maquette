import { h, VNode, VNodeChildren } from 'maquette';
import { createSelector } from '../utilities';

export interface GridConfig {
  extraClasses?: string[];
}

export interface CellConfig {
  span?: number;
  spanDesktop?: number;
  spanTablet?: number;
  spanPhone?: number;
  alignTop?: boolean;
}

export let toCellClassNamesSuffix = (cellConfig: CellConfig) => {
  let result = '.mdc-layout-grid__cell';
  if (cellConfig.span) {
    result += `.mdc-layout-grid__cell--span-${cellConfig.span}`;
  }
  if (cellConfig.spanDesktop) {
    result += `.mdc-layout-grid__cell--span-${cellConfig.span}-desktop`;
  }
  if (cellConfig.spanTablet) {
    result += `.mdc-layout-grid__cell--span-${cellConfig.span}-tablet`;
  }
  if (cellConfig.spanPhone) {
    result += `.mdc-layout-grid__cell--span-${cellConfig.span}-phone`;
  }
  if (cellConfig.alignTop) {
    result += '.mdc-layout-grid__cell--align-top';
  }
  return result;
};

export let createGrid = (config: GridConfig) => {
  let selector = createSelector('div.mdc-layout-grid', undefined, config.extraClasses);
  return {
    wrap: (renderContent: () => VNodeChildren): VNode => {
      return h(selector, [
        h('div.mdc-layout-grid__inner', renderContent())
      ]);
    }
  };
};
