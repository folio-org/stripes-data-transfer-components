import {
  interactor,
  property,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import ButtonInteractor from '@folio/stripes-components/lib/Button/tests/interactor';

@interactor
export class SearchFormInteractor {
  static defaultScope = '[data-test-search-form]';

  searchField = new TextFieldInteractor('[data-test-search-form]');
  clearSearchFieldButton = new ButtonInteractor('#input-search-field-clear-button');
  searchSubmitButton = new ButtonInteractor('[data-test-search-form-submit]');
  searchSubmitButtonDisabled = property('[data-test-search-form-submit]', 'disabled');
}
