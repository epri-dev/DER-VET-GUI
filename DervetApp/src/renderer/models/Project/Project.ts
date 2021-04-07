export interface Project {
  energyPriceSourceWholesale: boolean;
  id: string;
  includeSiteLoad: boolean;
  objectivesBackupPower: boolean;
  objectivesDA: boolean;
  objectivesDeferral: boolean;
  objectivesFR: boolean;
  objectivesLoadFollowing: boolean;
  objectivesNSR: boolean;
  objectivesRetailEnergyChargeReduction: boolean;
  objectivesRetailDemandChargeReduction: boolean;
  objectivesResilience: boolean;
  objectivesSR: boolean;
  objectivesUserDefined: boolean;
  name: string;
  // Included, but should really be a getter and not included...
  // listOfActiveServices: []
}
