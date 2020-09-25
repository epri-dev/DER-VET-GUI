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

  // const plotlyMonthlyBillDataTraces = [
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.8, 0.49],
  //     type: 'bar',
  //     name: 'Energy',
  //     xaxis: 'x1',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.6, 0.50],
  //     type: 'bar',
  //     name: 'Demand',
  //     xaxis: 'x1',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.1, 0.1],
  //     type: 'bar',
  //     name: 'Energy',
  //     xaxis: 'x2',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.3, 0.35],
  //     type: 'bar',
  //     name: 'Demand',
  //     xaxis: 'x2',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.25, 0.15],
  //     type: 'bar',
  //     name: 'Energy',
  //     xaxis: 'x3',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.45, 0.50],
  //     type: 'bar',
  //     name: 'Demand',
  //     xaxis: 'x3',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.3, 0.35],
  //     type: 'bar',
  //     name: 'Energy',
  //     xaxis: 'x4',
  //     barmode: 'stack',
  //   },
  //   {
  //     x: ['Before', 'After'],
  //     y: [0.6, 0.50],
  //     type: 'bar',
  //     name: 'Demand',
  //     xaxis: 'x4',
  //     barmode: 'stack',
  //   },
  // ];
  const monthlyBillDataTraces = [
    {
      label: 'Orignal Demand Charge ($)',
      backgroundColor: '#6bd32a',
      stack: 'Stack 2',
      data: [
        105620.1844,
        112796.2978,
        119607.5331,
        121938.6236,
        122573.839,
        163561.4688,
        167237.1945,
        183541.1412,
        164910.8468,
        82472.17225,
        75384.2572,
        71278.7625,
      ],
    },
    {
      label: 'Demand Charge ($)',
      backgroundColor: '#618a2a',
      stack: 'Stack 1',
      data: [
        24105.49174,
        22110.09026,
        27875.18851,
        28106.5267,
        32971.54708,
        36293.41722,
        36937.17683,
        38207.55854,
        34999.04347,
        30552.73122,
        27220.86176,
        23844.61009,
      ],
    },
    {
      label: 'Energy Charge ($)',
      data: [
        105620.1844,
        112796.2978,
        119607.5331,
        121938.6236,
        122573.839,
        163561.4688,
        167237.1945,
        183541.1412,
        164910.8468,
        82472.17225,
        75384.2572,
        71278.7625,
      ],
      stack: 'Stack 1',
      backgroundColor: '#226db6',
    },
    {
      label: 'Original Energy Charge ($)',
      data: [
        24105.49174,
        22110.09026,
        27875.18851,
        28106.5267,
        32971.54708,
        36293.41722,
        36937.17683,
        38207.55854,
        34999.04347,
        30552.73122,
        27220.86176,
        23844.61009,
      ],
      stack: 'Stack 2',
      backgroundColor: '#182e44',
    },
  ];
  export default {
    components: { NavButtons },
    mounted() {
      this.createStackedCostBenefit('chartStackedCostBenefit', costBenefitTraces);
      this.createMonthlyBillBeforeAndAfter('chartjsMonthlyBill', monthlyBillDataTraces);
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
            datasets: chartData,
          },
          options: {
            responsive: true,
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Before and After Monthly Energy Bill',
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
