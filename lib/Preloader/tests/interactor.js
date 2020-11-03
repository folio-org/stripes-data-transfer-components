import {
  attribute,
  interactor,
} from '@bigtest/interactor';

@interactor
class SpinnerInteractor {
  static defaultScope = '[class*=spinner---]';

  style = attribute('style');
}

@interactor
export class PreloaderInteractor {
  static defaultScope = '[data-test-preloader]';

  spinner = new SpinnerInteractor();
  className = attribute('class');
}
