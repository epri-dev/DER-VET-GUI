import ProjectMetadata from '@/models/Project/Metadata/ProjectMetadata';
import BatteryMetadata from '@/models/Project/Metadata/TechnologySpecs/Battery';
import TechnologySpecsControllableLoadMetadata from '@/models/Project/Metadata/TechnologySpecs/ControllableLoad';
import TechnologySpecsDieselGenMetadata from '@/models/Project/Metadata/TechnologySpecs/DieselGen';
import TechnologySpecsFleetEVMetadata from '@/models/Project/Metadata/TechnologySpecs/FleetEV';
import TechnologySpecsICEMetadata from '@/models/Project/Metadata/TechnologySpecs/ICE';
import TechnologySpecsSingleEVMetadata from '@/models/Project/Metadata/TechnologySpecs/SingleEV';
import SolarPVMetadata from '@/models/Project/Metadata/TechnologySpecs/SolarPV';
import ExternalIncentivesMetadata from '@/models/Project/Metadata/Finances/ExternalIncentives';
import RetailTariffBillingPeriodMetadata from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';

import { CollectionType } from '@/models/Project/CollectionType';

class MetadataFactory {
  static getMetadata(type: CollectionType) {
    if (type === CollectionType.Project) {
      return new ProjectMetadata();
    } if (type === CollectionType.Battery) {
      return new BatteryMetadata();
    } if (type === CollectionType.ControllableLoad) {
      return new TechnologySpecsControllableLoadMetadata();
    } if (type === CollectionType.DieselGen) {
      return new TechnologySpecsDieselGenMetadata();
    } if (type === CollectionType.FleetEV) {
      return new TechnologySpecsFleetEVMetadata();
    } if (type === CollectionType.ICE) {
      return new TechnologySpecsICEMetadata();
    } if (type === CollectionType.SingleEV) {
      return new TechnologySpecsSingleEVMetadata();
    } if (type === CollectionType.SolarPV) {
      return new SolarPVMetadata();
    } if (type === CollectionType.ExternalIncentive) {
      return new ExternalIncentivesMetadata();
    } if (type === CollectionType.RetailTariff) {
      return new RetailTariffBillingPeriodMetadata();
    }
    throw Error('Metadata not found');
  }
}

export default MetadataFactory;
