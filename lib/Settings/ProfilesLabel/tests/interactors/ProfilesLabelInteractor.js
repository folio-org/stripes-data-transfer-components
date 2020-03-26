import {
  interactor,
  scoped,
} from '@bigtest/interactor';

@interactor class ProfilesLabelInteractor {
  static defaultScope = '[data-test-profile-label]';

  infoButton = scoped('button');
}

export default ProfilesLabelInteractor;
