import { h, MaquetteComponent, ProjectorService } from 'maquette';
import { DialogConfig } from '../services/dialog-service';
import { dialog } from 'material-components-web/dist/material-components-web';
import { renderButton } from './button';
import { createMdcComponentManager } from '../';

export interface Dialog extends MaquetteComponent {
  exit(): void;
}

let dialogCount = 0;

let dialogManager = createMdcComponentManager(dialog.MDCDialog);

export let createDialog = (deps: { projector: ProjectorService },
  config: DialogConfig,
  lastFocused: Element): Dialog => {
  let exited = false;
  let id = dialogCount++;

  let handleAfterCreate = (element: Element) => {
    dialogManager.handleAfterCreate(element);
    let mdcComponent = dialogManager.getComponent(element);
    mdcComponent.listen('MDCDialog:accept', (evt: Event) => {
      config.actions.filter(action => action.isAccept).forEach(action => action.onclick());
      deps.projector.scheduleRender();
    });
    mdcComponent.listen('MDCDialog:cancel', (evt: Event) => {
      config.actions.filter(action => action.isCancel).forEach(action => action.onclick());
      deps.projector.scheduleRender();
    });
    mdcComponent.lastFocusedTarget = lastFocused;
    mdcComponent.show(); // Buggy: focus accept button and trap focus does not work
  };

  let handleAfterUpdate = (element: Element) => {
    let mdcComponent = dialogManager.getComponent(element);
    if (!mdcComponent.open) {
      mdcComponent.show();
    }
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
    return {
      render: () => (!action.isVisible || action.isVisible()) ? renderButton(deps, {
        style: {
          raised: action.raised,
          stroked: action.primary,
          extraClasses
        },
        disabled: action.isDisabled && action.isDisabled(),
        text: action.text(),
        onClick: (action.isCancel || action.isAccept) ? () => undefined /* MDCDialog:* calls onclick */ : action.onclick
      }) : undefined
    };
  });

  return {
    render: () => {
      return h('aside.mdc-dialog', {
        role: 'alertdialog',
        'aria-labelledby': headerId,
        'aria-describedby': contentId,
        afterCreate: handleAfterCreate,
        afterUpdate: handleAfterUpdate,
        afterRemoved: dialogManager.handleAfterRemoved,
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
              actionButtons.map(button => button.render())
            ])
          ]),
          h('div.mdc-dialog__backdrop')
        ]);
    },
    exit: () => {
      if (!exited) {
        exited = true;
        if (config.exit) {
          config.exit();
        }
      }
    }
  };
};
