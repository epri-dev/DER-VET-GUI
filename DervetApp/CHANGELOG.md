# Changelog
Notable changes to the DER-VET-GUI Project will be documented in this file.

Questions and feedback can be submitted to the Electric Power Research Institute (EPRI) from the Survey Monkey feedback linked on the DER-VET website (https://www.der-vet.com/software/).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [1.1.2] - 2021-09-07
## Added
- adds plotly button to reset axes in lower Results Dispatch, Results Reliability, and Results Summary plots
- adds Choose Install Location option in Windows installation

## Changed
- Results Deferral plot has less plotly options
- Changed the expected type to float for yearly_degrade battery input

## Fixed
- Save buttons were fixed so as not to reset all project data
- The size of the DER-VET brand in the Top Navigation Bar was adjusted to not get very large when zooming and re-sizing the app window
- The unit label of variable o&m cost was again fixed to match the backend

## [1.1.1] - 2021-08-03
### Added
- Feature to allow the saving of deactivated tech in a project

### Fixed
- The unit label of variable o&m cost was fixed to match the backend

## [1.1.0] - 2021-07-08
### Added
- This CHANGELOG file to document notable changes to each version.
- The import of a Retail Tariff file is no longer case sensitive with regards to the Charge Type value.
- Improve the process of Importing an Existing Project (better error messaging, less restrictive).
- The file input form resets to allow an upload of the same file.
- Instructions on how to add a new pre-defined case were added to the README.
- Time series data uploads now supports files saved in Excel on a Mac.
- Time series data uploads now supports .txt files.
- Non-required values on DR objectives page become reset upon save.
- Top-most dispatch plot was flipped, and the trace names better match backend changes.
- New button added to the DR page to select-all or un-select-all calendar months.
- A new CAISO Market Case was added to the drop-down items under Pre-Defined Analyses.
- A new EV Battery Sizing case was added to the drop-down items under Pre-Defined Analyses.

### Changed
- Change the Optimization Window from Years to Months for the ERCOT Market Case Pre-Defined Analyses to reduce runtime.
- Update some wording on the splash page.
- The way that pre-defined cases are loaded was changed so that the process is the same as how a project is imported.
- Import project page was reformatted and has a spinner when loading a case.
- The minimum value for all growth rates was set from 0 to -100 percent to align with the backend Python.
- ERCOT pre-defined case was removed.

### Fixed
- Fix the ability to download sample CSV data files in the app.
- With optimal sizing turned OFF, allow negative Day-Ahead energy price (time series) data.
- Fix the calculation of analysis end-year (from start-year and analysis horizon), as seen in the number of rows appearing in the Proforma Financial Results.
- Allow the Optimization Horizon value to be saved when Hours is selected for the Optimization Window.
- The parameter fixed_om_costs was renamed fixed_om so that the backend cvan recognize it.
- The time series upload line count was fixed and is now more accurate.
- The bug with tariff import always showing errors was fixed.

### DER-VET Python change log links
- [storageVET change log](https://github.com/epri-dev/StorageVET/blob/master/CHANGELOG.md)
- [DER-VET change log](https://github.com/epri-dev/DER-VET/blob/master/CHANGELOG.md)

## [1.0.0] - 2021-03-31
### Added
- All project files added. This is the first release.
