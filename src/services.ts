import {Projector, createProjector, h} from "maquette";
import {createDialogService, DialogService} from "./dialog-service";

export interface MaquetteMDLServices {
  projector: Projector;
  dialogService: DialogService;
}

export let createServices = (window: Window) => {
  let projector = createProjector();
  let dialogService = createDialogService({projector});
  projector.append(window.document.body, () => h('div', [dialogService.renderMaquette]));
  return {
    projector,
    dialogService
  };
};
