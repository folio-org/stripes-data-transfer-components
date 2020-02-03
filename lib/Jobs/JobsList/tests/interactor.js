import {
  interactor,
  Interactor,
} from '@bigtest/interactor';

export default interactor(class JobListContainerInteractor {
  static defaultScope = '[data-test-jobs-list-container]';

  emptyMessage = new Interactor('[data-test-empty-message]');
  list = new Interactor('[data-test-jobs-list]');
});
