import {
  interactor,
  Interactor,
  isPresent,
  hasClass,
} from '@bigtest/interactor';

import { hasClassBeginningWith } from '../../../test/bigtest/helpers';

export default interactor(class EnfOfItemInteractor {
  isLayoutContainerPresent = isPresent('[data-test-layout]');
  isLayoutCentered = hasClassBeginningWith('[data-test-layout]', 'textCentered--');
  label = new Interactor('span[class*=label--]');
  isIconPresent = isPresent('[data-test-icon-element]');
  hasIconEndMarkClass = hasClass('[data-test-icon-element]', 'icon-end-mark');

  hasCustomClassOnLayout = function (className) {
    return hasClass('[data-test-layout]', className).get.bind(this)();
  };
});
