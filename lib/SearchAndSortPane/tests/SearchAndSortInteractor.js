import { interactor } from '@bigtest/interactor';

import { DefaultHeaderInteractor } from './DefaultHeaderInteractor';
import { SearchFormInteractor } from '../../SearchForm/tests/interactor';
import { SearchResultsInteractor } from '../../SearchResults/tests/interactor';

@interactor
export class SearchAndSortInteractor {
  static defaultScope = '#pane-results';

  header = new DefaultHeaderInteractor();
  searchForm = new SearchFormInteractor();
  searchResults = new SearchResultsInteractor();
}
