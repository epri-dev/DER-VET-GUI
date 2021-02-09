<template>
  <div>
    <h3>External Incentives</h3>
    <div class="row">
      <div class="col-md-12">
        Specify external incentives by entering the external incentives one year at a time or by importing an external incentives file from an export file.
      </div>
    </div>

    <hr>

    <div class="form-horizontal form-buffer">

      <div class="form-group" v-if="fileImportSuccess()">
        <ul>
        <i>NOTES on file import:</i>
          <ul>
          <div v-for="note in fileImportNotes">
            <li><i>{{ note }}</i></li>
          </div>
          </ul>
        </ul>
      </div>

      <div class="form-group" v-if="externalIncentivesExist()">
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
                  v-bind:class="{ incomplete: !incentive.complete }">
                <td>{{incentive.year}}</td>
                <td>{{incentive.taxCredit}}</td>
                <td>{{incentive.otherIncentive}}</td>
                <td>
                  <router-link
                    :to="{ name: 'financialInputsExternalIncentivesYear', params: { incentiveId: incentive.id }}"
                    v-bind:class="{ incomplete: !incentive.complete }">
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
<!--
      <div class="form-group" v-else>
        <div class="col-md-12 buffer-bottom">
          <i>There are currently no external incentives specified...</i>
        </div>
      </div>
-->
    </div>

    <div class="form-group row">
      <div class="col-md-12">
        <router-link :to="`${FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH}-year/null`" class="btn btn-secondary">
          Add External Incentives
        </router-link>
        <router-link :to="`${FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH}-import`" class="btn btn-secondary">
          <i class="fas fa-upload"/> Import Incentives
        </router-link>
        <a
          :href="exportCsv()"
          download="ExternalIncentives.csv"
          class="btn btn-secondary pull-right"
          v-if="externalIncentivesExist()">
          <i class="fas fa-download"/> Export Incentives
        </a>
      </div>
      <div class="col-md-6">
      </div>
    </div>

    <hr>
    <nav-button
      :continue-link="WIZARD_COMPONENT_PATH"
      :displayError="!complete"
      :error-text="errorMessage"
      continue-text="Done Adding External Incentives" />

  </div>
</template>

<script>
  import { INCENTIVES_HEADERS, externalIncentivesToCsv } from '@/models/ExternalIncentives';
  import { formatCsvForHref } from '@/util/file';
  import NavButton from '@/components/Shared/NavButton';
  import {
    WIZARD_COMPONENT_PATH,
    FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH,
  } from '@/router/constants';
  import { getSingleErrorMsg } from '@/util/validation';

  const PAGEGROUP = 'components';
  const PAGEKEY = 'financial';
  const PAGE = 'externalIncentives';
  const TABLE_ITEM_NAME = 'external incentive periods';

  export default {
    mounted() {
      this.setExternalIncentiveData();
    },
    components: { NavButton },
    computed: {
      externalIncentives() {
        return this.$store.state.Project.externalIncentives;
      },
      complete() {
        // an empty table is complete
        if (!this.externalIncentivesExist()) {
          return true;
        }
        return this.errorMessage === '';
      },
      errorMessage() {
        return getSingleErrorMsg(this.externalIncentives, TABLE_ITEM_NAME);
      },
      fileImportNotes() {
        return this.$store.state.Project.externalIncentivesFileImportNotes;
      },
    },
    data() {
      return {
        INCENTIVES_HEADERS,
        WIZARD_COMPONENT_PATH,
        FINANCIAL_INPUTS_EXTERNAL_INCENTIVES_PATH,
      };
    },
    methods: {
      exportCsv() {
        const csv = externalIncentivesToCsv(this.externalIncentives);
        return formatCsvForHref(csv);
      },
      externalIncentivesExist() {
        return this.externalIncentives.length > 0;
      },
      fileImportSuccess() {
        return (this.fileImportNotes.length > 0);
      },
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          completeness: this.complete,
        };
      },
      getErrorListPayload() {
        return {
          pageGroup: PAGEGROUP,
          pageKey: PAGEKEY,
          page: PAGE,
          errorList: this.complete ? [] : [this.errorMessage],
        };
      },
      removeAll() {
        this.$store.dispatch('removeAllExternalIncentives');
        this.setExternalIncentiveData();
      },
      removeOne(id) {
        this.$store.dispatch('removeExternalIncentive', id);
        this.setExternalIncentiveData();
      },
      setExternalIncentiveData() {
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
      },
    },
  };
</script>
