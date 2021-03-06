import {
  interactor,
  scoped,
} from '@bigtest/interactor';

@interactor
export class ProfilesLabelInteractor {
  static defaultScope = '[data-test-profile-label]';

  infoButton = scoped('[data-test-info-popover-trigger]');
}
