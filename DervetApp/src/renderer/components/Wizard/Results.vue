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
            <div class="col-md-6">
              <h4 class="result-summary-title">
              <a>
                Reliability Summary
              </a>
              </h4>
              <div class="form-group">
                <div class="col-md-12">
                  <canvas
                  id="chartReliability"
                  class="chartjs-render-monitor">
                  </canvas>
                </div>
              </div>
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  View Detailed Reliability Results...
                </a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h4 class="result-summary-title">
              <a>
                Dispatch Summary
              </a>
              </h4>
              <div class="form-group">
                <div class="col-md-12">
                  <!-- <canvas
                  id="chartCostBenefit"
                  class="chartjs-render-monitor">
                  </canvas> -->
                </div>
              </div>
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  View Detailed Dispatch Results...
                </a>
              </div>
            </div>
            <div class="col-md-6">
              <h4 class="result-summary-title">
              <a>
                Design Summary
              </a>
              </h4>
              <div class="form-group">
                <div class="col-md-12">
                  <canvas
                  id="chartPeakLoadDay"
                  class="chartjs-render-monitor">
                  </canvas>
                </div>
              </div>
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  View Detailed Design Results...
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

  import { formatYAxisCurrency, formatXAxis6Hour, formatYAxis, arrayMax } from '@/util/chart';

  // TODO import this dummy data from store.Results
  const chartData = [210000000, 390000000];
  const peakLoadDayValues = [613, 613, 613, 1105, 745, 2103,
    2278, 3477, 3446, 3378, 3399, 3292, 3485, 3566, 3711,
    3914, 3531, 2870, 2743, 2467, 2414, 1443, 1559, 1330];
  const peakLoadDayLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const reliabilityValues = [0.5, 0.3, 0.2];
  const reliabilityLabels = ['ICE', 'ESS', 'PV'];

  export default {
    mounted() {
      this.createChartCostBenefit('chartCostBenefit', chartData);
      this.createChartPeakLoadDay('chartPeakLoadDay', [peakLoadDayValues, peakLoadDayLabels]);
      this.createChartReliability('chartReliability', reliabilityValues, reliabilityLabels);
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
              xAxes: [
                {
                  stacked: true,
                  gridLines: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  stacked: true,
                  ticks: {
                    callback: formatYAxisCurrency,
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Value ($)',
                  },
                },
              ],
            },
          },
        });
      },
      createChartReliability(chartID, chartData, chartLabels) {
        const ctx = document.getElementById('chartReliability');
        const orderedBackgroundColors = [];
        for (let i = 0; i < chartLabels.length; i += 1) {
          const derType = chartLabels[i];
          if (derType === 'PV') {
            orderedBackgroundColors.push('#e2d06b');
          } else if (derType === 'ESS') {
            orderedBackgroundColors.push('#a2c7db');
          } else if (derType === 'ICE') {
            orderedBackgroundColors.push('#999999');
          } else {
            orderedBackgroundColors.push('#666666');
          }
        }
        function labels(tooltipItem, data) {
          return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]}%`;
        }
        return new Chart(ctx, {
          type: 'pie',
          data: {
            datasets: [{
              data: chartData,
              backgroundColor: orderedBackgroundColors,
            }],
            labels: chartLabels,
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Reliability contribution',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
            tooltips: {
              callbacks: {
                label: labels,
              },
            },
          },
        });
      },
      createChartPeakLoadDay(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const dataDay = '8/17/2030';
        // const storageSizeChartYMax = 2000;
        // const storageSizeChartYMin = 1000;
        // const storageSizeChartXMax = 23;
        // const storageSizeChartXMin = 19;
        const peakLoadDayYAxisMax = arrayMax(chartData[0]);
        const peakLoadDayOptions = {
          responsive: true,
          legend: false,
          title: {
            display: true,
            text: `Peak Load Day on ${dataDay}`,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  callback: formatXAxis6Hour,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  callback: formatYAxis,
                  beginAtZero: true,
                  max: peakLoadDayYAxisMax,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Load (kW)',
                },
              },
            ],
          },
        };
        // if (storageSizeChartYMin !== storageSizeChartYMax) {
        //   // TODO this is not rendering
        //   peakLoadDayOptions.annotation = {
        //     drawTime: 'afterDatasetsDraw',
        //     annotations: [{
        //       type: 'box',
        //       xScaleID: 'x-axis-0',
        //       yScaleID: 'y-axis-0',
        //       xMin: storageSizeChartXMin,
        //       xMax: storageSizeChartXMax,
        //       yMin: storageSizeChartYMin,
        //       yMax: storageSizeChartYMax,
        //       backgroundColor: 'rgba(162, 199, 219, 0.5)',
        //       borderColor: 'rgb(162, 199, 219)',
        //       borderWidth: 1,
        //     }],
        //   };
        // }
        return new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartData[1],
            datasets: [
              {
                label: 'Load (kW)',
                data: chartData[0],
                backgroundColor: '#8B4513',
                barPercentage: 1.0,
                categoryPercentage: 1.0,
              },
            ],
          },
          options: peakLoadDayOptions,
        });
      },
    },
  };
</script>
