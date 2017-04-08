import {Projector, createProjector} from "maquette";

export interface MaquetteMDLServices {
  projector: Projector;
}

export let createServices = () => {
  let projector = createProjector();

  return {
    projector
  };
};
