import {Projector, createProjector, h} from "maquette";
import {createDialogService, DialogService} from "./dialog-service";
import {createMDCService, MDCService} from "./mdc-service";

/**
 * Minimal set of services
 */
export interface MaterialMaquetteServicesBase {
  window: Window;
  projector: Projector;
  mdcService: MDCService;
}

/**
 * Includes all optional services
 */
export interface AllMaterialMaquetteServices extends MaterialMaquetteServicesBase {
  dialogService: DialogService;
}

export let createServicesBase = (window: Window): MaterialMaquetteServicesBase => {
  let projector = createProjector();
  let mdcService = createMDCService();
  return { window, projector, mdcService };
};

export let createAllServices = (window: Window): AllMaterialMaquetteServices => {
  let base = createServicesBase(window);
  let dialogService = createDialogService(base);
  base.projector.append(window.document.body, () => h('div', [dialogService.renderMaquette()]));
  return { ...base, dialogService };
};
