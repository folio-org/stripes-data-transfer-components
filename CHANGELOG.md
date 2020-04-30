# Change history for stripes-data-transfer-components

## 1.1.0 (IN PROGRESS)
* Implement `SearchForm` component. UIDEXP-51.
* Add `ProfilesLabel` and `SettingsLabel` components for second settings pane. UIDEXP-39.
* Add mapping profiles pane component to display static data. UIDEXP-41.
* Handle "form elements must have labels" accessibility problem for the file uploader form. STDTC-7.
* Update jobs list structure according to the accessibility requirements. UIDEXP-49.
* Create reusable `SearchResults` view component. STDTC-8.
* Create reusable `SearchAndSortPane` component. STDTC-9.

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
