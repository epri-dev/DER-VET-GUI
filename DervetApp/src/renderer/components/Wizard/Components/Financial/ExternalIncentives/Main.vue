<template>
  <div>
    <h3>External Incentives</h3>
    <div class="row">
      <div class="col-md-12">
        Specify by entering the external incentives one year at a time or by importing in bulk from an export file.
      </div>
    </div>

    <hr>

    <div class="form-horizontal form-buffer">
      <div class="form-group" v-if="externalIncentivesExist">
        <div class="col-md-12">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="table-align-center" v-for="label in INCENTIVES_HEADERS">
                  {{label}}
                </th>
                <th class="table-align-center">
                  <div @click="removeAll" class="fas fa-trash"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-align-center"
                  v-for="incentive in externalIncentives"
                  v-bind:class="{ ['incomplete-row']: !isExternalIncentiveComplete(incentive.id) }">
                <td>{{incentive.values.year}}</td>
                <td>{{incentive.values.taxCredit}}</td>
                <td>{{incentive.values.otherIncentive}}</td>
                <td>
                  <router-link
                    :to="{ name: 'financialInputsExternalIncentivesYear', params: { id: incentive.id }}"
                    v-bind:class="{ incomplete: !isExternalIncentiveComplete(incentive.id) }">
                    Edit
                  </router-link>
                  <span> | </span>
                  <span @click="removeOne(incentive.id)" class="fas fa-trash"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-md-12">
        <router-link
          :to="$route.path"
          class="btn btn-secondary"
          v-on:click.native="addNewExternalIncentive">
          Add External Incentives
        </router-link>
        <router-link :to="`${paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_IMPORT}`" class="btn btn-secondary">
          <i class="fas fa-upload"/> Import Incentives
        </router-link>
        <a
          :href="externalIncentivesCsv"
          download="ExternalIncentives.csv"
          class="btn btn-secondary pull-right"
          v-if="externalIncentivesExist">
          <i class="fas fa-download"/> Export Incentives
        </a>
      </div>
      <div class="col-md-6">
      </div>
    </div>

    <hr>

    <nav-buttons
      :show-left="false"
      :on-right-click="() => this.$router.push({ path: paths.WIZARD_COMPONENT })"
      right-text="Done"
      :show-error="!areAllExternalIncentivesComplete"
      :error-text="ERROR_MESSAGE"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import { mapGetters } from 'vuex';

  import { INCENTIVES_HEADERS, externalIncentivesToCsv } from '@/models/Project/Metadata/Finances/ExternalIncentives';
  import * as a from '@/store/actionTypes';
  import { CollectionType } from '@/models/Project/CollectionType';
  import MetadataFactory from '@/models/Project/Metadata/Factory';
  import { getDefaultValues } from '@/service/ProjectPage';
  import NavButtons from '@/components/Shared/NavButtons';
  import * as paths from '@/router/constants';
  import { formatCsvForHref } from '@/util/file';

  const ERROR_MESSAGE = 'There are errors in the highlighted rows';

  export default {
    components: { NavButtons },
    data() {
      return {
        collectionType: CollectionType.ExternalIncentive,
        paths,
        INCENTIVES_HEADERS,
        ERROR_MESSAGE,
      };
    },
    computed: {
      ...mapGetters({ isPageComplete: 'Application/isPageComplete' }),
      externalIncentives() {
        return this.$store.state.Project.externalIncentives;
      },
      externalIncentivesCsv() {
        const copied = _.cloneDeep(this.externalIncentives);
        const values = _.map(copied, ei => ei.values);
        const csv = externalIncentivesToCsv(values);
        return formatCsvForHref(csv);
      },
      externalIncentivesExist() {
        return this.externalIncentives.length > 0;
      },
      areAllExternalIncentivesComplete() {
        return _.every(this.externalIncentives, (ei) => this.isExternalIncentiveComplete(ei.id));
      },
    },
    methods: {
      addNewExternalIncentive() {
        const metadata = MetadataFactory.getMetadata(this.collectionType);
        const values = getDefaultValues(metadata);
        this.$store.dispatch(a.ADD_COLLECTION_ITEM, { collectionType: this.collectionType, values })
          .then((id) => this.$router.push({ path: `${paths.FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_YEAR}/${id}` }));
      },
      isExternalIncentiveComplete(id) {
        return this.isPageComplete(this.collectionType, id);
      },
      removeAll() {
        this.$store.dispatch(a.REMOVE_ALL_COLLECTION_ITEMS, this.collectionType);
      },
      removeOne(id) {
        this.$store.dispatch(a.REMOVE_COLLECTION_ITEM, { collectionType: this.collectionType, id });
      },
    },
  };
</script>
