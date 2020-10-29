import {
  interactor,
  Interactor,
  text,
  property,
} from '@bigtest/interactor';

@interactor
export class ProfilesPopoverInteractor {
  content = new Interactor('[data-test-info-popover-content]');
  linkHref = property('[data-test-info-popover-button]', 'href');
  linkText = text('[data-test-info-popover-button]');
}
