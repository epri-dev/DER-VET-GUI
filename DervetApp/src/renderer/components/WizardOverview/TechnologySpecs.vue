<template>
  <div>
    <h3>Technology Specs</h3>
    <hr>
    <div class="form-horizontal form-buffer">
      <div class="row">
        <div class="col-md-5">
          <div class="form-group">
            <div class="col-md-12">
              <label>Select a technology to add:</label>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <b-button @click="addPVTech" class="btn btn-primary btn-w250">
                Solar PV
              </b-button>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <b-button @click="addBatteryTech" class="btn btn-primary btn-w250">
                Battery Storage
              </b-button>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <b-button @click="addICETech" class="btn btn-primary btn-w250">
                Internal Combustion Engine
              </b-button>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <b-button @click="addDieselGenTech" class="btn btn-primary btn-w250">
                Diesel Generator
              </b-button>
            </div>
          </div>
        </div>

        <div class="col-md-7 table-bordered">
          <h4>List of Technologies Added</h4>

          <b-table-lite striped hover borderless small
            :fields="fieldsGen"
            :items="techGen">
            <template v-slot:cell(tagname)="row">
              <b-col class="text-left">{{ row.item.tag + ': ' + row.item.name }}</b-col>
            </template>
            <template v-slot:cell(buttons)="row">
              <b-col class="text-right">
                <!--<b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>-->
                <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
              </b-col>
            </template>
          </b-table-lite>

          <b-table-lite striped hover borderless small
            :fields="fieldsIR"
            :items="techIR">
            <template v-slot:cell(tagname)="row">
              <b-col class="text-left">{{ row.item.tag + ': ' + row.item.name }}</b-col>
            </template>
            <template v-slot:cell(buttons)="row">
              <b-col class="text-right">
                <!--<b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>-->
                <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
              </b-col>
            </template>
          </b-table-lite>

          <b-table-lite striped hover borderless small
            :fields="fieldsESS"
            :items="techESS">
            <template v-slot:cell(tagname)="row">
              <b-col class="text-left">{{ row.item.tag + ': ' + row.item.name }}</b-col>
            </template>
            <template v-slot:cell(buttons)="row">
              <b-col class="text-right">
                <!--<b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>-->
                <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
              </b-col>
            </template>
          </b-table-lite>

        </div>
      </div>
      <hr>
      <nav-buttons
        :back-link="OBJECTIVES_PATH"
        :continue-link="WIZARD_COMPONENT_PATH"
        continue-text="Done Adding Technologies"
        :save="this.save"
      />
    </div>
  </div>
</template>

<script>
  import {
    WIZARD_COMPONENT_PATH,
    OBJECTIVES_PATH,
    TECH_SPECS_PATH,
  } from '@/router/constants';
  import { makeEmptyPV } from '@/models/TechnologySpecs/TechnologySpecsSolarPV';
  import { makeEmptyBattery } from '@/models/TechnologySpecs/TechnologySpecsBattery';
  import { makeEmptyICE } from '@/models/TechnologySpecs/TechnologySpecsICE';
  import { makeEmptyDieselGen } from '@/models/TechnologySpecs/TechnologySpecsDieselGen';
  import NavButtons from '@/components/Shared/NavButtons';

  export default {
    components: { NavButtons },
    data() {
      return {
        fieldsGen: [
          { key: 'tagname', label: 'Generators' },
          { key: 'buttons', label: '' },
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
        numPV: 0,
        numBattery: 0,
        numICE: 0,
        numDieselGen: 0,
      };
    },
    computed: {
      techGen() {
        return this.$store.state.Project.listOfActiveTechnologies.Generator;
      },
      techIR() {
        return this.$store.state.Project.listOfActiveTechnologies['Intermittent Resource'];
      },
      techESS() {
        return this.$store.state.Project.listOfActiveTechnologies['Energy Storage System'];
      },
    },
    methods: {

      addPVTech() {
        const newPV = makeEmptyPV();
        this.numPV = this.numPV + 1;
        this.$store.dispatch('addTechnologySpecsSolarPV', newPV);
        const payload = this.makeSaveActivePayload(newPV);
        this.activateTech(payload);
      },
      addBatteryTech() {
        const newBattery = makeEmptyBattery();
        this.numBattery = this.numBattery + 1;
        this.$store.dispatch('addTechnologySpecsBattery', newBattery);
        const payload = this.makeSaveActivePayload(newBattery);
        this.activateTech(payload);
      },
      addICETech() {
        const newICE = makeEmptyICE();
        this.numICE = this.numICE + 1;
        this.$store.dispatch('addTechnologySpecsICE', newICE);
        const payload = this.makeSaveActivePayload(newICE);
        this.activateTech(payload);
      },
      addDieselGenTech() {
        const newDieselGen = makeEmptyDieselGen();
        this.numDieselGen = this.numDieselGen + 1;
        this.$store.dispatch('addTechnologySpecsDieselGen', newDieselGen);
        const payload = this.makeSaveActivePayload(newDieselGen);
        this.activateTech(payload);
      },
      makeSaveActivePayload(techSpec) {
        return {
          id: techSpec.id,
          tag: techSpec.tag,
        };
      },
      activateTech(payload) {
        this.$store.dispatch('activateTech', payload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      deactivateTech(payload) {
        this.$store.dispatch('deactivateTech', payload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      removeTech(payload) {
        this.$store.dispatch('removeTech', payload);
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      save() {
      },
    },
  };
</script>
