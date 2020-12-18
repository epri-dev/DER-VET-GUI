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
    beforeMount() {
      this.$store.dispatch('createDeferralPlots');
    },
    mounted() {
      this.createChartCapacityVsTime('chartCapacityVsTime', this.chartData);
    },
    data() {
      return {
        RESULTS_PATH,
      };
    },
    computed: {
      chartData() {
        return this.$store.state.Results.deferralVueObjects;
      },
    },
    methods: {
      createChartCapacityVsTime(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        let data = [];
        let i = 0;
        const chart = {
          years: chartData.yearValues,
          essName: chartData.essName,
          data: [{
            type: 'Power',
            units: '(kW)',
            essValue: chartData.essPower,
            requirementValues: chartData.powerValues,
          },
          {
            type: 'Energy',
            units: '(kWh)',
            essValue: chartData.essEnergy,
            requirementValues: chartData.energyValues,
          }],
        };
        while (i !== 2) {
          const subChart = chart.data[i];
          const capArr = new Array(chart.years.length).fill(subChart.essValue);
          const traces = [
            {
              name: `${subChart.type[0]} Required`,
              x: chart.years,
              y: subChart.requirementValues,
              type: 'bar',
              connectgaps: true,
              yaxis: `y${i + 1}`,
            },
            {
              name: `${subChart.type} Cap`,
              x: chart.years,
              y: capArr,
              type: 'lines',
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
            tick0: chart.years[0],
            dtick: 1,
            range: [chart.years[0], chart.years[-1]],
          },
          yaxis1: {
            title: {
              text: `${chart.data[0].type} ${chart.data[0].units}`,
            },
            showgrid: true,
            // standoff: 25,
          },
          yaxis2: {
            title: {
              text: `${chart.data[1].type} ${chart.data[1].units}`,
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
