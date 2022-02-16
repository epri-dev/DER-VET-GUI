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

import CollectionTypes from '@/models/Project/CollectionTypes';

class MetadataFactory {
  static getMetadata(type: CollectionTypes) {
    if (type === CollectionTypes.Project) {
      return new ProjectMetadata();
    } if (type === CollectionTypes.Battery) {
      return new BatteryMetadata();
    } if (type === CollectionTypes.ControllableLoad) {
      const metadata = new TechnologySpecsControllableLoadMetadata();
      // TODO think of a better way to do this
      delete metadata.macrsTerm;
      return metadata;
    } if (type === CollectionTypes.DieselGen) {
      return new TechnologySpecsDieselGenMetadata();
    } if (type === CollectionTypes.FleetEV) {
      return new TechnologySpecsFleetEVMetadata();
    } if (type === CollectionTypes.ICE) {
      return new TechnologySpecsICEMetadata();
    } if (type === CollectionTypes.SingleEV) {
      return new TechnologySpecsSingleEVMetadata();
    } if (type === CollectionTypes.SolarPV) {
      return new SolarPVMetadata();
    } if (type === CollectionTypes.ExternalIncentive) {
      return new ExternalIncentivesMetadata();
    } if (type === CollectionTypes.RetailTariff) {
      return new RetailTariffBillingPeriodMetadata();
    }
    throw Error('Metadata not found');
  }
}

export default MetadataFactory;
