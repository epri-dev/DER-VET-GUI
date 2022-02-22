import _ from 'lodash';

import * as c from '@/models/Project/constants';
import * as a from '@/models/Project/Metadata/AllowedValues/constants';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField';
import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';

export default class ProjectMetadata {
  [c.ANALYSIS_HORIZON]: ValueFieldMetadata = {
    displayName: 'Analysis Horizon',
    isRequired: true,
    type: Number,
    description: 'The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.',
    unit: 'years',
  };
  [c.ANALYSIS_HORIZON_MODE]: ValueFieldMetadata = {
    displayName: 'Analysis Horizon Mode',
    isRequired: true,
    type: String,
    description: 'Define when to end cost benefit analysis. Choose it yourself, or by the lifetimes of your equipment',
    allowedValues: a.ANALYSIS_HORIZON_MODES,
  };
  [c.DA_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Day Ahead Energy Prices',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.DATA_YEAR]: ValueFieldMetadata = {
    displayName: 'Data Year (Baseline)',
    isRequired: true,
    type: 'int',
    description: 'Commonly the project start year. Data for additional years will be escalated from this value.',
  };
  [c.DEFERRAL_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Deferral Load',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.DEFERRAL_PLANNED_LOAD_LIMIT]: ValueFieldMetadata = {
    displayName: 'Planned Load Limit',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'Maximum net import power flow from grid. Range: greater than or equal to 0',
  };
  [c.DEFERRAL_PRICE]: ValueFieldMetadata = {
    displayName: 'Yearly Cost Avoided',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / year',
    description: 'Yearly Cost Avoided for deferring a transmission and distribution asset upgrade',
  };
  [c.DEFERRAL_REVERSE_POWER_FLOW_LIMIT]: ValueFieldMetadata = {
    displayName: 'Reverse Power Flow Limit',
    isRequired: true,
    maxValue: 0,
    type: Number,
    unit: 'kW',
    description: 'Maximum net export power flow to grid Range: less than or equal to 0',
  };
  [c.DR_END_HOUR]: ValueFieldMetadata = {
    displayName: 'End Hour',
    isRequired: true,
    minValue: 2,
    maxValue: 24,
    type: 'int',
    unit: 'hour ending',
    description: 'Last hour of the Demand Response period.',
  };
  [c.DR_END_MODE]: ValueFieldMetadata = {
    displayName: 'How long will the event last?',
    isRequired: true,
    type: Boolean,
    defaultValue: true,
    description: 'Define the last hour of the event or the length of the event.',
    allowedValues: a.DR_END_MODES,
  };
  [c.DR_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Demand Response Awards',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.DR_NUMBER_EVENTS]: ValueFieldMetadata = {
    displayName: 'Number of Events',
    isRequired: true,
    minValue: 1,
    type: 'int',
    unit: 'days',
    description: 'How many demand response events are expected in one year?',
  };
  [c.DR_PROGRAM_TYPE]: ValueFieldMetadata = {
    displayName: 'Program Type',
    isRequired: true,
    type: String,
    description: 'Is the program participant notified of an event on the day of or a day in advance (day ahead)?',
    allowedValues: a.DR_PROGRAM_TYPES,
  };
  [c.DR_INCLUDE_WEEKENDS]: ValueFieldMetadata = {
    displayName: 'Weekends?',
    isRequired: true,
    type: Boolean,
    description: 'Is the program active on weekends?',
    allowedValues: a.YES_NO_OPTIONS,
  };
  [c.DR_EVENT_LENGTH]: ValueFieldMetadata = {
    displayName: 'Length of an event',
    isRequired: true,
    minValue: 1,
    maxValue: 24,
    type: 'int',
    unit: 'hours',
    description: 'How long is the event promised to last?',
  };
  [c.DR_START_HOUR]: ValueFieldMetadata = {
    displayName: 'Start Hour',
    isRequired: true,
    minValue: 1,
    maxValue: 23,
    type: 'int',
    unit: 'hour ending',
    description: 'Start hour of the Demand Response event',
  };
  [c.ENERGY_PRICE_SOURCE_WHOLESALE]: ValueFieldMetadata = {
    displayName: 'Energy Price Source',
    isRequired: true,
    type: Boolean,
    description: '<p>Will the project be reducing energy charges on a retail electricity bill?</p><p>Day ahead energy time shift.</p>',
    allowedValues: a.ENERGY_PRICE_SOURCE_WHOLESALE_OPTIONS,
  };
  [c.FINANCE_DISCOUNT_RATE]: ValueFieldMetadata = {
    displayName: 'Discount Rate (for discounted cash flow analysis)',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: '(Note: in the future, we will build calculators for this based on loan terms, return on equity, etc.)',
  };
  [c.FINANCE_FEDERAL_TAX_RATE]: ValueFieldMetadata = {
    displayName: 'Federal Tax Rate',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: '',
  };
  [c.FINANCE_INFLATION_RATE]: ValueFieldMetadata = {
    displayName: 'Inflation Rate',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: '',
  };
  [c.FINANCE_PROPERTY_TAX_RATE]: ValueFieldMetadata = {
    displayName: 'Property Tax Rate',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: '',
  };
  [c.FINANCE_STATE_TAX_RATE]: ValueFieldMetadata = {
    displayName: 'State Tax Rate',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: '',
  };
  [c.FR_COMBINED_MARKET]: ValueFieldMetadata = {
    displayName: 'Combined Market Requirement',
    isRequired: true,
    type: Boolean,
    description: 'If it is combined, regulation up will be provided in the same quantity as regulation down always.',
    allowedValues: a.YES_NO_OPTIONS,
  };
  [c.FR_DURATION]: ValueFieldMetadata = {
    displayName: 'Duration for Energy Reservation Requirements',
    isRequired: true,
    minValue: 0,
    maxValue: 24,
    type: Number,
    unit: 'hours',
    description: 'How much energy capability (kWh) should the DER mix reserve for each kW of participation in Frequency Regulation? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
  };
  [c.FR_ENERGY_PRICE_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Frequency Regulation Energy Price',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.FR_EOU]: ValueFieldMetadata = {
    displayName: 'Energy Option Up',
    isRequired: true,
    minValue: 0,
    maxValue: 1,
    type: Number,
    unit: 'kWh / kW-hr',
    description: 'Energy content of the automatic generation control (AGC) signal in the up direction',
  };
  [c.FR_EOD]: ValueFieldMetadata = {
    displayName: 'Energy Option Down',
    isRequired: true,
    minValue: 0,
    maxValue: 1,
    type: Number,
    unit: 'kWh / kW-hr',
    description: 'Energy content of the automatic generation control (AGC) signal in the down direction',
  };
  [c.FR_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Frequency Regulation Price',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.GRID_LOCATION]: ValueFieldMetadata = {
    displayName: 'Grid Domain',
    isRequired: true,
    type: String,
    description: 'Which grid domain or location the project will be connected to. Please refer to documentation for further guidance on which services are available in your selected domain.',
    allowedValues: a.GRID_LOCATIONS,
  };
  [c.INCLUDE_INTERCONNECTION_CONSTRAINTS]: ValueFieldMetadata = {
    displayName: 'Apply interconnection constraints',
    isRequired: true,
    type: Boolean,
    allowedValues: a.YES_NO_OPTIONS,
  };
  [c.LF_COMBINED_MARKET]: ValueFieldMetadata = {
    displayName: 'Combined Market Requirement',
    isRequired: true,
    type: Boolean,
    description: 'Is this a combined regulation market? If it is combined, regulation up will be provided in the same quantity as regulation down always.',
    allowedValues: a.YES_NO_OPTIONS,
  };
  [c.LF_DURATION]: ValueFieldMetadata = {
    displayName: 'Duration for Energy Reservation Requirements',
    isRequired: true,
    minValue: 0,
    maxValue: 24,
    type: Number,
    unit: 'hours',
    description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Load Following? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
  };
  [c.LF_ENERGY_PRICE_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Load Following Energy Price',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.LF_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Load Following Price',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.MAX_EXPORT]: ValueFieldMetadata = {
    displayName: 'Maximum Power Exported',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'Maximum magnitude that can flow from microgrid to grid through the point of interconnection',
  };
  [c.MAX_IMPORT]: ValueFieldMetadata = {
    displayName: 'Maximum Power Imported',
    isRequired: true,
    maxValue: 0,
    type: Number,
    unit: 'kW',
    description: 'Maximum magnitude that can flow from grid to microgrid through the point of interconnection',
  };
  [c.NAME]: ValueFieldMetadata = {
    displayName: 'Name',
    isRequired: true,
    type: String,
  };
  [c.NSR_DURATION]: ValueFieldMetadata = {
    displayName: 'Duration for Energy Reservation Requirements',
    isRequired: true,
    minValue: 0,
    maxValue: 24,
    type: Number,
    unit: 'hours',
    description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Non-Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
  };
  [c.NSR_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Non-Spinning Reserve Prices',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.OBJECTIVES_BACKUP_POWER]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_DA]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_DR]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_DEFERRAL]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_FR]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_LF]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_NSR]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_RA]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_RETAIL_ENERGY_CHARGE_REDUCTION]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_RETAIL_DEMAND_CHARGE_REDUCTION]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_RESILIENCE]: ValueFieldMetadata = {
    displayName: 'Reliability',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_SR]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OBJECTIVES_USER_DEFINED]: ValueFieldMetadata = {
    displayName: '',
    isRequired: true,
    type: Boolean,
    defaultValue: false,
  };
  [c.OPTIMIZATION_HORIZON]: ValueFieldMetadata = {
    displayName: 'Optimization Window',
    isRequired: true,
    type: String,
    description: 'We recommend:<br>- Month for Customer Services.<br>- Hours for Wholesale Services.<br>- Year to assume perfect forsight of an entire year.',
    allowedValues: a.OPTIMIZATION_HORIZONS,
  };
  [c.OPTIMIZATION_HORIZON_NUM]: ValueFieldMetadata = {
    displayName: 'How many hours per window?',
    isRequired: true,
    minValue: 2,
    type: Number,
    unit: 'hours',
    description: 'Range: 2-8760 (or 8784 in a leap year)',
  };
  [c.OUTPUT_DIRECTORY]: ValueFieldMetadata = {
    displayName: 'Outputs Directory',
    isRequired: false,
    type: String,
  };
  [c.OWNERSHIP]: ValueFieldMetadata = {
    displayName: 'Ownership',
    isRequired: true,
    type: String,
    description: 'Who owns the assets?',
    allowedValues: a.OWNERSHIP_OPTIONS,
  };
  [c.RA_NUMBER_EVENTS]: ValueFieldMetadata = {
    displayName: 'Number of Events',
    isRequired: true,
    minValue: 1,
    type: 'int',
    unit: 'days',
    description: 'How many times will a resource be called on to fulfill its resource adequacy obligation in one year?',
  };
  [c.RA_DISPATCH_MODE]: ValueFieldMetadata = {
    displayName: 'Dispatch Mode',
    isRequired: true,
    type: Boolean,
    description: 'How should the DERs dispatch in response to the program?',
    allowedValues: a.RA_DISPATCH_MODES,
  };
  [c.RA_EVENT_SELECTION_METHOD]: ValueFieldMetadata = {
    displayName: 'Event Selection Method',
    isRequired: true,
    type: String,
    description: 'Based on the system load, how are resource adequacy events selected?',
    allowedValues: a.RA_EVENT_SELECTION_METHODS,
  };
  [c.RA_EVENT_LENGTH]: ValueFieldMetadata = {
    displayName: 'Duration of Events',
    isRequired: true,
    minValue: 1,
    maxValue: 24,
    type: 'int',
    unit: 'hours',
    description: 'How long will a resource adequacy event last for?',
  };
  [c.RA_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Resource Adequacy Awards',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.RELIABILITY_MAX_OUTAGE_DURATION]: ValueFieldMetadata = {
    displayName: 'Maximum Outage Duration to Plot',
    isRequired: true,
    minValue: 1,
    type: 'int',
    unit: 'hours',
    description: 'Calculate the post-facto reliability for an outage that can last up to this many hours',
  };
  [c.RELIABILITY_POST_OPTIMIZATION_ONLY]: ValueFieldMetadata = {
    displayName: 'Objective',
    isRequired: true,
    type: Boolean,
    description: 'How should we consider reliability in our analysis?',
    allowedValues: a.RELIABILITY_POST_OPTIMIZATION_ONLY_OPTIONS,
  };
  [c.RELIABILITY_TARGET]: ValueFieldMetadata = {
    displayName: 'Hours of guaranteed outage coverage',
    isRequired: true,
    minValue: 1,
    type: Number,
    unit: 'hours',
    description: 'How many hours of guaranteed outage coverage does the project need to supply based on the load?',
  };
  [c.SIZING_EQUIPMENT]: ValueFieldMetadata = {
    displayName: 'Size equipment in microgrid',
    description: 'Are there any microgrid components that you want to optimally size for?',
    isRequired: true,
    type: Boolean,
    allowedValues: a.YES_NO_OPTIONS,
  };
  [c.SR_DURATION]: ValueFieldMetadata = {
    displayName: 'Duration for Energy Reservation Requirements',
    isRequired: true,
    minValue: 0,
    maxValue: 24,
    type: Number,
    unit: 'hours',
    description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
  };
  [c.SR_GROWTH]: ValueFieldMetadata = {
    displayName: 'Growth Rate of Spinning Reserve Prices',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '% / year',
    description: c.GROWTH_RATE_DESCRIPTION,
  };
  [c.START_YEAR]: ValueFieldMetadata = {
    displayName: 'Start Year',
    isRequired: true,
    type: 'int',
    description: 'Year the project starts.',
  };
  [c.TIMESTEP]: ValueFieldMetadata = {
    displayName: 'Timestep',
    isRequired: true,
    type: String,
    unit: 'minutes',
    description: 'What is the frequency of the time-series data?',
    allowedValues: a.TIMESTEPS,
  };
  [c.USER_INFEASIBLE]: ValueFieldMetadata = {
    type: Object,
  };
  [c.USER_PRICE]: ValueFieldMetadata = {
    displayName: 'Yearly Cost Avoided',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / year',
    description: 'What is the value for meeting the user-defined constraints?',
  };
  // ts: timeseries
  [c.TS_CRITICAL_LOAD]: TimeSeriesFieldMetadata = {
    displayName: 'critical load',
    columnHeaderName: 'Critical Load (kW)',
    sampleDataFileName: 'CriticalLoad',
    tsName: c.TS_CRITICAL_LOAD,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_DA_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'day ahead price',
    columnHeaderName: 'DA Price ($/kWh)',
    sampleDataFileName: 'DAPrice',
    tsName: c.TS_DA_PRICE,
    unit: '$/kWh',
    isMonthly: false,
  };
  [c.TS_DEFERRAL_LOAD]: TimeSeriesFieldMetadata = {
    displayName: 'deferral load',
    columnHeaderName: 'Deferral Load (kW)',
    sampleDataFileName: 'DeferralLoad',
    tsName: c.TS_DEFERRAL_LOAD,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_FR_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'frequency regulation price',
    columnHeaderName: 'FR Price ($/kW)',
    sampleDataFileName: 'FRPrice',
    tsName: c.TS_FR_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_FR_UP_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'frequency regulation up price',
    columnHeaderName: 'Reg Up Price ($/kW)',
    sampleDataFileName: 'FRUpPrice',
    tsName: c.TS_FR_UP_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_FR_DOWN_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'frequency regulation down price',
    columnHeaderName: 'Reg Down Price ($/kW)',
    sampleDataFileName: 'FRDownPrice',
    tsName: c.TS_FR_DOWN_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_LF_EOD]: TimeSeriesFieldMetadata = {
    displayName: 'energy option down',
    columnHeaderName: 'LF Energy Option Down (kWh/kW-hr)',
    sampleDataFileName: 'LFEnergyOptionDown',
    tsName: c.TS_LF_EOD,
    unit: 'kWh/kW-hr',
    isMonthly: false,
  };
  [c.TS_LF_EOU]: TimeSeriesFieldMetadata = {
    displayName: 'energy option up',
    columnHeaderName: 'LF Energy Option Up (kWh/kW-hr)',
    sampleDataFileName: 'LFEnergyOptionUp',
    tsName: c.TS_LF_EOU,
    unit: 'kWh/kW-hr',
    isMonthly: false,
  };
  [c.TS_LF_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'load following price',
    columnHeaderName: 'LF Price ($/kW)',
    sampleDataFileName: 'LFPrice',
    tsName: c.TS_LF_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_LF_DOWN_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'load following down price',
    columnHeaderName: 'LF Down Price ($/kW)',
    sampleDataFileName: 'LFDownPrice',
    tsName: c.TS_LF_DOWN_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_LF_UP_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'load following up price',
    columnHeaderName: 'LF Up Price ($/kW)',
    sampleDataFileName: 'LFUpPrice',
    tsName: c.TS_LF_UP_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_NSR_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'non-spinning reserve price',
    columnHeaderName: 'NSR Price ($/kW)',
    sampleDataFileName: 'NSRPrice',
    tsName: c.TS_NSR_PRICE,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_RA_ACTIVE]: TimeSeriesFieldMetadata = {
    displayName: 'if the resource adequacy event selection considers the load (1) or not (0)',
    columnHeaderName: 'RA Active (y/n)',
    sampleDataFileName: 'RAActive',
    tsName: c.TS_RA_ACTIVE,
    unit: 'y/n',
    isMonthly: false,
  };
  [c.TS_SITE_LOAD]: TimeSeriesFieldMetadata = {
    displayName: 'site load',
    columnHeaderName: 'Site Load (kW)',
    sampleDataFileName: 'SiteLoad',
    tsName: c.TS_SITE_LOAD,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_SR_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'spinning reserve price',
    columnHeaderName: 'SR Price ($/kW)',
    sampleDataFileName: 'SRPrice',
    tsName: c.TS_SR_PRICE,
    unit: '$/kW',
    isMonthly: false,
  };
  [c.TS_SYSTEM_LOAD]: TimeSeriesFieldMetadata = {
    displayName: 'system load',
    columnHeaderName: 'System Load (kW)',
    sampleDataFileName: 'SystemLoad',
    tsName: c.TS_SYSTEM_LOAD,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_USER_POWER_EXPORT_MAX]: TimeSeriesFieldMetadata = {
    displayName: 'maximum power export',
    columnHeaderName: 'POI: Max Export (kW)',
    sampleDataFileName: 'UserPowerExportMax',
    tsName: c.TS_USER_POWER_EXPORT_MAX,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_USER_ENERGY_MAX]: TimeSeriesFieldMetadata = {
    displayName: 'maximum energy',
    columnHeaderName: 'Aggregate Energy Max (kWh)',
    sampleDataFileName: 'UserEnergyMax',
    tsName: c.TS_USER_ENERGY_MAX,
    unit: 'kWh',
    isMonthly: false,
  };
  [c.TS_USER_ENERGY_MIN]: TimeSeriesFieldMetadata = {
    displayName: 'minimum energy',
    columnHeaderName: 'Aggregate Energy Min (kWh)',
    sampleDataFileName: 'UserEnergyMin',
    tsName: c.TS_USER_ENERGY_MIN,
    unit: 'kWh',
    isMonthly: false,
  };
  [c.TS_USER_POWER_EXPORT_MIN]: TimeSeriesFieldMetadata = {
    displayName: 'minimum power export',
    columnHeaderName: 'POI: Min Export (kW)',
    sampleDataFileName: 'UserPowerExportMin',
    tsName: c.TS_USER_POWER_EXPORT_MIN,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_USER_POWER_IMPORT_MAX]: TimeSeriesFieldMetadata = {
    displayName: 'maximum power import',
    columnHeaderName: 'POI: Max Import (kW)',
    sampleDataFileName: 'UserPowerImportMax',
    tsName: c.TS_USER_POWER_IMPORT_MAX,
    unit: 'kW',
    isMonthly: false,
  };
  [c.TS_USER_POWER_IMPORT_MIN]: TimeSeriesFieldMetadata = {
    displayName: 'minimum power import',
    columnHeaderName: 'POI: Min Import (kW)',
    sampleDataFileName: 'UserPowerImportMin',
    tsName: c.TS_USER_POWER_IMPORT_MIN,
    unit: 'kW',
    isMonthly: false,
  };
  // mts: monthly timeseries
  [c.MTS_BACKUP_ENERGY_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'award for reserving backup power',
    columnHeaderName: 'Backup Price ($/kWh)',
    sampleDataFileName: 'BackupEnergyPrice',
    tsName: c.MTS_BACKUP_ENERGY_PRICE,
    unit: '$/kWh',
    isMonthly: true,
  };
  [c.MTS_BACKUP_ENERGY_RESERVATION]: TimeSeriesFieldMetadata = {
    displayName: 'amount of energy to constantly reserve',
    columnHeaderName: 'Backup Energy ($/kWh)',
    sampleDataFileName: 'BackupEnergyReservation',
    tsName: c.MTS_BACKUP_ENERGY_RESERVATION,
    unit: '$/kWh',
    isMonthly: true,
  };
  [c.MTS_DR_CAPACITY_RESERVATION]: TimeSeriesFieldMetadata = {
    displayName: 'power that will be committed to the demand response program',
    columnHeaderName: 'DR Capacity (kW)',
    sampleDataFileName: 'DRCapacityReservation',
    tsName: c.MTS_DR_CAPACITY_RESERVATION,
    unit: 'kW',
    isMonthly: true,
  };
  [c.MTS_DR_CAPACITY_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'award for reducing demand during demand response events',
    columnHeaderName: 'DR Capacity Price ($/kW)',
    sampleDataFileName: 'DRCapacityPrice',
    tsName: c.MTS_DR_CAPACITY_PRICE,
    unit: '$/kW',
    isMonthly: true,
  };
  [c.MTS_DR_ENERGY_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'award for reducing energy consumption during demand response events',
    columnHeaderName: 'DR Energy Price ($/kWh)',
    sampleDataFileName: 'DREnergyPrice',
    tsName: c.MTS_DR_ENERGY_PRICE,
    unit: '$/kWh',
    isMonthly: true,
  };
  [c.MTS_RA_CAPACITY_PRICE]: TimeSeriesFieldMetadata = {
    displayName: 'resource adequacy capacity prices',
    columnHeaderName: 'RA Capacity Price ($/kW)',
    sampleDataFileName: 'RACapacityPrice',
    tsName: c.MTS_RA_CAPACITY_PRICE,
    unit: '$/kW',
    isMonthly: true,
  };
  [c.MTS_DR_MONTHS_APPLIED]: TimeSeriesFieldMetadata = {
    defaultValue: _.fill(Array(12), 0),
    displayName: '',
    columnHeaderName: 'DR Months (y/n)',
    sampleDataFileName: 'DRMonthsApplied',
    tsName: c.MTS_DR_MONTHS_APPLIED,
    unit: 'y/n',
    isMonthly: true,
  };
}
