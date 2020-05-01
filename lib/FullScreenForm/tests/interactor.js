import {
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

@interactor
export class FullScreenFormInteractor {
  defaultScope = '[data-test-full-screen-form]';

  header = new Interactor('[data-test-pane-header]');
  content = new Interactor('[data-test-full-screen-form-content]');
  submitButton = scoped('[data-test-submit-button]', ButtonInteractor);
  cancelButton = scoped('[data-test-cancel-button]', ButtonInteractor);
  closeButton = scoped('[data-test-header-close-button]', ButtonInteractor);
}
