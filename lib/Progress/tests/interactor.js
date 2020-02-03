import {
  interactor,
  property,
  text,
} from '@bigtest/interactor';

export default interactor(class ProgressInteractor {
  static defaultScope = '[data-test-progress-bar]';

  currentProgressStyles = property('div[class*=progressCurrent---', 'style');
  progressInfoText = text('div[class*=progressInfo---]');
});
