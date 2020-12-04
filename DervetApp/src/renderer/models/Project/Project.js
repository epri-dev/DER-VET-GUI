import { v4 as uuidv4 } from 'uuid';

import * as c from '@/models/Project/constants';
import ProjectFieldMetadata from '@/models/Project/Fields';
import operateOnKeysList from '@/util/object';

export class ProjectMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  getDefaultValues() {
    return {
      energyPriceSourceWholesale: null,
      id: uuidv4(),
      includeSiteLoad: null,
      listOfActiveServices: [],
      objectivesBackupPower: false,
      objectivesDA: false,
      objectivesDeferral: false,
      objectivesFR: false,
      objectivesLoadFollowing: false,
      objectivesNSR: false,
      objectivesRetailEnergyChargeReduction: false,
      objectivesRetailDemandChargeReduction: false,
      objectivesResilience: false,
      objectivesSR: false,
      objectivesUserDefined: false,
      type: 'Wizard',
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
        type: 'float',
        unit: '% / year',
        description: 'What is the growth rate of Day Ahead Energy Price?',
      }),
      [c.DATA_YEAR]: new ProjectFieldMetadata({
        displayName: 'Data Year',
        isRequired: true,
        type: Number,
        description: 'Wizard mode only allows one year of data. If the year this data comes from is different from the year the optimization is run against, it will be escalated from the data year to the optimization year.',
      }),
      [c.DEFERRAL_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Deferral Load',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '% / year',
        description: 'What is the growth rate of the deferral load?',
      }),
      [c.DEFERRAL_PLANNED_LOAD_LIMIT]: new ProjectFieldMetadata({
        displayName: 'Planned Load Limit',
        isRequired: true,
        minValue: 0,
        type: 'float',
        unit: 'kW',
        description: 'Max net import power flow to grid',
      }),
      [c.DEFERRAL_PRICE]: new ProjectFieldMetadata({
        displayName: 'Yearly Cost Avoided',
        isRequired: true,
        minValue: 0,
        type: 'float',
        unit: '$ / year',
        description: 'Yearly Cost Avoided for deferring a T and D asset upgrade',
      }),
      [c.DEFERRAL_REVERSE_POWER_FLOW_LIMIT]: new ProjectFieldMetadata({
        displayName: 'Reverse Power Flow Limit',
        isRequired: true,
        maxValue: 0,
        type: 'float',
        unit: 'kW',
        description: 'Max net export power flow to grid',
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
        type: 'float',
        unit: '%',
        description: 'What is the discount rate to be used in the financial analysis? (Note: in the future, we will build calculators for this based on loan terms, return on equity, etc.)',
      }),
      [c.FINANCE_FEDERAL_TAX_RATE]: new ProjectFieldMetadata({
        displayName: 'Federal Tax Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '%',
        description: '',
      }),
      [c.FINANCE_INFLATION_RATE]: new ProjectFieldMetadata({
        displayName: 'Inflation Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '%',
        description: 'What is the inflation rate to be used in the financial analysis?',
      }),
      [c.FINANCE_PROPERTY_TAX_RATE]: new ProjectFieldMetadata({
        displayName: 'Property Tax Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '%',
        description: '',
      }),
      [c.FINANCE_STATE_TAX_RATE]: new ProjectFieldMetadata({
        displayName: 'State Tax Rate',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '%',
        description: '',
      }),
      [c.FR_COMBINED_MARKET]: new ProjectFieldMetadata({
        displayName: 'Combined Market Requirement',
        isRequired: true,
        type: Boolean,
        description: 'Is this a combined regulation market? If it is combined, regulation up will be provided in the same quantity as regulation down always.',
        allowedValues: c.FR_COMBINED_MARKET_ALLOWED_VALUES,
      }),
      [c.FR_DURATION]: new ProjectFieldMetadata({
        displayName: 'Duration for Energy Reservation Requirements',
        isRequired: true,
        minValue: 0,
        maxValue: 24,
        type: 'float',
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Frequency Regulation? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
      }),
      [c.FR_ENERGY_PRICE_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Frequency Regulation Energy Price',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '% / year',
        description: 'Yearly growth rate to apply to the value of energy',
      }),
      [c.FR_EOU]: new ProjectFieldMetadata({
        displayName: 'Energy Option Up',
        isRequired: true,
        minValue: 0,
        maxValue: 1,
        type: 'float',
        unit: 'kWh / kW-hr',
        description: 'Energy content of the AGC signal in the up direction',
      }),
      [c.FR_EOD]: new ProjectFieldMetadata({
        displayName: 'Energy Option Down',
        isRequired: true,
        minValue: 0,
        maxValue: 1,
        type: 'float',
        unit: 'kWh / kW-hr',
        description: 'Energy content of the AGC signal in the down direction',
      }),
      [c.FR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Frequency Regulation Price',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '% / year',
        description: 'Yearly growth rate to apply to regulation prices?',
      }),
      [c.GRID_LOCATION]: new ProjectFieldMetadata({
        displayName: 'Grid Domain',
        isRequired: true,
        type: String,
        description: 'Which grid domain the project will be connected to. This limits which services are available.',
        allowedValues: c.GRID_LOCATION_ALLOWED_VALUES,
      }),
      [c.INCLUDE_INTERCONNECTION_CONSTRAINTS]: new ProjectFieldMetadata({
        displayName: 'Apply interconnection constraints',
        isRequired: true,
        type: Boolean,
        allowedValues: c.INCLUDE_INTERCONNECTION_CONSTRAINTS_ALLOWED_VALUES,
      }),
      [c.INPUTS_DIRECTORY]: new ProjectFieldMetadata({
        displayName: 'Inputs Directory',
        isRequired: false, // TODO change to true
        type: String,
      }),
      [c.MAX_EXPORT]: new ProjectFieldMetadata({
        displayName: 'Maximum Power Exported',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum magnitude that can flow from grid to microgrid through the point of interconnection',
      }),
      [c.MAX_IMPORT]: new ProjectFieldMetadata({
        displayName: 'Maximum Power Imported',
        isRequired: true,
        maxValue: 0,
        type: Number,
        unit: 'kW',
        description: 'Maximum magnitude that can flow from microgrid to grid through the point of interconnection',
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
        type: 'float',
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Non-Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
      }),
      [c.NSR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Non-Spinning Reserve Prices',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '% / year',
        description: 'What is the growth rate of Non-Spinning Reserve Price?',
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
        description: 'What is the number of hours of the optimization window?',
      }),
      [c.OWNERSHIP]: new ProjectFieldMetadata({
        displayName: 'Ownership',
        isRequired: true,
        type: String,
        description: 'Who owns the assets.',
        allowedValues: c.OWNERSHIP_ALLOWED_VALUES,
      }),
      [c.RELIABILITY_MAX_OUTAGE_DURATION]: new ProjectFieldMetadata({
        displayName: 'Maximum Outage Duration to Plot',
        isRequired: true,
        minValue: 1,
        type: 'int',
        unit: 'hours',
        description: 'Calculate the post-facto reliability for an outage that can last up to this many hours',
      }),
      [c.RELIABILITY_POST_OPTIMIZATION_ONLY]: new ProjectFieldMetadata({
        displayName: 'Reliability Sizing',
        isRequired: true,
        type: Boolean,
        description: '',
        allowedValues: c.RELIABILITY_POST_OPTIMIZATION_ONLY_ALLOWED_VALUES,
      }),
      [c.RELIABILITY_TARGET]: new ProjectFieldMetadata({
        displayName: 'Hours of guaranteed outage coverage',
        isRequired: true,
        minValue: 1,
        type: 'float',
        unit: 'hours',
        description: 'How many hours of guaranteed outage coverage does the project need to supply based on the load?',
      }),
      [c.RESULTS_DIRECTORY]: new ProjectFieldMetadata({
        displayName: 'Results Directory',
        isRequired: false, // TODO change to true
        type: String,
      }),
      [c.SIZING_EQUIPMENT]: new ProjectFieldMetadata({
        displayName: 'Size equipment in microgrid',
        description: 'Are there any pieces of equipment that you want DER-VET to optimally size for?',
        isRequired: true,
        type: Boolean,
        allowedValues: c.SIZING_EQUIPMENT_ALLOWED_VALUES,
      }),
      [c.SR_DURATION]: new ProjectFieldMetadata({
        displayName: 'Duration for Energy Reservation Requirements',
        isRequired: true,
        minValue: 0,
        maxValue: 24,
        type: 'float',
        unit: 'hours',
        description: 'How much energy capability (kWh) should the DERs reserve for each kW of participation in Spinning Reserve? The DERs will not use this energy capability for other services to be ready for the worst-case scenario.',
      }),
      [c.SR_GROWTH]: new ProjectFieldMetadata({
        displayName: 'Growth Rate of Spinning Reserve Prices',
        isRequired: true,
        minValue: 0,
        maxValue: 100,
        type: 'float',
        unit: '% / year',
        description: 'What is the growth rate of Spinning Reserve Price?',
      }),
      [c.START_YEAR]: new ProjectFieldMetadata({
        displayName: 'Start Year',
        isRequired: true,
        type: Number,
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
        type: 'float',
        unit: '$ / year',
        description: 'Yearly Cost Avoided for meeting the user-defined constraints',
      }),
    });
  }
  validation() {
    // TODO add to list of errors on Summary
  }
}

export const projectMetadata = ProjectMetadata.getHardcodedMetadata();
