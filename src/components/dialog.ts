import { Component, h, Projector } from 'maquette';
import { DialogConfig } from '../dialog-service';
import { dialog } from 'material-components-web/dist/material-components-web';
import { MDCService } from '../mdc-service';
import { createButton } from './button';

export interface Dialog extends Component {
  exit?: () => void;
}

let dialogCount = 0;

export let createDialog = (deps: { projector: Projector, mdcService: MDCService }, config: DialogConfig, lastFocused: Element): Dialog => {

  let id = dialogCount++;

  let enhancer = deps.mdcService.createEnhancer(dialog.MDCDialog, (component: any) => {
    component.listen('MDCDialog:accept', (evt: Event) => {
      config.actions.filter(action => action.isAccept).forEach(action => action.onclick());
      deps.projector.scheduleRender();
    });
    component.listen('MDCDialog:cancel', (evt: Event) => {
      config.actions.filter(action => action.isCancel).forEach(action => action.onclick());
      deps.projector.scheduleRender();
    });
    component.lastFocusedTarget = lastFocused;
    component.show();
  });

  let handleAfterCreate = (dialog: HTMLElement) => {
    enhancer.handleCreate(dialog);
  };

  let headerId = `dialog-header-${id}`;
  let contentId = `dialog-content-${id}`;

  let actionButtons = config.actions.map(action => {
    let extraClasses = ['mdc-dialog__footer__button'];
    if (action.isCancel) {
      extraClasses.push('mdc-dialog__footer__button--cancel');
    }
    if (action.isAccept) {
      extraClasses.push('mdc-dialog__footer__button--accept');
    }
    return createButton(deps, {
      text: action.text,
      raised: action.raised,
      primary: action.primary,
      onClick: action.onclick,
      visible: action.isVisible,
      disabled: action.isDisabled,
      extraClasses
    });
  });

  return {
    renderMaquette: () => {
      if (enhancer.getComponent() && !enhancer.getComponent().open) {
        enhancer.getComponent().show(); // if we are still rendered by maquette, we should remain visible
      }
      return h('aside.mdc-dialog', {
        role: 'alertdialog',
        'aria-labelledby': headerId,
        'aria-describedby': contentId,
        afterCreate: handleAfterCreate,
        afterUpdate: enhancer.handleUpdate,
        key: id
      }, [
          h('div.mdc-dialog__surface', [
            h('header.mdc-dialog__header', [
              h('h2.mdc-dialog__header__title', { id: headerId }, [config.title()])
            ]),
            h('section.mdc-dialog__body', { id: contentId }, [
              config.content()
            ]),
            h('footer.mdc-dialog__footer', [
              actionButtons.map(button => button.renderMaquette())
            ])
          ]),
          h('div.mdc-dialog__backdrop')
        ]);
    },
    exit: config.exit
  };
};
