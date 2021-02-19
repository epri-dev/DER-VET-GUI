<template>
  <div class="container body-content">
    <h3>Technology Specs</h3>
    <hr>
    <div class="form-horizontal form-buffer row ">
      <div class="col-md-6">
        <div class="form-group row">
          <b-card class="col-md-6" v-for="tech in techSpecs" v-bind:key="tech.tag" :title="getNumberOfTechnology(tech)">
            <b-card-text v-if="!(isEmpty(tech))">
              {{tech.fullName}}
            </b-card-text>
            <template #footer  v-if="!(isEmpty(tech))">
                <b-button @click="addTech(tech.metadata)">Add</b-button>
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
            <b-col class="text-left">{{getTechLabel(tech.shortHand, row.item) }}</b-col>
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
    <nav-button :continue-link="WIZARD_COMPONENT_PATH"
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
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';
  import NavButton from '@/components/Shared/NavButton';

  const PAGEGROUP = 'overview';
  const PAGE = 'technologySpecs';

  export default {
    components: { NavButton },
    mixins: [technologySpecsMixin],
    data() {
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
      addTech(metadata) {
        const defaultValues = metadata.getDefaultValues();
        this.$store.dispatch(ADD_TECH, defaultValues);
        this.activateTech(defaultValues);
      },
      activateTech(payload) {
        this.$store.dispatch(ACTIVATE_TECH, payload);
        this.setTech();
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
      getSingleErrorMsg() {
        if (!this.complete
            && this.$store.state.Application.errorList[PAGEGROUP][PAGE] !== null) {
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
