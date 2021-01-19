<template>
  <div>
    <h3>Technology Specs</h3>
    <hr>
    <div class="form-horizontal form-buffer row ">
      <div class="col-md-6">
        <div class="form-group row">
          <b-card class="col-md-6" v-for="tech in techSpecs" v-bind:key="tech.tag" :title="getNumberOfTechnology(tech)"> 
            <b-card-text v-if="!(isEmpty(tech))">
              {{tech.label}}
            </b-card-text>
            <template #footer  v-if="!(isEmpty(tech))">
                <b-button @click="addTech(tech.tag)">Add</b-button>
            </template>
          </b-card>
        </div>
      </div>

      <div class="col-md-6">
        <h4>List of Technologies Added</h4>
        <b-table hover outlined small :no-border-collapse="false" class="mb-0" thead-class="d-none"
                      v-for="tech in techSpecs" v-bind:key="tech.tag"
                      :fields="viewTechTableFields"
                      :items="tech.items">
          <template v-slot:cell(tagname)="row">
            <b-col class="text-left">{{getTechLabel(row.item) }}</b-col>
          </template>
          <template v-slot:cell(buttons)="row">
            <b-col class="text-right">
              <b-button size="sm"
                        @click="toggleActivationOfTech(row.item)"
                        variant="outline-secondary"
                        :pressed="row.item.active"
                        class="btn btn-xs">{{getActivationToggleLabel(row.item)}}</b-button>
              <b-button pill
                        size="sm"
                        @click="removeTech(row.item)"
                        class="btn btn-xs btn-danger delete-tech">Remove</b-button>
            </b-col>
          </template>
        </b-table>
      </div>
    </div>
    <hr>
    <nav-buttons :continue-link="WIZARD_COMPONENT_PATH"
                 continue-text="Done Adding Technologies"
                 :displayError="!complete"
                 :error-text="this.getSingleErrorMsg()"
                 :save="this.save" />
  </div>
</template>
<script>
  import _ from 'lodash';
  import {
    WIZARD_COMPONENT_PATH,
    OBJECTIVES_PATH,
    TECH_SPECS_PATH,
  } from '@/router/constants';
  import {
    ACTIVATE_TECH,
    ADD_TECH,
    DEACTIVATE_TECH,
    MAKE_LIST_OF_ACTIVE_TECHNOLOGIES,
    REMOVE_TECH,
  } from '@/store/actionTypes';

  import TechnologySpecsBatteryMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsBattery';
  import TechnologySpecsControllableLoadMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsControllableLoad';
  import TechnologySpecsDieselGenMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsDieselGen';
  import TechnologySpecsFleetEVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsFleetEV';
  import TechnologySpecsICEMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsICE';
  import TechnologySpecsSingleEVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSingleEV';
  import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import NavButtons from '@/components/Shared/NavButtons';


  const metadataBattery = TechnologySpecsBatteryMetadata.getHardcodedMetadata();
  const metadataControllableLoad = TechnologySpecsControllableLoadMetadata.getHardcodedMetadata();
  const metadataDieselGen = TechnologySpecsDieselGenMetadata.getHardcodedMetadata();
  const metadataFleetEV = TechnologySpecsFleetEVMetadata.getHardcodedMetadata();
  const metadataICE = TechnologySpecsICEMetadata.getHardcodedMetadata();
  const metadataSingleEV = TechnologySpecsSingleEVMetadata.getHardcodedMetadata();
  const metadataSolarPV = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
  
  const PAGEGROUP = 'overview';
  const PAGE = 'technologySpecs';

  export default {
    components: { NavButtons },
    data() {
      const p = this.$store.state.Project;
      return {
        viewTechTableFields: [
          {
            key: 'tagname',
            label: '',
          },
          {
            key: 'buttons',
            label: '',
          },
        ],
        techSpecMetadata: {
          Battery: metadataBattery,
          ControllableLoad: metadataControllableLoad,
          DieselGen: metadataDieselGen,
          ElectricVehicle1: metadataSingleEV,
          ElectricVehicle2: metadataFleetEV,
          ICE: metadataICE,
          PV: metadataSolarPV,
        },
        techSpecs: [
          {
            items: p.technologySpecsICE,
            label: 'Internal Combustion Engine (ICE) Generator sets',
            tag: 'ICE',
          },
          {
            items: p.technologySpecsDieselGen,
            label: 'Diesel Generator sets',
            tag: 'DieselGen',
          },
          {
            items: p.technologySpecsSolarPV,
            label: 'Solar Photovoltaic (PV) Sytems',
            tag: 'PV',
          },
          {}, // filler card (empty, but gives some order when rendered)
          {
            items: p.technologySpecsBattery,
            label: 'Battery Energy Storage Sytems (BESS)',
            tag: 'Battery',
          },
          {}, // filler card (empty, but gives some order when rendered)
          {
            items: p.technologySpecsSingleEV,
            label: 'Single Electric Vehicle (EV)',
            tag: 'ElectricVehicle1',
          },
          {
            items: p.technologySpecsFleetEV,
            label: 'Fleet Electric Vehicle (EV)',
            tag: 'ElectricVehicle2',
          },
          {
            items: p.technologySpecsControllableLoad,
            label: 'Controllable Loads (Demand Response)',
            tag: 'ControllableLoad',
          },
        ],
        WIZARD_COMPONENT_PATH,
        OBJECTIVES_PATH,
        TECH_SPECS_PATH,
      };
    },
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness.overview[PAGE];
      },
    },
    methods: {
      addTech(tag) {
        const metadata = this.techSpecMetadata[tag];
        const defaultValues = metadata.getDefaultValues();
        console.log(JSON.stringify(defaultValues, null, 1));
        this.$store.dispatch(ADD_TECH, defaultValues);
        this.activateTech(defaultValues);
      },
      activateTech(payload) {
        this.$store.dispatch(ACTIVATE_TECH, payload);
        this.setTech();
      },
      isEmpty(payload) {
        return _.isEmpty(payload);
      },
      deactivateTech(payload) {
        this.$store.dispatch(DEACTIVATE_TECH, payload);
        this.setTech();
      },
      getActivationToggleLabel(payload) {
        return payload.active ? 'Deactivate' : 'Activate';
      },
      getCardTechText(number, name) {
        // TODO: drop the 'Number of ' text?
        if (number) {
          return `Number of ${name}`;
        }
        return name;
      },
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          page: PAGE,
          completeness: (this.getNumberOfActiveTechnologies() > 0),
        };
      },
      getTechLabel(payload) {
        const { label } = _.filter(this.techSpecs, { tag: payload.tag })[0];
        if (payload.name) {
          return `${label}: ${payload.name}`;
        }
        return `Undefined ${label}`;
      },
      getSingleErrorMsg() {
        if (!this.complete &&
            this.$store.state.Application.errorList[PAGEGROUP][PAGE] !== null) {
          return this.$store.state.Application.errorList[PAGEGROUP][PAGE][0];
        }
        return '';
      },
      getErrorListPayload() {
        const errors = [];
        if (!this.$store.state.Application.pageCompleteness[PAGEGROUP][PAGE]) {
          errors.push('At least one Technology is required');
        }
        return {
          pageGroup: PAGEGROUP,
          page: PAGE,
          errorList: errors,
        };
      },
      getNumberOfActiveTechnologies() {
        let numberOfActiveTechnologies = 0;
        const activeTechObj = this.$store.state.Project.listOfActiveTechnologies;
        Object.values(activeTechObj).forEach((tech) => {
          numberOfActiveTechnologies += tech.length;
        });
        return numberOfActiveTechnologies;
      },
      getNumberOfTechnology(payload) {
        const { items } = payload;
        if (items === undefined) {
          return '';
        }
        const activeItems = _.filter(items, { active: true });
        return String(activeItems.length);
      },
      toggleActivationOfTech(payload) {
        if (payload.active) {
          this.deactivateTech(payload);
        } else {
          this.activateTech(payload);
        }
      },
      removeTech(payload) {
        this.$store.dispatch(REMOVE_TECH, payload);
        this.setTech();
      },
      save() {
      },
      setTech() {
        this.$store.dispatch(MAKE_LIST_OF_ACTIVE_TECHNOLOGIES, this.$store.state.Project);
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
      },
    },
  };
</script>
