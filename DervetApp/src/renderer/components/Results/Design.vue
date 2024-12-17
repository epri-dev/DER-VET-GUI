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
                <b-th v-if="chartData.numPowerCol > 0" :colspan="chartData.numPowerCol">Power Specifications</b-th>
                <b-th v-if="chartData.numEnergyCol > 0" :colspan="chartData.numEnergyCol">Energy Specifications</b-th>
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
  import { RESULTS } from '@/router/constants';

  export default {
    data() {
      return {
        RESULTS,
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
    computed: {
      chartData() {
        return this.$store.state.Results.designVueObjects;
      },
    },
  };
</script>
