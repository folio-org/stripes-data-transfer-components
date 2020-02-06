import {
  interactor,
  property,
  text,
} from '@bigtest/interactor';

export default interactor(class ProgressInteractor {
  static defaultScope = '[data-test-progress-bar]';

  currentProgressStyles = property('[class*=progressCurrent---', 'style');
  progressInfoText = text('[class*=progressInfo---]');
});
