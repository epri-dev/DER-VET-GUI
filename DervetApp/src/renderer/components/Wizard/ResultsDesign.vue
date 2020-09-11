<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>Results: Design</h3>
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
  import NavButtons from './NavButtons';
  // TODO import this dummy data from store.Results
  const sizeData = [
    {
      systemName: 'Storage',
      dischargeRating: 2303,
      chargeRating: 2303,
      energyRating: 19477,
      duration: 8.457,
      quantity: 1,
      capitalCost: 1000,
      capitalCostkW: 800,
      capitalCostkWh: 250,
    },
    {
      systemName: 'Solar PV',
      powerCapacity: 3000,
      quantity: 1,
      capitalCostkW: 1660,
    },
    {
      systemName: 'Generators',
      powerCapacity: 1000,
      quantity: 3,
      capitalCost: 750,
      capitalCostkW: 245,
    },
  ];

  export default {
    components: { NavButtons },
    methods: {
      createCostTableData(rowSizeData) {
        let costStructure = [];
        let energyCost = 0;
        let powerCost = 0;
        let unitsCost = 0;
        if ('capitalCostkWh' in rowSizeData) {
          const cCostkWh = rowSizeData.capitalCostkWh;
          energyCost = cCostkWh * rowSizeData.energyRating;
          const costPerkWh = [
            {
              label: 'Cost per kWh',
              subTotal: `$${energyCost.toLocaleString()}`,
            },
            {
              subTotal: '=',
              strEquation: `${rowSizeData.energyRating.toLocaleString()}kWh x $${cCostkWh.toLocaleString()}/kWh`,
            },
          ];
          costStructure = costPerkWh;
        }
        if ('capitalCostkW' in rowSizeData) {
          const cCostkW = rowSizeData.capitalCostkW;
          const powerCapacity = rowSizeData.dischargeRating || rowSizeData.powerCapacity;
          powerCost = powerCapacity * cCostkW;
          const costPerkW = [
            {
              label: 'Cost per kW',
              subTotal: `$${powerCost.toLocaleString()}`,
            },
            {
              subTotal: '=',
              strEquation: `${powerCapacity.toLocaleString()}kW x $${cCostkW.toLocaleString()}/kWh`,
            },
          ];
          costStructure = [...costPerkW, ...costStructure];
        }
        if ('capitalCost' in rowSizeData) {
          const cCost = rowSizeData.capitalCost;
          unitsCost = rowSizeData.quantity * cCost;
          const costPerUnit = [
            {
              label: 'Cost per Unit',
              subTotal: `$${unitsCost.toLocaleString()}`,
            },
            {
              subTotal: '=',
              strEquation: `${rowSizeData.quantity} x $${cCost.toLocaleString()}`,
            },
          ];
          costStructure = [...costPerUnit, ...costStructure];
        }
        const total = energyCost + powerCost + unitsCost;
        const totalCost = [
          {
            label: 'Total Cost',
            total: `$${total.toLocaleString()}`,
          },
        ];
        costStructure = [...totalCost, ...costStructure];
        return {
          name: rowSizeData.systemName,
          items: costStructure,
        };
      },
    },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: p.paths.results,
        sizeItems: sizeData,
        sizeFields: [
          {
            key: 'systemName',
            sortable: true,
            label: 'System Name',
          },
          {
            key: 'dischargeRating',
            sortable: true,
            label: 'Disharge Rating (kW)',
          },
          {
            key: 'powerCapacity',
            sortable: true,
            label: 'Power Capacity (kW)',
          },
          {
            key: 'chargeRating',
            sortable: true,
            label: 'Charge Rating (kW)',
          },
          {
            key: 'energyRating',
            sortable: true,
            label: 'Energy Rating (kWh)',
          },
          {
            key: 'duration',
            sortable: true,
            label: 'Duration (hours)',
          },
          {
            key: 'quantity',
            sortable: true,
            label: 'Quantity',
          },
        ],
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
          'label'],
        costTableData: [
          this.createCostTableData(sizeData[0]),
          this.createCostTableData(sizeData[1]),
          this.createCostTableData(sizeData[2]),
        ],
      };
    },
  };
</script>