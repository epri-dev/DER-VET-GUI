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
      <div class="form-group" v-if="externalIncentivesExist()">
        <div class="col-md-8">
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
              <tr class="table-align-center"v-for="incentive in externalIncentives">
                <td >{{incentive.year}}</td>
                <td>{{incentive.taxCredit}}</td>
                <td>{{incentive.otherIncentive}}</td>
                <td>
                    <!-- TODO: pass ID -->
                  <router-link to="/wizard/financial-inputs-external-incentives-year">
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
      <div class="form-group" v-else>
        <div class="col-md-12 buffer-bottom">
          <i>There are currently no external incentives specified...</i>
        </div>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-md-12">
        <router-link to="/wizard/financial-inputs-external-incentives-year" class="btn btn-secondary">
          Add External Incentives
        </router-link>
        <router-link to="/wizard/financial-inputs-external-incentives-import" class="btn btn-secondary">
          <i class="fas fa-upload"/> Import Incentives
        </router-link>
        <!-- TODO export functionality -->
        <div class="btn btn-secondary pull-right" v-if="externalIncentivesExist()">
          <i class="fas fa-download"/> Export Incentives
        </div>
      </div>
      <div class="col-md-6">
      </div>
    </div>

    <hr>

    <!-- TODO dependent on user selections -->
    <nav-buttons
      back-link="/wizard/financial-inputs"
      continue-link="/wizard/financial-inputs-summary"
    />
  </div>
</template>

<script>
  import { INCENTIVES_HEADERS } from '@/models/ExternalIncentives';
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    computed: {
      externalIncentives() {
        return this.$store.state.Project.externalIncentives;
      },
    },
    data() {
      return { INCENTIVES_HEADERS };
    },
    methods: {
      externalIncentivesExist() {
        return this.externalIncentives.length > 0;
      },
      removeAll() {
        this.$store.dispatch('removeAllExternalIncentives');
      },
      removeOne(id) {
        this.$store.dispatch('removeExternalIncentive', id);
      },
    },
  };
</script>
