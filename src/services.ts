import {Projector, createProjector, h} from "maquette";
import {createDialogService, DialogService} from "./dialog-service";

/**
 * Minimal set of services
 */
export interface MaterialMaquetteServicesBase {
  projector: Projector;
}

/**
 * Includes all optional services
 */
export interface AllMaterialMaquetteServices extends MaterialMaquetteServicesBase {
  dialogService: DialogService;
}

export let createAllServices = (window: Window): AllMaterialMaquetteServices => {
  let projector = createProjector();
  let dialogService = createDialogService({projector});
  projector.append(window.document.body, () => h('div', [dialogService.renderMaquette()]));
  return {
    projector,
    dialogService
  };
};
