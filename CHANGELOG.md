# Change history for stripes-data-transfer-components

## 4.2.0 (IN PROGRESS)

## [4.1.0](https://github.com/folio-org/stripes-data-transfer-components/tree/v4.1.0) (2021-06-10)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v4.0.0...v4.1.0)
* Add `searchInputRef` prop to the `SearchForm` component. UIDATIMP-898.
* Add `firstMenu` prop to the `SearchAndSortPane` component. UIDATIMP-913.
* Update translations

## [4.0.0](https://github.com/folio-org/stripes-data-transfer-components/tree/v4.0.0) (2021-03-11)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v3.0.2...v4.0.0)
* Export test utils in order to reuse them in data-export for writing tests with jest/react-testing-library. UIDEXP-179.
* Reuse `<JobsListAccordion>` component from `stripes-data-transfer-components` rep. UIDATIMP-574.
* Update interactors related to the `<InfoPopover>` implementation to fix tests. UIDEXP-190.
* Add Source Record Storage type. UIDEXP-178.
* Setup jest/react-testing-library and cover `EndOfItem` and `Progress` components and util methods with tests. STDTC-18.
* Get rid of default `notLoadedMessage` value for `SearchResults` component. UIDATIMP-581.
* Extend `<SearchForm>` component with additional props. UIDATIMP-582.
* Rewrite `DataFetcher` using functional component notation. STDTC-34.
* Update `getHookExecutionResult` in order for it to be able to return function. UIDEXP-143.
* Move pretender to dev dependencies. UIDEXP-186.
* Change focus when user clicks on Data import app. UIDATIMP-775.
* Export `getHookExecutionResult` for BigTest tests and adjust it for BigTest and jest to work with translations. UIDEXP-213.
* Enable Progress with 'none' type. UIF-237.
* Refactor `onNeedMore` function for `SearchResults` component. UIDATIMP-763.
* Update `stripes` to `v6.0.0`. STDTC-35.
* Extend `Harnses` test setup component with `react-query` and `stripes` providers. UIDEXP-224.
* Update `stripes-cli` to `v2.0.0`. STDTC-38.
* Update translations

## [3.0.2](https://github.com/folio-org/stripes-data-transfer-components/tree/v3.0.2) (2020-11-13)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v3.0.0...v3.0.2)
* Extend `<Preloader>` component with additional props. UIDATIMP-580.
* Handle missing job progress field. STDTC-21.
* Update translations

## [3.0.0](https://github.com/folio-org/stripes-data-transfer-components/tree/v3.0.0) (2020-10-15)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v2.0.1...v3.0.0)
* Update list formatters and list properties generators to fix rows accessibility. UIDEXP-117.
* Update export and imports to make them consistent using named approach. STDTC-3.
* Remove `@bigtest/mirage` and mirage config files. STDTC-14.
* Update `FullScreenView` component to support `renderHeader` prop. UIDATIMP-535.
* Update `stripes` to `v5.0.0` and `react-router-dom` to `5.2.0`. Enforce named export usage in `eslint`. Remove `actsAs` from stripes config. STDTC-13.
* Update `FullScreenView` component to support `noValidate` prop. STDTC-16.
* Add `OverlayView` component and extend JobLogs API. UIDEXP-18.
* Extend `SortAndSearchPane` to accept `excludedSortColumns` and `shouldSetInitialSortOnMount` prop. UIDEXP-142.
* Update `react-intl` to v5.7.0. STDTC-15.
* Fix date and time display in Safari. UIDEXP-175.
* Update translations

## [2.0.1](https://github.com/folio-org/stripes-data-transfer-components/tree/v2.0.1) (2020-07-09)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v2.0.0...v2.0.1)
* Fix error screen display in case of missed user information in job executions. UIDEXP-107.
* Update properties in `ProfilesPopoverInteractor` and export `ProfilesLabelInteractors`. UIDEXP-53.
* Add job name display in job logs and executions. UIDEXP-116.
* Extend `SettingsLabel` with ability to provide arbitrary label content. UIDEXP-86.
* Extend `FullScreenView` to accept `actionMenu` prop. Sync up eslint config with data-export and replace deprecated `type` with `actAs` in package.json. UIDEXP-84.
* Update translations

## [2.0.0](https://github.com/folio-org/stripes-data-transfer-components/tree/v2.0.0) (2020-06-12)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v1.0.1...v2.0.0)
* Implement `SearchForm` component. UIDEXP-51.
* Add `ProfilesLabel` and `SettingsLabel` components for second settings pane. UIDEXP-39.
* Add mapping profiles pane component to display static data. UIDEXP-41.
* Handle "form elements must have labels" accessibility problem for the file uploader form. STDTC-7.
* Update jobs list structure according to the accessibility requirements. UIDEXP-49.
* Create reusable `SearchResults` view component. STDTC-8.
* Create reusable `SearchAndSortPane` component. STDTC-9.
* Move `FullScreenFormComponent` from ui-data-import project. UIDEXP-96.
* Add icon for job profiles. UIDEXP-79.
* Update to Stripes v4. STDTC-10.
* Export test utils and extend FOLIO record types list. UIDEXP-46.
* Implement `JobProfiles` list component. UIDEXP-80.
* Update formatter for `MappingProfiles` list items. UIDEXP-57.
* Export PreloaderInteractor. UIDEXP-82.
* Update record column in jobs logs list for failed status. UIDEXP-97.
* Export ProgressInteractor and update job execution prop types. UIDEXP-38.
* Extend `SearchAndSortPane` and `JobProfiles` with new props in order to adjust it for choose job profile page. Extend and export test utils for building resources and mutator. UIDEXP-87.
* Add `FullScreenView` component. Change `SearchAndSortPane` rowProp `href` with `to`. UIDEXP-50.
* Update translations

## [1.0.1](https://github.com/folio-org/stripes-data-transfer-components/tree/v1.0.0) (2020-04-02)
[Full Changelog](https://github.com/folio-org/stripes-data-transfer-components/tree/v1.0.0...v1.0.1)
* Update `stripes-smart-components` to `v3.0.0` to avoid errors. UIDEXP-37.
* Remove totalRecords value from defaultJobLogsColumnWidths settings for the jobs logs list. Adjust `sortNumbers` function to work correctly with empty values. Refs UIDEXP-58.

## [1.0.0](https://github.com/folio-org/stripes-data-transfer-components/tree/v1.0.0) (2020-03-13)
* Module is created. Add FileUploader component. Refs UIDEXP-11.
* Move components from ui-data-import to display jobs and jobs lists. UIDEXP-14.
* Move accordion with jobs list to separated component. UIDEXP-6.
* Add shared utils for initiating data export process. UIDEXP-20.
* Move job logs component from ui-data-import. UIDEXP-16.
* Move getFileExtension from ui-data-import. UIDEXP-21.
* Update `stripes` to `v3.0.0`, `stripes-core` to `4.0.0` and `react-intl` to `2.9.0`. UIDEXP-31.
* Implement DataFetcher component for making API requests upon interval. Refs UIDEXP-22.
* Update JobLogs and related components according to changes in requirements . UIDEXP-7.
* Rewrite DataFetcher with the class based approach instead of hooks as it was not consistent with the behavior in data-import. UIDEXP-23.
