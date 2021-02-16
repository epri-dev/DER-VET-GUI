import _ from 'lodash';

import TechnologySpecsBatteryMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsBattery';
import TechnologySpecsControllableLoadMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsControllableLoad';
import TechnologySpecsDieselGenMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsDieselGen';
import TechnologySpecsFleetEVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsFleetEV';
import TechnologySpecsICEMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsICE';
import TechnologySpecsSingleEVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSingleEV';
import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
import * as paths from '@/router/constants';

const metadataBattery = TechnologySpecsBatteryMetadata.getHardcodedMetadata();
const metadataControllableLoad = TechnologySpecsControllableLoadMetadata.getHardcodedMetadata();
const metadataDieselGen = TechnologySpecsDieselGenMetadata.getHardcodedMetadata();
const metadataFleetEV = TechnologySpecsFleetEVMetadata.getHardcodedMetadata();
const metadataICE = TechnologySpecsICEMetadata.getHardcodedMetadata();
const metadataSingleEV = TechnologySpecsSingleEVMetadata.getHardcodedMetadata();
const metadataSolarPV = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();

// allow for up to 4 sets of TS data on a single page (user-defined services)
const technologySpecsMixin = {
  computed: {
    techSpecs() {
      const p = this.$store.state.Project;
      return [
        {
          shortHand: 'ICE',
          items: p.technologySpecsICE,
          fullName: 'Internal Combustion Engine (ICE) Generator sets',
          metadata: metadataICE,
          props: 'iceId',
          path: paths.TECH_SPECS_ICE,
        },
        {
          shortHand: 'Diesel',
          items: p.technologySpecsDieselGen,
          fullName: 'Diesel Generator sets',
          metadata: metadataDieselGen,
          props: 'dieselGenId',
          path: paths.TECH_SPECS_DIESEL,
        },
        {
          shortHand: 'PV',
          items: p.technologySpecsSolarPV,
          fullName: 'Solar Photovoltaic (PV) Sytems',
          metadata: metadataSolarPV,
          props: 'solarId',
          path: paths.TECH_SPECS_PV,
        },
        {}, // filler card (empty, but gives some order when rendered)
        {
          shortHand: 'Battery',
          items: p.technologySpecsBattery,
          fullName: 'Battery Energy Storage Sytems (BESS)',
          metadata: metadataBattery,
          props: 'batteryId',
          path: paths.TECH_SPECS_BATTERY,
        },
        {}, // filler card (empty, but gives some order when rendered)
        {
          shortHand: 'Single EV',
          items: p.technologySpecsSingleEV,
          fullName: 'Single Electric Vehicle (EV)',
          metadata: metadataSingleEV,
          props: 'id',
          path: paths.TECH_SPECS_SINGLE_EV,
        },
        {
          shortHand: 'Fleet EV',
          items: p.technologySpecsFleetEV,
          fullName: 'Fleet Electric Vehicle (EV)',
          metadata: metadataFleetEV,
          props: 'id',
          path: paths.TECH_SPECS_FLEET_EV,
        },
        {
          shortHand: 'Controllable Load',
          items: p.technologySpecsControllableLoad,
          fullName: 'Controllable Loads (Demand Response)',
          metadata: metadataControllableLoad,
          props: 'id',
          path: paths.TECH_SPECS_CONTROLLABLE_LOAD,
        },
      ];
    },
  },
  methods: {
    filterNonActives(listOfTech) {
      return _.filter(listOfTech, 'active');
    },
    getTechLabel(shortHand, payload) {
      if (typeof payload.name === 'string') {
        return `${shortHand}: ${payload.name}`;
      }
      return `Undefined ${shortHand}`;
    },
    isEmpty(payload) {
      return _.isEmpty(payload);
    },
    techPath(basePath, payload) {
      return `${basePath}/${payload.id}`;
    },
  },
};

export default technologySpecsMixin;
