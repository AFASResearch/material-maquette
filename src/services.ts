import { Projector, createProjector, h } from 'maquette';
import { createDialogService, DialogService } from './services/dialog-service';
import { createRouterService, RouterService } from './services/router-service';

/**
 * Minimal set of services
 */
export interface MaterialMaquetteServicesBase {
  window: Window;
  projector: Projector;
}

/**
 * Includes all optional services
 */
export interface AllMaterialMaquetteServices extends MaterialMaquetteServicesBase {
  dialogService: DialogService;
  routerService: RouterService;
}

export let createServicesBase = (window: Window): MaterialMaquetteServicesBase => {
  let projector = createProjector();
  return { window, projector };
};

export let createAllServices = (window: Window): AllMaterialMaquetteServices => {
  let base = createServicesBase(window);
  let dialogService = createDialogService(base);
  let routerService = createRouterService(base);
  base.projector.append(window.document.body, () => h('div', [dialogService.render()]));
  return { ...base, dialogService, routerService };
};
