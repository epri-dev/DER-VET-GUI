import Page from '@/models/Application/Page';
import * as paths from '@/router/constants';
import * as f from '@/models/Project/constants';
import { includeSystemLoad } from '@/util/project';

export interface SinglePageMetadata {
  active: boolean;
  fields: string[];
  name: string;
  path: string;
}

export interface PageWithStatusMetadata extends SinglePageMetadata {
  complete: boolean;
  errors: string[];
  submitted: boolean;
}

/*
TODO
1. Include page not found check
2. Type for individual Page Metadata
*/

export default class PageMetadata {
  pages: any; // TODO type for metadata?

  constructor(project: any) {
    Object.assign(this, { pages:
      {
        [Page.ProjectConfiguration]: {
          name: 'Project Configuration',
          fields: f.START_PROJECT_FIELDS,
          path: paths.PROJECT_CONFIGURATION,
          active: true,
        },
        [Page.Financial]: {
          name: 'Miscellaneous Inputs',
          fields: [],
          path: paths.FINANCIAL_INPUTS_MISCELLANEOUS,
          active: true,
        },
        [Page.FuelCosts]: {
          name: 'Fuel Costs',
          fields: [],
          path: paths.FINANCIAL_INPUTS_FUEL_COSTS,
          active: true, // TODO dependent...
        },
        [Page.Objectives]: {
          name: 'Services',
          fields: f.OBJECTIVE_FIELDS,
          path: paths.OBJECTIVES,
          active: true,
        },
        [Page.ObjectivesBackup]: {
          name: 'Backup Energy',
          fields: f.BACKUP_FIELDS,
          path: paths.OBJECTIVES_BACKUP_POWER,
          active: project.objectivesBackupPower,
        },
        [Page.ObjectivesDA]: {
          name: 'Day Ahead Pricing',
          fields: f.DA_FIELDS,
          path: paths.OBJECTIVES_DA,
          active: project.objectivesDA,
        },
        [Page.ObjectivesDR]: {
          name: 'Demand Response',
          fields: f.DEMAND_RESPONSE_FIELDS,
          path: paths.OBJECTIVES_DR,
          active: project.objectivesDR,
        },
        [Page.ObjectivesDeferral]: {
          name: 'Deferral',
          fields: f.DEFERRAL_FIELDS,
          path: paths.OBJECTIVES_DEFERRAL,
          active: project.objectivesDeferral,
        },
        [Page.ObjectivesFR]: {
          name: 'Frequency Regulation',
          fields: f.FR_FIELDS,
          path: paths.OBJECTIVES_FR,
          active: project.objectivesFR,
        },
        [Page.ObjectivesLF]: {
          name: 'Load Following',
          fields: f.LF_FIELDS,
          path: paths.OBJECTIVES_LF,
          active: project.objectivesLF,
        },
        [Page.ObjectivesNSR]: {
          name: 'Non-Spinning Reserves',
          fields: f.NSR_FIELDS,
          path: paths.OBJECTIVES_NSR,
          active: project.objectivesNSR,
        },
        [Page.ObjectivesReliabilityTarget]: {
          name: 'Reliability',
          fields: f.RESILIENCE_FIELDS,
          path: paths.OBJECTIVES_RESILIENCE,
          active: project.objectivesResilience,
        },
        [Page.ObjectivesSiteInformation]: {
          name: 'Site Information',
          fields: f.SITE_INFORMATION_FIELDS,
          path: paths.OBJECTIVES_SITE_INFORMATION,
          active: true,
        },
        [Page.ObjectivesSR]: {
          name: 'Spinning Reserves',
          fields: f.SR_FIELDS,
          path: paths.OBJECTIVES_SR,
          active: project.objectivesSR,
        },
        [Page.ObjectivesSystemInformation]: {
          name: 'System Information',
          fields: f.SYSTEM_INFORMATION_FIELDS,
          path: paths.OBJECTIVES_SYSTEM_INFORMATION,
          active: includeSystemLoad(project),
        },
        [Page.ObjectivesRA]: {
          name: 'Resource Adequacy',
          fields: f.RESOURCE_ADEQUACY_FIELDS,
          path: paths.OBJECTIVES_RA,
          active: project.objectivesRA,
        },
        [Page.ObjectivesUserDefined]: {
          name: 'Custom Service',
          fields: f.USER_DEFINED_FIELDS,
          path: paths.OBJECTIVES_USER_DEFINED,
          active: project.objectivesUserDefined,
        },
        [Page.Technologies]: {
          name: 'Technology Specifications',
          fields: [],
          path: paths.TECH_SPECS,
          active: true,
        },
      },
    });
  }

  getSinglePage(page: Page): SinglePageMetadata {
    return this.pages[page];
  }

  getFields(page: Page): string[] {
    return this.pages[page].fields;
  }

  isActive(page: Page): boolean {
    return this.pages[page].active;
  }
}
