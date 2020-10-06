<template>
  <div>
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
          :items="proformaItems"
          :fields="proformaFields"
        >
        </b-table>
      </div>
      <div class="col-md-12">
        <canvas
          id="chartjsMonthlyBill">
        </canvas>
      </div>
      <!-- <div class="col-md-12">
        <div
          id="plotlyMonthlyBill">
        </div>
      </div> -->
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
  import Chart from 'chart.js';
  import Plotly from 'plotly.js';
  import NavButtons from '@/components/Shared/NavButtons';
  import { formatYAxisCurrency } from '@/util/chart';
  import { proFormaTableFields, proFormaTableData } from '@/models/Results/ProFormaData';
  import { costBenefitTraces } from '@/models/Results/CostBenefitData';
  import { monthlyBillDataTraces } from '@/models/Results/BeforeAndAfterMonthlyBillData';
  
  export default {
    components: { NavButtons },
    mounted() {
      this.createStackedCostBenefit('chartStackedCostBenefit', costBenefitTraces);
      this.createMonthlyBillBeforeAndAfter('chartjsMonthlyBill', monthlyBillDataTraces, '2017');
      // this.createPlotlyMonthlyBillBeforeAndAfter('plotlyMonthlyBill', plotlyMonthlyBillDataTraces);
    },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: p.paths.results,
        proformaItems: proFormaTableData,
        proformaFields: proFormaTableFields,
      };
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
        };
        return Plotly.newPlot(ctx, chartData, layout, config);
      },
      createPlotlyMonthlyBillBeforeAndAfter(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const layout = {
          barmode: 'stack',
          title: {
            text: 'Cost versus Benefit by Value Stream',
          },
          yaxis: { tickformat: '$' },
          xaxis: {
            // domain: [0, 0.083],
            domain: [0, 0.25],
            anchor: 'x1',
            title: 'January',
          },
          xaxis2: {
            // domain: [0.083, 0.166],
            domain: [0.25, 0.50],
            anchor: 'x2',
            title: 'Febrary',
          },
          xaxis3: {
            // domain: [0.166, 0.249],
            domain: [0.50, 0.75],
            anchor: 'x3',
            title: 'March',
          },
          xaxis4: {
            // domain: [0.249, 0.332],
            domain: [0.75, 1.0],
            anchor: 'x4',
            title: 'April',
          },
          // xaxis3: {
          //   domain: [0.332, 0.415],
          //   anchor: 'x5',
          //   title: 'May',
          // },
          // xaxis3: {
          //   domain: [0.415, 0.498],
          //   anchor: 'x6',
          //   title: 'June',
          // },
          // xaxis3: {
          //   domain: [0.498, 0.581],
          //   anchor: 'x7',
          //   title: 'July',
          // },
          // xaxis3: {
          //   domain: [0.581, 0.664],
          //   anchor: 'x8',
          //   title: 'August',
          // },
          // xaxis3: {
          //   domain: [0.664, 0.747],
          //   anchor: 'x9',
          //   title: 'September',
          // },
          // xaxis3: {
          //   domain: [0.747, 0.83],
          //   anchor: 'x10',
          //   title: 'October',
          // },
          // xaxis3: {
          //   domain: [0.83, 0.913],
          //   anchor: 'x11',
          //   title: 'November',
          // },
          // xaxis3: {
          //   domain: [0.913, 1.0],
          //   anchor: 'x12',
          //   title: 'December',
          // },
        };
        const config = {
          displaylogo: false,
          staticPlot: false, // disable modebar options when true
          responsive: true, // responsive to window size
          autosizeable: true,
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png',
            filename: 'before-after-monthly-bill',
          },
        };
        return Plotly.newPlot(ctx, chartData, layout, config);
      },
      createMonthlyBillBeforeAndAfter(chartId, chartData, dataYear) {
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
            ], // TODO based off of data
            datasets: chartData,
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Before and After Monthly Energy Bill in ${{ dataYear }}`, // based of of data
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
