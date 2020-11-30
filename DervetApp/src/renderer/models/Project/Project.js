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
      [c.DATA_YEAR]: new ProjectFieldMetadata({
        displayName: 'Data Year',
        isRequired: true,
        type: Number,
        description: 'Wizard mode only allows one year of data. If the year this data comes from is different from the year the optimization is run against, it will be escalated from the data year to the optimization year.',
      }),
      [c.GRID_LOCATION]: new ProjectFieldMetadata({
        displayName: 'Grid Domain',
        isRequired: true,
        type: String,
        description: 'Which grid domain the project will be connected to. This limits which services are available.',
        allowedValues: c.GRID_LOCATION_ALLOWED_VALUES,
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
      [c.NAME]: new ProjectFieldMetadata({
        displayName: 'Name',
        isRequired: true,
        type: String,
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
    });
  }
  validation() {
    // TODO add to list of errors on Summary
  }
}

export const projectMetadata = ProjectMetadata.getHardcodedMetadata();
