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

export let createAllServices = (window: Window): AllMaterialMaquetteServices => {
  let projector = createProjector();
  let mdcService = createMDCService();
  let dialogService = createDialogService({projector, mdcService});
  projector.append(window.document.body, () => h('div', [dialogService.renderMaquette()]));
  return {
    window,
    projector,
    mdcService,
    dialogService
  };
};
