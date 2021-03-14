import { v4 as uuidv4 } from 'uuid';

import * as c from '@/models/Project/constants';
import * as a from '@/store/actionTypes';
import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import operateOnKeysList from '@/util/object';

/*
import DRCapacityAdwardsMonthly from '@/models/Monthly/DRCapacityAdwardsMonthly';
import DRCapacityReservationMonthly from '@/models/Monthly/DRCapacityReservationMonthly';
import DREnergyAwardsMonthly from '@/models/Monthly/DREnergyAwardsMonthly';
import DRMonthsMonthly from '@/models/Monthly/DRMonthsMonthly';
*/

import CriticalLoadTimeSeries from '@/models/TimeSeries/CriticalLoadTimeSeries';
import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
import LFDownPriceTimeSeries from '@/models/TimeSeries/LFDownPriceTimeSeries';
import LFEnergyOptionDownTimeSeries from '@/models/TimeSeries/LFEnergyOptionDownTimeSeries';
import LFEnergyOptionUpTimeSeries from '@/models/TimeSeries/LFEnergyOptionUpTimeSeries';
import LFPriceTimeSeries from '@/models/TimeSeries/LFPriceTimeSeries';
import LFUpPriceTimeSeries from '@/models/TimeSeries/LFUpPriceTimeSeries';
import NSRPriceTimeSeries from '@/models/TimeSeries/NSRPriceTimeSeries';
import RAActiveTimeSeries from '@/models/TimeSeries/RAActiveTimeSeries';
import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
import SystemLoadTimeSeries from '@/models/TimeSeries/SystemLoadTimeSeries';
import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';

import RACapacityPriceMonthly from '@/models/Monthly/RACapacityPriceMonthly';
import BackupEnergyPriceMonthly from '@/models/Monthly/BackupEnergyPriceMonthly';
import BackupEnergyReservationMonthly from '@/models/Monthly/BackupEnergyReservationMonthly';

export class ProjectMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  // TODO LL: would return a Project
  getDefaultValues() {
    return {
      storeType: c.PROJECT,
      drMonthsAppliedLabels: [],
      energyPriceSourceWholesale: null,
      id: uuidv4(),
      includeSiteLoad: false,
      includeSystemLoad: false,
      listOfActiveServices: [],
      objectivesBackupPower: false,
      objectivesDA: false,
      objectivesDR: false,
      objectivesDeferral: false,
      objectivesFR: false,
      objectivesLF: false,
      objectivesNSR: false,
      objectivesRA: false,
      objectivesRetailEnergyChargeReduction: false,
      objectivesRetailDemandChargeReduction: false,
      objectivesResilience: false,
      objectivesSR: false,
      objectivesUserDefined: false,
      ...this.operateOnFieldList(c.START_PROJECT_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.OBJECTIVE_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.SITE_INFORMATION_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.DEFERRAL_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.FR_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.NSR_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.RESILIENCE_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.SR_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.USER_DEFINED_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.DA_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.FINANCE_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.LF_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.RESOURCE_ADEQUACY_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.DEMAND_RESPONSE_FIELDS, f => f.defaultValue),
      ...this.operateOnFieldList(c.TS_ALL, f => new f.DataModel([])),
      ...this.operateOnFieldList(c.MTS_ALL, f => new f.DataModel([])),

      // MONTHLY ARRAYS
      drMonthsApplied: null,
      drCapacityReservation: null,
      drCapacityAwards: null,
      drEnergyAwards: null,
    };
  }

  getValidationSchema(fieldList) {
    return this.operateOnFieldList(fieldList, f => f.toValidationSchema());
  }

  operateOnFieldList(fieldList, callback) {
    return operateOnKeysList(this, fieldList, callback);
  }

  static getHardcodedMetadata() {
    return new ProjectMetadata({
      [c.ANALYSIS_HORIZON]: new ProjectFieldMetadata({
        displayName: 'Analysis Horizon',
        isRequired: true,
        type: Number,
        description: 'The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.',
        unit: 'years',
      }),
      [c.ANALYSIS_HORIZON_MODE]: new ProjectFieldMetadata({
        displayName: 'Analysis Horizon Mode',
        isRequired: true,
        type: String,
        description: 'Defines when/how to end CBA analysis.',
        allowedValues: c.ANALYSIS_HORIZON_MODE_ALLOWED_VALUES,
      }),
      [c.DA_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Day Ahead Energy Prices',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'What is the growth rate of Day Ahead Energy Price?',
        actionSetName: a.SET_DA_GROWTH,
      }),
      [c.DATA_YEAR]: new ProjectFieldMetadata({
        displayName: 'Data Year',
        isRequired: true,
        type: 'int',
        description: 'Wizard mode only allows one year of data. If the year this data comes from is different from the year the optimization is run against, it will be escalated from the data year to the optimization year.',
      }),
      [c.DEFERRAL_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Deferral Load',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'What is the growth rate of the deferral load?',
        actionSetName: a.SET_DEFERRAL_GROWTH,
      }),
      [c.DEFERRAL_PLANNED_LOAD_LIMIT]: new ProjectFieldMetadata({
        displayName: 'Planned Load Limit',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Max net import power flow to grid',
        actionSetName: a.SET_DEFERRAL_PLANNED_LOAD_LIMIT,
      }),
      [c.DEFERRAL_PRICE]: new ProjectFieldMetadata({
        displayName: 'Yearly Cost Avoided',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / year',
        description: 'Yearly Cost Avoided for deferring a T and D asset upgrade',
        actionSetName: a.SET_DEFERRAL_PRICE,
      }),
      [c.DEFERRAL_REVERSE_POWER_FLOW_LIMIT]: new ProjectFieldMetadata({
        displayName: 'Reverse Power Flow Limit',
        isRequired: true,
        maxValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Max net export power flow to grid',
        actionSetName: a.SET_DEFERRAL_REVERSE_POWER_FLOW_LIMIT,
      }),
      [c.DR_END_HOUR]: new ProjectFieldMetadata({
        displayName: 'End Hour',
        isRequired: true,
        minValue: 2,
        maxValue: 24,
        type: 'int',
        unit: 'he',
        description: 'Last hour of the Demand Response period.',
      }),
      [c.DR_END_MODE]: new ProjectFieldMetadata({
        displayName: 'How long will the event last?',
        isRequired: true,
        type: Boolean,
        defaultValue: true,
        description: 'Define the last hour of the event or the length of the event.',
        allowedValues: c.DR_END_MODE_ALLOWED_VALUES,
      }),
      [c.DR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Demand Response Awards',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'Yearly growth rate to apply to awards?',
      }),
      [c.DR_NUMBER_EVENTS]: new ProjectFieldMetadata({
        displayName: 'Number of Events',
        isRequired: true,
        minValue: 1,
        type: 'int',
        unit: 'days',
        description: 'How many demand response events are expected in one year?',
      }),
      [c.DR_PROGRAM_TYPE]: new ProjectFieldMetadata({
        displayName: 'Program Type',
        isRequired: true,
        type: String,
        description: 'Is the program participant notified of an event on the day of or a day in advance (day ahead)?',
        allowedValues: c.DR_PROGRAM_TYPE_ALLOWED_VALUES,
      }),
      [c.DR_INCLUDE_WEEKENDS]: new ProjectFieldMetadata({
        displayName: 'Weekends?',
        isRequired: true,
        type: Boolean,
        description: 'Is the program active on weekends?',
        allowedValues: c.optionsYN,
      }),
      [c.DR_EVENT_LENGTH]: new ProjectFieldMetadata({
        displayName: 'Length of an event',
        isRequired: true,
        minValue: 1,
        maxValue: 24,
        type: 'int',
        unit: 'hours',
        description: 'How long is the event promised to last?',
      }),
      [c.DR_START_HOUR]: new ProjectFieldMetadata({
        displayName: 'Start Hour',
        isRequired: true,
        minValue: 1,
        maxValue: 23,
        type: 'int',
        unit: 'he',
        description: 'Start hour of the Demand Response period',
      }),
      [c.ENERGY_PRICE_SOURCE_WHOLESALE]: new ProjectFieldMetadata({
        displayName: 'Energy Price Source',
        isRequired: true,
        type: Boolean,
        description: '<p>Will the project be reducing energy charges on a retail electricity bill?</p><p>Day ahead energy time shift.</p>',
        allowedValues: c.ENERGY_PRICE_SOURCE_WHOLESALE_ALLOWED_VALUES,
      }),
      [c.FINANCE_DISCOUNT_RATE]: new ProjectFieldMetadata({
        displayName: 'Discount Rate (for discounted cash flow analysis)',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'What is the discount rate to be used in the financial analysis? (Note: in the future, we will build calculators for this based on loan terms, return on equity, etc.)',
      }),
      [c.FINANCE_FEDERAL_TAX_RATE]: new ProjectFieldMetadata({
        displayName: 'Federal Tax Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: '',
      }),
      [c.FINANCE_INFLATION_RATE]: new ProjectFieldMetadata({
        displayName: 'Inflation Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'What is the inflation rate to be used in the financial analysis?',
      }),
      [c.FINANCE_PROPERTY_TAX_RATE]: new ProjectFieldMetadata({
        displayName: 'Property Tax Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: '',
      }),
      [c.FINANCE_STATE_TAX_RATE]: new ProjectFieldMetadata({
        displayName: 'State Tax Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: '',
      }),
      [c.FR_COMBINED_MARKET]: new ProjectFieldMetadata({
        displayName: 'Combined Market Requirement',
        isRequired: true,
        type: Boolean,
        description: 'Is this a combined regulation market? If it is combined, regulation up will be provided in the same quantity as regulation down always.',
        allowedValues: c.FR_COMBINED_MARKET_ALLOWED_VALUES,
        actionSetName: a.SET_FR_COMBINED_MARKET,
      }),
      [c.FR_DURATION]: new ProjectFieldMetadata({
        displayName: 'Duration for Energy Reservation Requirements',
        isRequired: true,
        minValue: 0,
        maxValue: 24,
        type: Number,
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Frequency Regulation? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
        actionSetName: a.SET_FR_DURATION,
      }),
      [c.FR_ENERGY_PRICE_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Frequency Regulation Energy Price',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'Yearly growth rate to apply to the value of energy',
        actionSetName: a.SET_FR_ENERGY_PRICE_GROWTH,
      }),
      [c.FR_EOU]: new ProjectFieldMetadata({
        displayName: 'Energy Option Up',
        isRequired: true,
        minValue: 0,
        maxValue: 1,
        type: Number,
        unit: 'kWh / kW-hr',
        description: 'Energy content of the AGC signal in the up direction',
        actionSetName: a.SET_FR_EOU,
      }),
      [c.FR_EOD]: new ProjectFieldMetadata({
        displayName: 'Energy Option Down',
        isRequired: true,
        minValue: 0,
        maxValue: 1,
        type: Number,
        unit: 'kWh / kW-hr',
        description: 'Energy content of the AGC signal in the down direction',
        actionSetName: a.SET_FR_EOD,
      }),
      [c.FR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Frequency Regulation Price',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'Yearly growth rate to apply to regulation prices?',
        actionSetName: a.SET_FR_GROWTH,
      }),
      [c.GRID_LOCATION]: new ProjectFieldMetadata({
        displayName: 'Grid Domain',
        isRequired: true,
        type: String,
        description: 'Which grid domain or location the project will be connected to. This determines which services are available.',
        allowedValues: c.GRID_LOCATION_ALLOWED_VALUES,
      }),
      [c.INCLUDE_INTERCONNECTION_CONSTRAINTS]: new ProjectFieldMetadata({
        displayName: 'Apply interconnection constraints',
        isRequired: true,
        type: Boolean,
        allowedValues: c.INCLUDE_INTERCONNECTION_CONSTRAINTS_ALLOWED_VALUES,
        actionSetName: a.SET_INCLUDE_POI_CONSTRAINTS,
      }),
      [c.LF_COMBINED_MARKET]: new ProjectFieldMetadata({
        displayName: 'Combined Market Requirement',
        isRequired: true,
        type: Boolean,
        description: 'Is this a combined regulation market? If it is combined, regulation up will be provided in the same quantity as regulation down always.',
        allowedValues: c.FR_COMBINED_MARKET_ALLOWED_VALUES,
        actionSetName: a.SET_LF_COMBINED_MARKET,
      }),
      [c.LF_DURATION]: new ProjectFieldMetadata({
        displayName: 'Duration for Energy Reservation Requirements',
        isRequired: true,
        minValue: 0,
        maxValue: 24,
        type: Number,
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Load Following? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
        actionSetName: a.SET_LF_DURATION,
      }),
      [c.LF_ENERGY_PRICE_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Load Following Energy Price',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'Yearly growth rate to apply to the value of energy',
        actionSetName: a.SET_LF_ENERGY_PRICE_GROWTH,
      }),
      [c.LF_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Load Following Price',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'Yearly growth rate to apply to regulation prices?',
        actionSetName: a.SET_LF_GROWTH,
      }),
      [c.MAX_EXPORT]: new ProjectFieldMetadata({
        displayName: 'Maximum Power Exported',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum magnitude that can flow from microgrid to grid through the point of interconnection',
        actionSetName: a.SET_MAX_EXPORT_TO_GRID,
      }),
      [c.MAX_IMPORT]: new ProjectFieldMetadata({
        displayName: 'Maximum Power Imported',
        isRequired: true,
        maxValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum magnitude that can flow from grid to microgrid through the point of interconnection',
        actionSetName: a.SET_MAX_IMPORT_FROM_GRID,
      }),
      [c.NAME]: new ProjectFieldMetadata({
        displayName: 'Name',
        isRequired: true,
        type: String,
      }),
      [c.NSR_DURATION]: new ProjectFieldMetadata({
        displayName: 'Duration for Energy Reservation Requirements',
        isRequired: true,
        minValue: 0,
        maxValue: 24,
        type: Number,
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Non-Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
        actionSetName: a.SET_NSR_DURATION,
      }),
      [c.NSR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Non-Spinning Reserve Prices',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'What is the growth rate of Non-Spinning Reserve Price?',
        actionSetName: a.SET_NSR_GROWTH,
      }),
      [c.OPTIMIZATION_HORIZON]: new ProjectFieldMetadata({
        displayName: 'Optimization Window',
        isRequired: true,
        type: String,
        description: 'A month-long optimization window is recommended for Customer Services. A specific number of hours is recommended for Wholesale Services.',
        allowedValues: c.OPTIMIZATION_HORIZON_ALLOWED_VALUES,
      }),
      [c.OPTIMIZATION_HORIZON_NUM]: new ProjectFieldMetadata({
        displayName: 'Optimization Hours',
        isRequired: true,
        minValue: 2,
        type: Number,
        unit: 'hours',
        description: 'Range: 2-8760 (or 8784 in a leap year)',
      }),
      [c.OUTPUT_DIRECTORY]: new ProjectFieldMetadata({
        displayName: 'Outputs Directory',
        isRequired: false,
        type: String,
      }),
      [c.OWNERSHIP]: new ProjectFieldMetadata({
        displayName: 'Ownership',
        isRequired: true,
        type: String,
        description: 'Who owns the assets.',
        allowedValues: c.OWNERSHIP_ALLOWED_VALUES,
      }),
      [c.RA_NUMBER_EVENTS]: new ProjectFieldMetadata({
        displayName: 'Number of Events',
        isRequired: true,
        minValue: 1,
        type: 'int',
        unit: 'days',
        description: 'How many times will a resource be called on to fulfill its resource adequacy obligation in one year?',
        actionSetName: a.SET_RA_NUMBER_EVENTS,
      }),
      [c.RA_DISPATCH_MODE]: new ProjectFieldMetadata({
        displayName: 'Dispatch Mode',
        isRequired: true,
        type: Boolean,
        description: 'How should the DERs dispatch in response to the program?',
        allowedValues: c.RA_DISPATCH_MODE_ALLOWED_VALUES,
        actionSetName: a.SET_RA_DISPATCH_MODE,
      }),
      [c.RA_EVENT_SELECTION_METHOD]: new ProjectFieldMetadata({
        displayName: 'Event Selection Method',
        isRequired: true,
        type: String,
        description: 'Based on the system load, how are resource adequacy events selected?',
        allowedValues: c.RA_EVENT_SELECTION_METHOD_ALLOWED_VALUES,
        actionSetName: a.SET_RA_EVENT_SELECTION_METHOD,
      }),
      [c.RA_EVENT_LENGTH]: new ProjectFieldMetadata({
        displayName: 'Duration of Events',
        isRequired: true,
        minValue: 1,
        maxValue: 24,
        type: 'int',
        unit: 'hours',
        description: 'How long will a resource adequacy event last for?',
        actionSetName: a.SET_RA_EVENT_LENGTH,
      }),
      [c.RA_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Resource Adequacy Awards',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'Yearly growth rate to apply to awards?',
        actionSetName: a.SET_RA_GROWTH,
      }),
      [c.RELIABILITY_MAX_OUTAGE_DURATION]: new ProjectFieldMetadata({
        displayName: 'Maximum Outage Duration to Plot',
        isRequired: true,
        minValue: 1,
        type: 'int',
        unit: 'hours',
        description: 'Calculate the post-facto reliability for an outage that can last up to this many hours',
        actionSetName: a.SET_RELIABILITY_MAX_OUTAGE_DURATION,
      }),
      [c.RELIABILITY_POST_OPTIMIZATION_ONLY]: new ProjectFieldMetadata({
        displayName: 'Objective',
        isRequired: true,
        type: Boolean,
        description: 'How should we consider reliability in our analysis?',
        allowedValues: c.RELIABILITY_POST_OPTIMIZATION_ONLY_ALLOWED_VALUES,
        actionSetName: a.SET_RELIABILITY_POST_OPTIMIZATION_ONLY,
      }),
      [c.RELIABILITY_TARGET]: new ProjectFieldMetadata({
        displayName: 'Hours of guaranteed outage coverage',
        isRequired: true,
        minValue: 1,
        type: Number,
        unit: 'hours',
        description: 'How many hours of guaranteed outage coverage does the project need to supply based on the load?',
        actionSetName: a.SET_RELIABILITY_TARGET,
      }),
      [c.SIZING_EQUIPMENT]: new ProjectFieldMetadata({
        displayName: 'Size equipment in microgrid',
        description: 'Are there any microgrid components that you want DER-VET to optimally size for?',
        isRequired: true,
        type: Boolean,
        allowedValues: c.SIZING_EQUIPMENT_ALLOWED_VALUES,
      }),
      [c.SR_DURATION]: new ProjectFieldMetadata({
        displayName: 'Duration for Energy Reservation Requirements',
        isRequired: true,
        minValue: 0,
        maxValue: 24,
        type: Number,
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
        actionSetName: a.SET_SR_DURATION,
      }),
      [c.SR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Spinning Reserve Prices',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '% / year',
        description: 'What is the growth rate of Spinning Reserve Price?',
        actionSetName: a.SET_SR_GROWTH,
      }),
      [c.START_YEAR]: new ProjectFieldMetadata({
        displayName: 'Start Year',
        isRequired: true,
        type: 'int',
        description: 'Year the project starts.',
      }),
      [c.TIMESTEP]: new ProjectFieldMetadata({
        displayName: 'Timestep',
        isRequired: true,
        type: String,
        unit: 'minutes',
        description: 'What timestep will the optimization will use?',
        allowedValues: c.TIMESTEP_ALLOWED_VALUES,
      }),
      [c.USER_PRICE]: new ProjectFieldMetadata({
        displayName: 'Yearly Cost Avoided',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / year',
        description: 'Yearly Cost Avoided for meeting the user-defined constraints',
        actionSetName: a.SET_USER_PRICE,
      }),
      // ts: timeseries
      [c.TS_CRITICAL_LOAD]: new ProjectFieldMetadata({
        DataModel: CriticalLoadTimeSeries,
        displayName: 'critical load',
        actionSetName: a.SET_CRITICAL_LOAD,
      }),
      [c.TS_DA_PRICE]: new ProjectFieldMetadata({
        DataModel: DAPriceTimeSeries,
        displayName: 'day ahead price',
        actionSetName: a.SET_DA_PRICE,
      }),
      [c.TS_DEFERRAL_LOAD]: new ProjectFieldMetadata({
        DataModel: DeferralLoadTimeSeries,
        displayName: 'deferral load',
        actionSetName: a.SET_DEFERRAL_LOAD,
      }),
      [c.TS_FR_DOWN_PRICE]: new ProjectFieldMetadata({
        DataModel: FRDownPriceTimeSeries,
        displayName: 'frequency regulation down price',
        actionSetName: a.SET_FR_DOWN_PRICE,
      }),
      [c.TS_FR_PRICE]: new ProjectFieldMetadata({
        DataModel: FRPriceTimeSeries,
        displayName: 'frequency regulation price',
        actionSetName: a.SET_FR_PRICE,
      }),
      [c.TS_FR_UP_PRICE]: new ProjectFieldMetadata({
        DataModel: FRUpPriceTimeSeries,
        displayName: 'frequency regulation up price',
        actionSetName: a.SET_FR_UP_PRICE,
      }),
      [c.TS_LF_DOWN_PRICE]: new ProjectFieldMetadata({
        DataModel: LFDownPriceTimeSeries,
        displayName: 'load following down price',
        actionSetName: a.SET_LF_DOWN_PRICE,
      }),
      [c.TS_LF_EOU]: new ProjectFieldMetadata({
        DataModel: LFEnergyOptionUpTimeSeries,
        displayName: 'energy option up',
        actionSetName: a.SET_LF_EOU,
      }),
      [c.TS_LF_EOD]: new ProjectFieldMetadata({
        DataModel: LFEnergyOptionDownTimeSeries,
        displayName: 'energy option down',
        actionSetName: a.SET_LF_EOD,
      }),
      [c.TS_LF_PRICE]: new ProjectFieldMetadata({
        DataModel: LFPriceTimeSeries,
        displayName: 'load following price',
        actionSetName: a.SET_LF_PRICE,
      }),
      [c.TS_LF_UP_PRICE]: new ProjectFieldMetadata({
        DataModel: LFUpPriceTimeSeries,
        displayName: 'load following up price',
        actionSetName: a.SET_LF_UP_PRICE,
      }),
      [c.TS_NSR_PRICE]: new ProjectFieldMetadata({
        DataModel: NSRPriceTimeSeries,
        displayName: 'non-spinning reserve price',
        actionSetName: a.SET_NSR_PRICE,
      }),
      [c.TS_RA_ACTIVE]: new ProjectFieldMetadata({
        DataModel: RAActiveTimeSeries,
        displayName: 'if the resource adequacy event selection considers the load (1) or not (0)',
        actionSetName: a.SET_RA_ACTIVE,
      }),
      [c.TS_SITE_LOAD]: new ProjectFieldMetadata({
        DataModel: SiteLoadTimeSeries,
        displayName: 'site load',
        actionSetName: a.SET_SITE_LOAD,
      }),
      [c.TS_SR_PRICE]: new ProjectFieldMetadata({
        DataModel: SRPriceTimeSeries,
        displayName: 'spinning reserve price',
        actionSetName: a.SET_SR_PRICE,
      }),
      [c.TS_SYSTEM_LOAD]: new ProjectFieldMetadata({
        DataModel: SystemLoadTimeSeries,
        displayName: 'system load',
        actionSetName: a.SET_SYSTEM_LOAD,
      }),
      [c.TS_USER_ENERGY_MAX]: new ProjectFieldMetadata({
        DataModel: UserEnergyMaxTimeSeries,
        displayName: 'maximum energy',
        actionSetName: a.SET_USER_ENERGY_MAX,
      }),
      [c.TS_USER_ENERGY_MIN]: new ProjectFieldMetadata({
        DataModel: UserEnergyMinTimeSeries,
        displayName: 'minimum energy',
        actionSetName: a.SET_USER_ENERGY_MIN,
      }),
      [c.TS_USER_POWER_MAX]: new ProjectFieldMetadata({
        DataModel: UserPowerMaxTimeSeries,
        displayName: 'maximum power',
        actionSetName: a.SET_USER_POWER_MAX,
      }),
      [c.TS_USER_POWER_MIN]: new ProjectFieldMetadata({
        DataModel: UserPowerMinTimeSeries,
        displayName: 'minimum power',
        actionSetName: a.SET_USER_POWER_MIN,
      }),
      // mts: monthly timeseries
      [c.MTS_RA_CAPACITY_PRICE]: new ProjectFieldMetadata({
        DataModel: RACapacityPriceMonthly,
        displayName: 'resource adequacy capacity prices',
        actionSetName: a.SET_RA_CAPACITY_PRICE,
      }),
      [c.MTS_BACKUP_ENERGY_PRICE]: new ProjectFieldMetadata({
        DataModel: BackupEnergyPriceMonthly,
        displayName: 'award for reserving backup power',
        actionSetName: a.SET_BACKUP_ENERGY_PRICE,
      }),
      [c.MTS_BACKUP_ENERGY_RESERVATION]: new ProjectFieldMetadata({
        DataModel: BackupEnergyReservationMonthly,
        displayName: 'amount of energy to constantly reserve',
        actionSetName: a.SET_BACKUP_ENERGY_RESERVATION,
      }),
    });
  }
}

export const projectMetadata = ProjectMetadata.getHardcodedMetadata();
