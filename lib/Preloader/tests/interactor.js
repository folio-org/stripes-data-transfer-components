import {
  isPresent,
  interactor,
} from '@bigtest/interactor';

@interactor
export class PreloaderInteractor {
  static defaultScope = '[data-test-preloader]';

  isSpinnerPresent = isPresent('[class*=spinner---]');
}
