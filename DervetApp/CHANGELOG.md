# Changelog
Notable changes to the DER-VET-GUI Project will be documented in this file.

Questions and feedback can be submitted to the Electric Power Research Institute (EPRI) from the Survey Monkey feedback linked on the DER-VET website (https://www.der-vet.com/software/).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [1.1.0] - 2021-05-21
### Added
- This CHANGELOG file to document notable changes to each version.
- The import of a Retail Tariff file is no longer case sensitive with regards to the Charge Type value.
- Improve the process of Importing an Existing Project (better error messaging, less restrictive).

### Changed
- Change the Optimization Window from Years to Months for the ERCOT Market Case Pre-Defined Analyses to reduce runtime .
- Update some wording on the splash page.

### Fixed
- Fix the ability to download sample CSV data files in the app.
- With optimal sizing turned OFF, allow negative Day-Ahead energy price (time series) data.
- Fix the calculation of analysis end-year (from start-year and analysis horizon), as seen in the number of rows appearing in the Proforma Financial Results.
- Allow the Optimization Horizon value to be saved when Hours is selected for the Optimization Window.

### DER-VET Python change log links
- [storageVET change log](https://github.com/epri-dev/StorageVET/blob/master/CHANGELOG.md)
- [DER-VET change log](https://github.com/epri-dev/DER-VET/blob/master/CHANGELOG.md)

## [1.0.0] - 2021-03-31
### Added
- All project files added. This is the first release.
