import { interactor } from '@bigtest/interactor';

export default interactor(class JobInteractor {
  static defaultScope = '[data-test-job-item]';
});
