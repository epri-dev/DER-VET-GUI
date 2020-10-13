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
                  <router-link
                  :to="this.pagePaths.resultsFinancial">
                  View Detailed Financials Results...
                  </router-link>
                </a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  <router-link
                  :to="this.pagePaths.resultsReliability">
                  View Detailed Reliability Results...
                  </router-link>
                </a>
              </div>
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  <router-link
                  :to="this.pagePaths.resultsDeferral">
                  View Detailed Deferral Results...
                  </router-link>
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
                  <div
                    id="chartBatteryDispatchHeatMap">
                  </div>
                </div>
              </div>
              <div class="buffer-top text-center">
                <a class="btn btn-sm btn-default">
                  <router-link
                  :to="this.pagePaths.resultsDispatch">
                  View Detailed Dispatch Results...
                  </router-link>
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
                  <router-link
                  :to="this.pagePaths.resultsDesign">
                  View Detailed Design Results...
                  </router-link>
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
  import Plotly from 'plotly.js';
  import { costBenefitSummaryData } from '@/models/Results/CostBenefitData';
  import { formatYAxisCurrency, formatXAxis6Hour, formatYAxis, arrayMax } from '@/util/chart';

  // TODO import this dummy data from store.Results
  const peakLoadDayValues = [613, 613, 613, 1105, 745, 2103,
    2278, 3477, 3446, 3378, 3399, 3292, 3485, 3566, 3711,
    3914, 3531, 2870, 2743, 2467, 2414, 1443, 1559, 1330];
  const peakLoadDayLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  export default {
    data() {
      const p = this.$store.state.Project;
      return {
        pagePaths: p.paths,
      };
    },
    mounted() {
      this.createChartCostBenefit('chartCostBenefit', costBenefitSummaryData);
      this.createChartPeakLoadDay('chartPeakLoadDay', [peakLoadDayValues, peakLoadDayLabels]);
      this.createChartBatteryDispatchHeatMap('chartBatteryDispatchHeatMap');
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

      createChartBatteryDispatchHeatMap(chartId) {
        const ctx = document.getElementById(chartId);
        const xtot = 365;
        const xstart = (new Date('2017-01-01')).getTime();
        const xx = [];
        const y1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        const zz = [[], []];
        const z = [-2300, 400, 1100, 2300];
        const z1 = [];
        for (let i = 0; i < xtot; i += 1) {
          xx[i] = new Date(xstart + (i * 8.64e7));
          z1[i] = z[(i % z.length)];
        }
        for (let j = 0; j < y1.length; j += 1) {
          zz[j] = z1;
        }
        const trace1 = {
          type: 'heatmap',
          x: xx,
          y: y1,
          z: zz,
          colorscale: 'Viridis', // ''YlGnBu',
          reversescale: true,
          colorbar: {
            thickness: 10,
            ticksuffix: ' kWh',
          },
          name: '', // appears in legend, and next to hovertemplate
          hovertemplate: 'Battery Power: <b>%{z:.0f}</b><br>%{x|%Y-%m-%d}<br>hour ending at hour %{y}',
        };
        const data = [trace1];
        const layout = {
          height: 280,
          modebar: {
            orientation: 'h', // 'h' set how modebar will appear
          },
          title: {
            text: 'Battery Dispatch',
            font: {
              size: 12,
            },
            y: 0.9,
          },
          xaxis: {
            title: {
              text: 'Time', // 'Days Since Project Start',
              font: {
                size: 12,
              },
              standoff: 30, // create gap between axis and title
            },
          },
          yaxis: {
            title: {
              text: 'Hour Ending',
              font: {
                size: 12,
              },
              standoff: 3, // create gap between axis and title
            },
            autorange: 'reversed',
            fixedrange: true,
            range: [0, 23],
            dtick: 4,
            tick0: 0,
          },
          margin: {
            l: 40, // 80 is default
            // r: 60, // 80 is default
            t: 45, // 100 is default
            b: 40, // 80 is default
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
            filename: 'battery-dispatch-heat-map',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>
