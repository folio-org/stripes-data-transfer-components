import {
  scoped,
  attribute,
  interactor,
} from '@bigtest/interactor';

@interactor
export class PreloaderInteractor {
  static defaultScope = '[data-test-preloader]';

  spinner = scoped('[class*=spinner---]', { style: attribute('style') });
  className = attribute('class');
}
