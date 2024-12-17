# Changelog
Notable changes to the DER-VET-GUI Project will be documented in this file.

Questions and feedback can be submitted to the Electric Power Research Institute (EPRI) from the Survey Monkey feedback linked on the DER-VET website (https://www.der-vet.com/software/).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [1.3.0] - 2024-12-02
### Added
- Adds 3 new pre-defined TAGWeb Use Cases
  - TAGWeb Use Cases will now load with a link to EPRI's TAGWeb site
  - the link to https://tagweb.epri.com/ appears
    when the imported project.json file has the parameter
    'isTagWebUseCase' set to true
  - 3 new TagWeb Use Cases (pre-defined) will load at the Summary Page,
    which has a clickable link to EPRI's TagWeb website.
- an optional project description field can now be saved with any text
- an optional technology description fields can now be saved with any text
- These descriptions will get saved when an Export Project is initiated.
  (they will become parameters in the project.json file)
### Changed
- Changes the forum link to a help-page link
  The forum is no longer functional.
  We now link to DER-VET's help page: der-vet.com/help/

## [1.2.3] - 2023-01-26
### Fixed
- removed non-functioning menu bar actions
- removed the box surrounding each Choose-File button
- made the Salvage-Value box larger in Battery
- activated the Cancel button in Import-Retail-Tariff
- resolve data not being displayed in the Financial Results chart
- the Load Coverage Probability plot (in Results--Reliability) will be labeled and shown as percent
- allow External Incentives to be entered for the Project Start Year
- properly set the binary model parameter based on the type of sizing being requested
- allow a Controllable Load Technology to be saved
### Added
- allow for more than one time series input from a given technology type
  - for example, two PV systems each with their own time series input
- add several standard model parameter inputs to Controllable Load Technology
### Changed
- disallow negative energy prices when DER-VET sizing is ON
  (however, note that the back-end code does allow this with a Warning)
  - change negative values to zero in both Sample DA Price Time Series CSV files
- allow decommissioning costs to be negative

## [1.2.2] - 2022-07-07
### Fixed
- set the default isRequired attribute to false for maxDuration
  - it becomes required only when sizing is ON

## [1.2.1] - 2022-05-04
## Added
- disable the setting of the battery duration_max parameter when NOT sizing the battery.
## Fixed
- allow import of project.json files created via the Export Project button

## [1.2.0] - 2022-03-30
## Added
- fuel costs are now handled in a project-wide fashion
  - adds a new Fuel Cost page in Finance
  - this new page will conditionally appear if there is a fuel-consuming technology active
  - user must set a fuel price for each fuel type that is called for (liquid, gas, and/or other)
  - a fuel-consuming technology will require a fuel_type be chosen
- version for project.json schema
- CalEnviroScreen updated for version 4.0 (released in October 2021)
## Changed
- updates to the README with better packaging steps
- updates the README with links to migration script
- the import and export of a project is now achieved via a single project.json file
- project.json files created from a previous GUI version are not compatible
  - if a user tries to use an older project.json, they are given a link to a Python script
    that lives in the dervet backend Python branch in a migrations/ folder
  - this new backend script will transform an older project.json file into one that
    is compatible with the GUI v1.2.0
- all technologies are now a single page to capture all inputs (parameters and csv data)
- major effort to refactor GUI validation of csv data
  - validates data in the same fashion for an uploaded csv, and a project.json import
  - now validates time series fields upon project import
- major effort to reduce code redundancies in a structured way
  - DRY button components
  - Reorder Component directory
  - consolidate wizard component functions in wizardFormMixin
- retail tariff billing periods are now replaced upon import of OpenEI data
- updated some parameters to match backend Python changes
## Fixed
- limit MACRS term allowed values to no greater than 20
- Reset battery includeSizeLimits properly
- Change fleet EV lost load cost units to $/kWh
- The name of the Lifetime Present Value Results plot png file was corrected

## [1.1.2] - 2021-09-09
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
- Fixed bug that was prevented saving the Minimum Power for a Diesel Generator Technology
- Fixed bug with Retail Tariff file Import

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
