import { interactor } from '@bigtest/interactor';

@interactor
export class JobInteractor {
  static defaultScope = '[data-test-job-item]';
}
