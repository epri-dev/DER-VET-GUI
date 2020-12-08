<template>
  <div>
    <h3>Technology Specs</h3>
    <hr>
    <div class="form-horizontal form-buffer row ">
      <div class="col-md-6">
        <div class="form-group row">
          <b-card class="col-md-6" :title="String(numTechICE)">
            <b-card-text>
              {{getCardTechText(numTechICE, "Internal Combustion Engine (ICE) Generator sets")}}
            </b-card-text>
            <template #footer>
                <b-button @click="addICETech">Add</b-button>

            </template>
          </b-card>
          <b-card class="col-md-6" :title="String(numTechDieselGen)">
            <b-card-text>
              {{getCardTechText(numTechDieselGen, "Diesel Generator sets")}}
            </b-card-text>
            <template #footer>
                <b-button @click="addDieselGenTech">Add</b-button>

            </template>
          </b-card>
        </div>
        <div class="form-group row">
          <b-card class="col-md-6" :title="String(numTechSolarPV)">
            <b-card-text>
              {{ getCardTechText(numTechSolarPV, "Solar Photovoltaic (PV) Sytems") }}
            </b-card-text>
            <template #footer>
                <b-button @click="addPVTech">Add</b-button>
            </template>
          </b-card>
        </div>
        <div class="form-group row ">
          <b-card class="col-md-6" :title="String(numTechBattery)">
            <b-card-text>
              {{ getCardTechText(numTechBattery, "Battery Energy Storage Sytems") }}
            </b-card-text>
            <template #footer>
                <b-button @click="addBatteryTech">Add</b-button>

            </template>
          </b-card>
        </div>
      </div>
      <div class="col-md-6 table-bordered">
        <h4>List of Technologies Added</h4>
        <b-table-lite striped hover borderless small
                      :fields="fieldsGen"
                      :items="techGen">
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
        </b-table-lite>
        <b-table-lite striped hover borderless small
                      :fields="fieldsIR"
                      :items="techIR">
          <template v-slot:cell(tagname)="row">
            <b-col class="text-left">{{ getTechLabel(row.item) }}</b-col>
          </template>
          <template v-slot:cell(buttons)="row">
            <b-col class="text-right">
              <b-button size="sm"
                        @click="toggleActivationOfTech(row.item)"
                        variant="outline-secondary"
                        :pressed="row.item.active"
                        class="btn btn-xs">{{getActivationToggleLabel(row.item)}}</b-button>
              <b-button pill size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
            </b-col>
          </template>
        </b-table-lite>
        <b-table-lite striped hover borderless small
                      :fields="fieldsESS"
                      :items="techESS">
          <template v-slot:cell(tagname)="row">
            <b-col class="text-left">{{ getTechLabel(row.item) }}</b-col>
          </template>
          <template v-slot:cell(buttons)="row">
            <b-col class="text-right">
              <b-button size="sm"
                        @click="toggleActivationOfTech(row.item)"
                        variant="outline-secondary"
                        :pressed="row.item.active"
                        class="btn btn-xs">{{getActivationToggleLabel(row.item)}}</b-button>
              <b-button pill size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
            </b-col>
          </template>
        </b-table-lite>
      </div>
    </div>
    <hr>
    <nav-buttons
                 :continue-link="WIZARD_COMPONENT_PATH"
                 continue-text="Done Adding Technologies"
                 :displayError="!complete"
                 :error-text="this.getSingleErrorMsg()"
                 :save="this.save" />
  </div>
</template>
<script>
  import {
    WIZARD_COMPONENT_PATH,
    OBJECTIVES_PATH,
    TECH_SPECS_PATH,
  } from '@/router/constants';
  import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import TechnologySpecsBatteryMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsBattery';
  import TechnologySpecsICEMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsICE';
  import TechnologySpecsDieselGenMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsDieselGen';
  import NavButtons from '@/components/Shared/NavButtons';

  const metadataSolarPV = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
  const metadataBattery = TechnologySpecsBatteryMetadata.getHardcodedMetadata();
  const metadataICE = TechnologySpecsICEMetadata.getHardcodedMetadata();
  const metadataDieselGen = TechnologySpecsDieselGenMetadata.getHardcodedMetadata();

  export default {
    components: { NavButtons },
    data() {
      return {
        fieldsGen: [
          { key: 'tagname', label: 'Generators' },
          { key: 'buttons', label: '' }, // how do I use this?
        ],
        fieldsIR: [
          { key: 'tagname', label: 'Intermittent Resources' },
          { key: 'buttons', label: '' },
        ],
        fieldsESS: [
          { key: 'tagname', label: 'Energy Storage Systems' },
          { key: 'buttons', label: '' },
        ],
        WIZARD_COMPONENT_PATH,
        OBJECTIVES_PATH,
        TECH_SPECS_PATH,
      };
    },
    computed: {
      techGen() {
        const iceList = this.$store.state.Project.technologySpecsICE;
        const dieselGenList = this.$store.state.Project.technologySpecsDieselGen;
        return [...iceList, ...dieselGenList];
      },
      techIR() {
        return this.$store.state.Project.technologySpecsSolarPV;
      },
      techESS() {
        return this.$store.state.Project.technologySpecsBattery;
      },
      numTechSolarPV() {
        return this.$store.state.Project.technologySpecsSolarPV.length;
      },
      numTechICE() {
        return this.$store.state.Project.technologySpecsICE.length;
      },
      numTechBattery() {
        return this.$store.state.Project.technologySpecsBattery.length;
      },
      numTechDieselGen() {
        return this.$store.state.Project.technologySpecsDieselGen.length;
      },
      complete() {
        return this.$store.state.Application.pageCompleteness.overview.technologySpecs;
      },
    },
    methods: {
      addPVTech() {
        const newPV = metadataSolarPV.getDefaultValues();
        this.$store.dispatch('addTechnologySpecsSolarPV', newPV);
        this.activateTech(newPV);
      },
      addBatteryTech() {
        const newBattery = metadataBattery.getDefaultValues();
        this.$store.dispatch('addTechnologySpecsBattery', newBattery);
        this.activateTech(newBattery);
      },
      addICETech() {
        const newICE = metadataICE.getDefaultValues();
        this.$store.dispatch('addTechnologySpecsICE', newICE);
        this.activateTech(newICE);
      },
      addDieselGenTech() {
        const newDieselGen = metadataDieselGen.getDefaultValues();
        this.$store.dispatch('addTechnologySpecsDieselGen', newDieselGen);
        this.activateTech(newDieselGen);
      },
      activateTech(payload) {
        this.$store.dispatch('activateTech', payload);
        this.setTech();
      },
      deactivateTech(payload) {
        this.$store.dispatch('deactivateTech', payload);
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
          pageGroup: 'overview',
          page: 'technologySpecs',
          completeness: (this.getNumberOfActiveTechnologies() > 0),
        };
      },
      getSingleErrorMsg() {
        if (!this.$store.state.Application.pageCompleteness.overview.technologySpecs) {
          return this.$store.state.Application.errorList.overview.technologySpecs[0];
        }
        return '';
      },
      getErrorListPayload() {
        const errors = [];
        if (!this.$store.state.Application.pageCompleteness.overview.technologySpecs) {
          errors.push('At least one Technology is required');
        }
        return {
          pageGroup: 'overview',
          page: 'technologySpecs',
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
      getTechLabel(payload) {
        if (payload.name) {
          return `${payload.tag}: ${payload.name}`;
        }
        return `Undefined ${payload.tag}`;
      },
      toggleActivationOfTech(payload) {
        if (payload.active) {
          this.deactivateTech(payload);
        } else {
          this.activateTech(payload);
        }
      },
      removeTech(payload) {
        this.$store.dispatch('removeTech', payload);
        this.setTech();
      },
      save() {
      },
      setTech() {
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
      },
    },
  };
</script>
