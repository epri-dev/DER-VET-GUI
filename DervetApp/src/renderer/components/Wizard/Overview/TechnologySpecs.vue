<template>
  <div class="container body-content">
    <h3>Distributed Energy Resources (DERs)</h3>
    <hr>
    <div class="form-horizontal form-buffer row">
      <div class="col-md-6">
        <div class="form-group row">
          <b-card
            v-for="tech in techSpecs"
            class="col-md-6"
            :title="getNumberOfSingleTechnologyCardTitle(tech)"
            :key="tech.collectionType">
            <b-card-text v-if="!(isEmpty(tech))">
              {{tech.techTypeFullName}}
            </b-card-text>
            <template #footer v-if="!(isEmpty(tech))">
              <b-button @click="addTech(tech.collectionType)">Add</b-button>
            </template>
          </b-card>
        </div>
      </div>

      <div class="col-md-6">
        <h4>List of Technologies Added</h4>
        <b-table hover outlined small :no-border-collapse="false" class="mb-0" thead-class="d-none"
                      :fields="viewTechTableFields"
                      :items="technologyItemsFlattened">
          <template v-slot:cell(tagname)="row" class="col-md-6">
            {{ row.item.name }}
          </template>
          <template v-slot:cell(buttons)="row" class="text-right">
            <b-button size="sm"
                      @click="toggleActivationOfTech(row.item)"
                      variant="outline-secondary"
                      :pressed="row.item.active"
                      class="btn btn-xs">{{getActivationToggleLabel(row.item)}}</b-button>
            <b-button pill
                      size="sm"
                      @click="removeTech(row.item)"
                      class="btn btn-xs btn-danger delete-tech">
              <span class="fas fa-trash"/>
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
    <hr>

    <nav-buttons
      :show-left="false"
      :on-right-click="validatedSaveContinue"
      right-text="Done Adding Technologies"
      :show-error="submitted"
      :error-text="pageError"
    />
  </div>
</template>
<script>
  import _ from 'lodash';

  import pagesMixin from '@/mixins/pagesMixin';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import Page from '@/models/Application/Page';
  import { CollectionType } from '@/models/Project/CollectionType';
  import MetadataFactory from '@/models/Project/Metadata/Factory';
  import { LocType } from '@/models/Project/Metadata/TechnologySpecs/SolarPV';
  import { CAL_ENVIRO_SCREEN } from '@/router/constants';
  import { getDefaultValues } from '@/service/ProjectPage';
  import * as a from '@/store/actionTypes';

  export default {
    mixins: [pagesMixin, wizardFormMixin],
    data() {
      const page = Page.Technologies;
      return {
        page,
        submitted: this.getPageSubmitted(page),
        viewTechTableFields: [
          { key: 'tagname', label: '' },
          { key: 'buttons', label: '' },
        ],
      };
    },
    validations: {},
    computed: {
      pageError() {
        return this.$store.state.Application.pageStatus[this.page].errors.page || '';
      },
    },
    methods: {
      addTech(collectionType) {
        const metadata = MetadataFactory.getMetadata(collectionType);
        // TODO move this elsewhere
        const values = getDefaultValues(metadata);
        // if collectionType === SolarPV && this.batteryExists
        if (collectionType === CollectionType.SolarPV && !this.$store.getters.activeBatteryExists) {
          values.loc = LocType.AC;
        }
        this.$store.dispatch(a.ADD_COLLECTION_ITEM, { collectionType, values });
        this.setPageStatus();
      },
      removeTech(payload) {
        const { collectionType, id } = payload;
        this.$store.dispatch(a.REMOVE_COLLECTION_ITEM, { collectionType, id });
        this.setPageStatus();
      },
      toggleActivationOfTech(payload) {
        return payload.active ? this.deactivateTech(payload) : this.activateTech(payload);
      },
      activateTech(payload) {
        const { collectionType, id } = payload;
        this.$store.dispatch(a.ACTIVATE_TECH, { collectionType, id });
        this.setPageStatus();
      },
      deactivateTech(payload) {
        const { collectionType, id } = payload;
        this.$store.dispatch(a.DEACTIVATE_TECH, { collectionType, id });
        this.setPageStatus();
      },
      setPageStatus() {
        this.submitted = true;
        this.saveErrorList();
      },
      isEmpty(payload) {
        return _.isEmpty(payload);
      },
      getOtherError() {
        // TODO this should live in ValidationService
        return this.activeTechnologiesExist() ? {} : { page: 'At least one technology is required' };
      },
      activeTechnologiesExist() {
        return this.filterNonActives(this.technologyItemsFlattened).length > 0;
      },
      getNumberOfSingleTechnologyCardTitle(payload) {
        return this.isEmpty(payload) ? '' : String(_.filter(payload.items, 'active').length);
      },
      getActivationToggleLabel(payload) {
        return payload.active ? 'Deactivate' : 'Activate';
      },
      validatedSaveContinue() {
        this.setPageStatus();
        this.$router.push({ path: CAL_ENVIRO_SCREEN });
      },
    },
  };
</script>
