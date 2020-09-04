<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>Results</h3>
      </div>
    </div>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <h4 class="result-summary-title">
              <a>
                Financials Summary
              </a>
              </h4>
              <div class="form-group">
                <div class="col-md-12">
                  <canvas
                  id="chartCostBenefit"
                  class="chartjs-render-monitor">
                  </canvas>
                </div>
              </div>
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  View Detailed Financials Results...
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Chart from 'chart.js';

  import { formatYAxisCurrency } from '@/util/chart';

  // TODO import this dummy data from store.Results
  const chartData = [210000000, 390000000];

  export default {
    mounted() {
      this.createChartCostBenefit('chartCostBenefit', chartData);
    },
    methods: {
      createChartCostBenefit(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        return new Chart(ctx, {
          type: 'bar',
          data: {
            datasets: [
              {
                label: 'Cost ($)',
                backgroundColor: '#182e44',
                stack: 'Stack 1',
                data: [chartData[0]],
              },
              {
                label: 'Benefit ($)',
                backgroundColor: '#618a2a',
                stack: 'Stack 2',
                data: [chartData[1]],
              },
            ],
          },
          options: {
            responsive: true,
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Lifetime Present Value',
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
      },
    },
  };
</script>
