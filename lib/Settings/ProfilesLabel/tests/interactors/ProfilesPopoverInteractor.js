import {
  interactor,
  Interactor,
  text,
  property,
} from '@bigtest/interactor';

import css from '../../ProfilesLabel.css';

@interactor class ProfilesPopoverInteractor {
  static defaultScope = '[data-role="popover"]';

  content = new Interactor(`.${css.profilesPopoverContent}`);
  linkHref = property('[class*=popoverPop---] a', 'href');
  linkText = text('[class*=popoverPop---] a');
}

export default ProfilesPopoverInteractor;
