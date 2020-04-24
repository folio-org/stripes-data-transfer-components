import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import { SearchFormInteractor } from '../../../SearchForm/tests/interactor';
import { SearchResultsInteractor } from '../../../SearchResults/tests/interactor';

@interactor export class MappingProfilesInteractor {
  static defaultScope = '[data-test-mapping-profiles-pane]';

  searchForm = new SearchFormInteractor();
  paneTitle = scoped('[data-test-settings-label]');
  searchResults = new SearchResultsInteractor();
}
