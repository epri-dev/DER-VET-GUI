<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>Design</h3>
      </div>
    </div>
    <hr />
    <div class="form-horizontal form-buffer">
      <div class="form-group projects-summary">
        <div class="col-md-12">
          <h4>Size Results</h4>
          <b-table
            :striped="true"
            :hover="true"
            :bordered="true"
            :items="chartData.sizeTable.data"
            :fields="chartData.sizeTable.fields"
          >
            <template v-slot:thead-top="data">
              <b-tr>
                <!-- TODO: assign columns based on column in rows -->
                <b-th><span class="sr-only">Name</span></b-th>
                <b-th colspan="3">Power Specifications</b-th>
                <b-th colspan="2">Energy Specifications</b-th>
                <b-th><span class="sr-only">Quantity</span></b-th>
              </b-tr>
            </template>
          </b-table>
        </div>
        <div class="col-md-12">
          <hr class="results" />
          <h4>Rated Power and Energy Costs</h4>
          <div v-for="dataRow in chartData.costsTable">
            <b-table
              :striped="true"
              :borderless="true"
              :outlined="true"
              :items="dataRow.items"
              :fields="costTableFields"
              :caption-top="true"
              thead-class="d-none"
            >
            <template v-slot:table-caption>Cost of {{dataRow.name}}</template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { RESULTS_PATH } from '@/router/constants';

  export default {
    data() {
      const chartData = this.$store.state.ProjectResult.data.getDesignVueObjects();
      return {
        RESULTS_PATH,
        chartData,
        costTableFields: [
          {
            key: 'total',
            class: 'text-right',
          },
          {
            key: 'subTotal',
            class: 'text-right',
          },
          'strEquation',
          'label',
        ],
      };
    },
  };
</script>