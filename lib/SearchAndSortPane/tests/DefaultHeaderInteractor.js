import {
  interactor,
  text,
} from '@bigtest/interactor';

import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';
import SettingsLabelInteractor from '../../Settings/SettingsLabel/tests/interactor';

@interactor
export class DefaultHeaderInteractor {
  static defaultScope = '[data-test-pane-header]';

  title = new SettingsLabelInteractor();
  subTitleText = text('[data-test-pane-header-sub]');
  newButton = new ButtonInteractor('[data-test-new-button]');
}
