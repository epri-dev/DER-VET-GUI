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
  import NavButtons from '@/components/Shared/NavButtons';
  // import Chart from 'chart.js';

  // TODO import this dummy data from store.Results
  const powerRequirement = [0, 188, 425, 668, 951, 1167,
    1425, 1687];
  const energyRequirement = [0, 301, 989, 1871, 2877, 4430,
    6346, 8398];
  const yearValues = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const essData = {
    energyCapacity: 2340,
    powerCapacity: 732,
    name: 'sto1',
  };

  const deferralPowerChartData = {
    type: 'Power',
    units: '(kW)',
    essValue: essData.powerCapacity,
    essName: 'sto1',
    requirementValues: powerRequirement,
    years: yearValues,
  };
  const deferralEnergyChartData = {
    type: 'Energy',
    units: '(kWh)',
    essValue: essData.energyCapacity,
    essName: 'sto1',
    requirementValues: energyRequirement,
    years: yearValues,
  };

  export default {
    components: { NavButtons },
    mounted() {
      this.createChartCapacityVsTime('chartPowerCapacityVsTime', deferralPowerChartData);
      this.createChartCapacityVsTime('chartEnergyCapacityVsTime', deferralEnergyChartData);
    },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: p.paths.results,
      };
    },
    methods: {
      createChartCapacityVsTime(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const capArr = new Array(chartData.years.length).fill(chartData.essValue);
        const data = [
          {
            name: 'Requirement',
            x: chartData.years,
            y: chartData.requirementValues,
            mode: 'lines',
            connectgaps: true,
          },
          {
            name: `${chartData.type} Cap`,
            x: chartData.years,
            y: capArr,
            mode: 'lines',
            connectgaps: true,
            cliponaxis: true,
          },
        ];
        const layout = {
          showlegend: false,
          title: {
            text: `${chartData.type} Required to Defer an Asset Upgrade over the Project Lifetime`,
          },
          xaxis: {
            title: {
              text: 'Year',
            },
            showgrid: true,
            tick0: chartData.years[0],
            dtick: 1,
            range: [chartData.years[0], chartData.years[-1]],
          },
          yaxis: {
            title: {
              text: `${chartData.type} Requirement ${chartData.units}`,
            },
            showgrid: true,
            standoff: 25,
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
            filename: `deferral-${chartData.type}-capacity-requirements`,
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };

</script>
