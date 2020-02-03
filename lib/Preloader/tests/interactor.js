import {
  isPresent,
  interactor,
} from '@bigtest/interactor';

export default interactor(class PreloaderInteractor {
  static defaultScope = '[data-test-preloader]';

  isSpinnerPresent = isPresent('div[class*=spinner---]');
});
