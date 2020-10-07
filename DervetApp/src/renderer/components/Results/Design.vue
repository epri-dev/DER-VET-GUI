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
            :items="sizeItems"
            :fields="sizeFields"
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
          <div v-for="dataRow in costTableData">
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
    <hr />
    <!-- TODO get rid of save & continue button -->
    <nav-buttons
      :back-link="resultsPath"
      back-text="<< Return to results summary"
    />
  </div>
</template>

<script>
  import NavButtons from '@/components/Shared/NavButtons';
  import { createCostTableData, sizeTableExpectedData, sizeTableExpectedFeilds } from '@/models/Results/SizeData';

  export default {
    components: { NavButtons },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: p.paths.results,
        sizeItems: sizeTableExpectedData,
        sizeFields: sizeTableExpectedFeilds,
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
        costTableData: [
          createCostTableData(sizeTableExpectedData[0]),
          createCostTableData(sizeTableExpectedData[1]),
          createCostTableData(sizeTableExpectedData[2]),
        ],
      };
    },
  };
</script>