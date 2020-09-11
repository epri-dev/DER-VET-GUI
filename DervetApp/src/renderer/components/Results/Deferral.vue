<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>Deferral</h3>
      </div>
    </div>
    <hr>
    <div class="form-group">
      <div class="col-md-12">
        <div
          id="chartPowerCapacityVsTime">
        </div>
      </div>
      <div class="col-md-12">
        <div
          id="chartEnergyCapacityVsTime">
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
  import Plotly from 'plotly.js';
  // import Chart from 'chart.js';

  // TODO import this dummy data from store.Results
  const powerRequirement = [0, 188, 425, 668, 951, 1167,
    1425, 1687];
  const energyRequirement = [0, 301, 989, 1871, 2877, 4430,
    6346, 8398];
  const yearValues = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  export default {
    mounted() {
      this.createChartPowerCapacityVsTime('chartPowerCapacityVsTime');
      this.createChartEnergyCapacityVsTime('chartEnergyCapacityVsTime');
    },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: p.paths.results,
        energyCapacity: 2340,
        powerCapacity: 732,
      };
    },
    methods: {
      createChartPowerCapacityVsTime(chartId) {
        const ctx = document.getElementById(chartId);
        const powerCapArr = new Array(yearValues.length).fill(this.powerCapacity);
        const data = [
          {
            name: 'Power Requirement (kW)',
            x: yearValues,
            y: powerRequirement,
            mode: 'lines',
            connectgaps: true,
            cliponaxis: true,
          },
          {
            name: 'ESS Power Capacity (kW)',
            x: yearValues,
            y: powerCapArr,
            mode: 'lines',
            connectgaps: true,
            cliponaxis: true,
          },
        ];
        const layout = {
          showlegend: false,
          title: {
            text: 'Power Required to Defer an Asset Upgrade over the Project Lifetime',
          },
          xaxis: {
            title: {
              text: 'Year',
            },
            showgrid: true,
            tick0: yearValues[0],
            dtick: 1,
            range: [yearValues[0], yearValues[-1]],
          },
          yaxis: {
            title: {
              text: 'Power Requirement (kW)',
            },
            showgrid: true,
          },
        };
        const config = {
          displaylogo: false,
          staticPlot: false, // disable modebar options when true
          responsive: true, // responsive to window size
          autosizeable: true,
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png',
            filename: 'power-capacity-requirements',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
      createChartEnergyCapacityVsTime(chartId) {
        const ctx = document.getElementById(chartId);
        const energyCapArr = new Array(yearValues.length).fill(this.energyCapacity);
        const data = [
          {
            name: 'Energy Requirement (kh)',
            x: yearValues,
            y: energyRequirement,
            mode: 'lines',
            connectgaps: true,
            cliponaxis: true,
          },
          {
            name: 'ESS Energy Capacity (kWh)',
            x: yearValues,
            y: energyCapArr,
            mode: 'lines',
            connectgaps: true,
            cliponaxis: true,
          },
        ];
        const layout = {
          showlegend: false,
          title: {
            text: 'Energy Required to Defer an Asset Upgrade over the Project Lifetime',
          },
          xaxis: {
            title: {
              text: 'Year',
            },
            showgrid: true,
            tick0: yearValues[0],
            dtick: 1,
            range: [yearValues[0], yearValues[-1]],
          },
          yaxis: {
            title: {
              text: 'Energy Requirement (kWh)',
            },
          },
        };
        const config = {
          displaylogo: false, // hides the plotly logo from the modebar when false
          scrollZoom: true, // allows mouse wheel scroll when true
          staticPlot: false, // disable modebar options when true
          responsive: true, // responsive to window size
          autosizeable: true,
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png', // 'jpeg',
            filename: 'energy-capacity-requirements',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };

</script>
