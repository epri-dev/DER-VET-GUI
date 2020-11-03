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
                <router-link :to="TECH_SPECS_PATH" @click="addPVTech" class="btn btn-primary btn-w250">
                  Solar PV
               </router-link>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs" class="btn btn-primary btn-w250">
                  Battery Storage
                </router-link>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs" class="btn btn-primary btn-w250">
                  Internal Combustion Engine
                </router-link>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs" class="btn btn-primary btn-w250">
                  Diesel Generator
                </router-link>
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
                    <b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>
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
                <p>{{num_pv}}</p>
                <template v-slot:cell(buttons)="row">
                  <b-col class="text-right">
                    <b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>
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
                    <b-button size="sm" @click="deactivateTech(row.item)" variant="outline-danger" class="btn btn-xs">Deactivate</b-button>
                    <b-button size="sm" @click="removeTech(row.item)" class="btn btn-xs btn-danger delete-tech">Remove</b-button>
                  </b-col>
                </template>
              </b-table-lite>

          </div>
        </div>
        <hr>
        <nav-buttons
          :back-link="WIZARD_START_PATH"
          :continue-link="OBJECTIVES_PATH"
          continue-text="Done Adding Technologies"
          :save="this.save"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import {
    WIZARD_START_PATH,
    OBJECTIVES_PATH,
    TECH_SPECS_PATH,
  } from '@/router/constants';
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
        WIZARD_START_PATH,
        OBJECTIVES_PATH,
        TECH_SPECS_PATH,
        num_pv: 0,
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
        const tempData = {
          active: true,
          tag: null,
          technologyType: null,
          id: uuidv4(),
          name: null,
          cost: null,
          shouldSize: null,
          ratedCapacity: null,
          loc: null,
          inverterMax: null,
          constructionDate: null,
          operationDate: null,
          macrsTerm: null,
          generationProfile: null,
        };
        this.num_pv = this.num_pv + 1;
        this.$store.dispatch('addTechnologySpecsSolarPV', tempData);
        // this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
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
