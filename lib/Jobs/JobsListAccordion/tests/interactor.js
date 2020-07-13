import {
  interactor,
  text,
  Interactor,
  is,
} from '@bigtest/interactor';

@interactor
export class JobsListAccordionInteractor {
  static defaultScope = '[data-test-accordion-section]';

  title = text('[data-test-jobs-accordion-title]');
  collapseButton = new Interactor('[class*=defaultCollapseButton--]');
  contentWrapper = new Interactor('[data-test-accordion-wrapper]');
  isExpanded = is('[data-test-accordion-wrapper]', '[class*=expanded--]');
  badge = new Interactor('[class*=badge---]');
  badgeLabelText = text('[class*=badge---] [class*=label---]');
  spinner = new Interactor('[class*=spinner---]');
}
