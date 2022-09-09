<template>
  <div>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="row">
          <div class="col-md-6">
            <h3>Financial</h3>
          </div>
        </div>
        <hr>
        <div class="form-group">
          <div class="col-md-12">
            <div
              id="chartStackedCostBenefit">
            </div>
          </div>
          <div class="col-md-12">
            <h4>Proforma (Nominal Cash Flow)</h4>
            <b-table
              :striped="true"
              :hover="true"
              :bordered="false"
              :items="chartData.proForma.data"
              :fields="chartData.proForma.fields"
            >
            </b-table>
          </div>
          <div class="col-md-12" v-if="chartData.showMonthlyData">
            <canvas
              id="chartjsMonthlyBill">
            </canvas>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import Plotly from 'plotly.js';
  import { formatYAxisCurrency } from '@/util/chart';
  import { RESULTS } from '@/router/constants';

  export default {
    mounted() {
      this.createStackedCostBenefit('chartStackedCostBenefit', this.chartData.costBenefit);
      if (this.chartData.showMonthlyData) {
        this.createMonthlyBillBeforeAndAfter('chartjsMonthlyBill', this.chartData.monthlyData);
      }
    },
    data() {
      return {
        resultsPath: RESULTS,
      };
    },
    computed: {
      chartData() {
        return this.$store.state.Results.financialVueObjects;
      },
    },
    methods: {
      createStackedCostBenefit(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const layout = {
          barmode: 'stack',
          showlegend: true,
          hovermode: 'closest',
          title: {
            text: 'Cost versus Benefit by Value Stream',
          },
          yaxis: {
            title: {
              text: 'Present Value ($)',
            },
            tickformat: formatYAxisCurrency,
            showgrid: true,
            tick0: 0,
            tickprefix: '$',
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
            filename: 'stacked-cost-benefit',
          },
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'],
        };
        return Plotly.newPlot(ctx, chartData, layout, config);
      },
      createMonthlyBillBeforeAndAfter(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              'January',
              'Febrary',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            datasets: [
              {
                label: 'Orignal Demand Charge ($)',
                backgroundColor: '#6bd32a',
                stack: 'Stack 2',
                data: chartData.originalDemandCharge,
              },
              {
                label: 'Demand Charge ($)',
                backgroundColor: '#618a2a',
                stack: 'Stack 1',
                data: chartData.demandCharge,
              },
              {
                label: 'Energy Charge ($)',
                data: chartData.energyCharge,
                stack: 'Stack 1',
                backgroundColor: '#226db6',
              },
              {
                label: 'Original Energy Charge ($)',
                data: chartData.originalEnergyCharge,
                stack: 'Stack 2',
                backgroundColor: '#182e44',
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Before and After Monthly Energy Bill in ${chartData.year}`,
            },
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  display: false,
                },
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                  callback: formatYAxisCurrency,
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Value ($)',
                },
              }],
            },
          },
        });
        return chart;
      },
    },
  };
</script>
