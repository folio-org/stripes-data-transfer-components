import {
  interactor,
  scoped,
  Interactor,
  text,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

@interactor
export class FullScreenViewInteractor {
  defaultScope = '[data-test-full-screen-view]';

  headerTitle = text('[data-test-full-screen-view] [data-test-pane-header-title]');
  content = new Interactor('[data-test-full-screen-view-content]');
  closeButton = scoped('[data-test-header-close-button]', ButtonInteractor);
  actionMenu = scoped('[data-test-pane-header-actions-button]', ButtonInteractor);
}
