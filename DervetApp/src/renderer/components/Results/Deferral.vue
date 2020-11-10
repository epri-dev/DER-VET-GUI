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
          id="chartCapacityVsTime">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Plotly from 'plotly.js';
  import { RESULTS_PATH } from '@/router/constants';

  export default {
    mounted() {
      this.createChartCapacityVsTime('chartCapacityVsTime', this.chart);
    },
    data() {
      const chartData = this.$store.state.ProjectResult.data.getDeferralVueObjects();
      return {
        RESULTS_PATH,
        chart: {
          years: chartData.year,
          essName: chartData.essName,
          data: [{
            type: 'Power',
            units: '(kW)',
            essValue: chartData.essPower,
            requirementValues: chartData.powerCapacityRequirementKW,
          },
          {
            type: 'Energy',
            units: '(kWh)',
            essValue: chartData.essEnergy,
            requirementValues: chartData.energyCapacityRequirementKWh,
          }],
        },
      };
    },
    methods: {
      createChartCapacityVsTime(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        let data = [];
        let i = 0;
        while (i !== 2) {
          const subChart = chartData.data[i];
          const capArr = new Array(chartData.years.length).fill(subChart.essValue);
          const traces = [
            {
              name: `${subChart.type[0]} Required`,
              x: chartData.years,
              y: subChart.requirementValues,
              mode: 'lines',
              connectgaps: true,
              yaxis: `y${i + 1}`,
            },
            {
              name: `${subChart.type} Cap`,
              x: chartData.years,
              y: capArr,
              mode: 'lines',
              connectgaps: true,
              cliponaxis: true,
              yaxis: `y${i + 1}`,
            },
          ];
          data = [...data, ...traces];
          i += 1;
        }
        const layout = {
          showlegend: false,
          title: {
            text: 'Power and Energy Required to Defer an Asset Upgrade over the Project Lifetime',
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
          yaxis1: {
            title: {
              text: `${chartData.data[0].type} ${chartData.data[0].units}`,
            },
            showgrid: true,
            // standoff: 25,
          },
          yaxis2: {
            title: {
              text: `${chartData.data[1].type} ${chartData.data[1].units}`,
            },
            showgrid: true,
            // standoff: 25,
          },
          grid: {
            rows: 2,
            columns: 1,
            roworder: 'bottom to top',
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
            filename: 'deferral-capacity-requirements',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };

</script>
