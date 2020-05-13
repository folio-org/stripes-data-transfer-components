import {
  interactor,
  Interactor,
  text,
} from '@bigtest/interactor';

@interactor class SettingsLabelInteractor {
  static defaultScope = '[data-test-settings-label]';

  icon = new Interactor('[class*=appIcon--]');
  labelText = text('[class*=label---]');
}

export default SettingsLabelInteractor;
