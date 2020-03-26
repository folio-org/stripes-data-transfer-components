import {
  interactor,
  Interactor,
  text,
  property,
} from '@bigtest/interactor';

@interactor class ProfilesPopoverInteractor {
  content = new Interactor('[data-profiles-label-content]');
  linkHref = property('[class*=popoverPop---] a', 'href');
  linkText = text('[class*=popoverPop---] a');
}

export default ProfilesPopoverInteractor;
