import { v4 as uuidv4 } from 'uuid';
import ProjectField from '@/models/Project/Fields';

const PV = 'PV';

// TODO parse these from schema
const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET size the Solar PV',
  },
  {
    value: false,
    label: 'Known size',
  },
];
const LOC_ALLOWED_VALUES = [
  {
    value: null,
    label: '-',
  },
  {
    value: 'AC',
    label: 'AC',
  },
  {
    value: 'DC',
    label: 'DC',
  },
];
const MACRS_TERM_ALLOWED_VALUES = [
  {
    value: null,
    label: '-',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 25,
    label: '25',
  },
  {
    value: 27.5,
    label: '27.5',
  },
  {
    value: 39,
    label: '39',
  },
];

export default class TechnologySpecsSolarPV {
  // TODO: refactor to use typescript interface + Object.assign(this, args);
  constructor(args) {
    // TODO move active and ID to a parent TechnologySpecs class?
    this.active = true;
    this.id = uuidv4();
    this.tag = PV;
    this.technologyType = 'Intermittent Resource';
    this.generationProfile = args.generationProfile;

    this.constructionDate = args.constructionDate;
    this.cost = args.cost;
    this.inverterMax = args.inverterMax;
    this.loc = args.loc;
    this.macrsTerm = args.macrsTerm;
    this.name = args.name;
    this.operationDate = args.operationDate;
    this.ratedCapacity = args.ratedCapacity;
    this.shouldSize = args.shouldSize;
  }

  toValidationSchema() {
    // TODO: get rid of this copy pasta
    return {
      constructionDate: this.constructionDate.toValidationSchema(),
      cost: this.cost.toValidationSchema(),
      inverterMax: this.inverterMax.toValidationSchema(),
      loc: this.loc.toValidationSchema(),
      macrsTerm: this.macrsTerm.toValidationSchema(),
      name: this.name.toValidationSchema(),
      operationDate: this.operationDate.toValidationSchema(),
      ratedCapacity: this.ratedCapacity.toValidationSchema(),
      shouldSize: this.shouldSize.toValidationSchema(),
    };
  }

  // to be removed in favor of from schema
  static getHardcodedDefaults() {
    return new TechnologySpecsSolarPV({
      constructionDate: new ProjectField({
        value: null,
        displayName: 'Construction Date',
        isRequired: false,
        type: Date,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      cost: new ProjectField({
        value: 0,
        displayName: 'Cost per kW',
        isRequired: true,
        type: Number,
        minValue: 0,
        unit: '$/kW',
        description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
        allowedValues: null,
      }),
      generationProfile: null,
      inverterMax: new ProjectField({
        value: 1e9,
        displayName: 'Solar (+storage) Inverter Rating (kVA)',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW',
        description: null,
        allowedValues: null,
      }),
      loc: new ProjectField({
        value: null,
        displayName: 'Coupled System Type',
        isRequired: true,
        type: String,
        unit: null,
        description: 'Solar plus storage AC or DC coupled system',
        allowedValues: LOC_ALLOWED_VALUES,
      }),
      macrsTerm: new ProjectField({
        value: null,
        displayName: 'MACRS Term',
        isRequired: true,
        type: Number,
        unit: 'years',
        description: 'Which MACRS GDS category does solar PV fall into?',
        allowedValues: MACRS_TERM_ALLOWED_VALUES,
      }),
      name: new ProjectField({
        value: null,
        displayName: 'Name',
        isRequired: true,
        type: String,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      operationDate: new ProjectField({
        value: null,
        displayName: 'Operation Date',
        isRequired: false,
        type: Date,
        unit: null,
        description: null,
        allowedValues: null,
      }),
      ratedCapacity: new ProjectField({
        value: 0,
        displayName: 'Rated Capacity',
        isRequired: true,
        type: Number,
        unit: 'kW',
        description: null,
        allowedValues: null,
      }),
      shouldSize: new ProjectField({
        value: true,
        displayName: 'Sizing',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: SIZING_ALLOWED_VALUES,
      }),
    });
  }


  static getDefaults() {
    return new TechnologySpecsSolarPV({
      cost: ProjectField.fromSchema({
        value: 0,
        displayName: 'Cost per kW',
        isRequired: true,
        description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
        schemaTag: PV,
        schemaKey: 'ccost_kW',
      }),
    });
  }
}
