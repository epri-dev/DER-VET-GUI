<template>
  <div>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="row">
          <div class="col-md-6">
            <h3>Results</h3>
          </div>
        </div>      
        <hr>
        <div class="form-group">
          <div class="row">
            <div class="col-md-12">
              <h4 class="result-summary-title">
                <a>Financials Summary</a>
              </h4>
            </div>
            <div class="col-md-12">
              <div id="chartPlotlyCostBenefit">
              </div>
            </div>
            <div class="col-md-12 buffer-bottom text-center">
              <a class="btn btn-sm btn-default">
                <router-link :to="paths.RESULTS_FINANCIAL">
                  View Detailed Financials Results...
                </router-link>
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4 class="result-summary-title">
                <a>Dispatch Summary</a>
              </h4>
            </div>
            <div class="col-md-12">
              <div id="chartBatteryDispatchHeatMap">
              </div>
            </div>
            <div class="col-md-12 buffer-bottom text-center">
              <a class="btn btn-sm btn-default">
                <router-link :to="paths.RESULTS_DISPATCH">
                  View Detailed Dispatch Results...
                </router-link>
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" v-if="summaryData.showDesign">
              <h4 class="result-summary-title">
                <a>Design Summary</a>
              </h4>
            </div>
          </div>
          <div class="col-md-12">
            <canvas id="chartPeakLoadDay"
                    class="chartjs-render-monitor"></canvas>
          </div>
          <div class="col-md-12 buffer-bottom text-center">
            <a class="btn btn-sm btn-default">
              <router-link :to="paths.RESULTS_DESIGN">
                View Detailed Design Results...
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import Plotly from 'plotly.js';
  import { formatYAxisCurrency, formatXAxis6Hour, formatYAxis, arrayMax } from '@/util/chart';
  import * as paths from '@/router/constants';

  export default {
    data() {
      return {
        paths,
      };
    },
    beforeMount() {
      this.$store.dispatch('createSummaryPlots');
    },
    mounted() {
      this.createPlotlyCostBenefit('chartPlotlyCostBenefit', this.summaryData.financial);
      if (this.summaryData.showDesign) {
        this.createChartPeakLoadDay('chartPeakLoadDay', this.summaryData.design);
      }
      this.createChartBatteryDispatchHeatMap('chartBatteryDispatchHeatMap');
    },
    computed: {
      results() {
        return this.$store.state.Results.data;
      },
      runInProgress() {
        return this.$store.state.Application.runInProgress;
      },
      summaryData() {
        return this.$store.state.Results.summaryVueObjects;
      },
    },
    methods: {
      createPlotlyCostBenefit(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const trace1 = {
          x: ['Cost ($)', 'Benefit ($)'],
          y: chartData,
          type: 'bar',
          marker: {
            color: 'rgb(142,124,195)',
          },
        };

        const data = [trace1];

        const layout = {
          hovermode: 'closest',
          title: {
            text: 'Lifetime Present Value',
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
          showlegend: false,
        };
        const config = {
          displaylogo: false, // hides the plotly logo from the modebar when false
          staticPlot: false, // disable modebar options when true
          responsive: true, // responsive to window size
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png', // 'jpeg',
            filename: 'peak-load-day',
          },
          displayModeBar: true,
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'],
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
      createChartPeakLoadDay(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        // const storageSizeChartYMax = 2000;
        // const storageSizeChartYMin = 1000;
        // const storageSizeChartXMax = 23;
        // const storageSizeChartXMin = 19;
        const peakLoadDayYAxisMax = arrayMax(chartData.loadKW);
        const peakLoadDayOptions = {
          responsive: true,
          legend: false,
          title: {
            display: true,
            text: `Peak Load Day on ${chartData.day}`,
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
            labels: chartData.timestepBeginning,
            datasets: [
              {
                label: 'Load (kW)',
                data: chartData.loadKW,
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
        const trace1 = {
          type: 'heatmap',
          ...this.summaryData.dispatchData,
          colorscale: 'Viridis', // ''YlGnBu',
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
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png', // 'jpeg',
            filename: 'battery-dispatch-heat-map',
          },
          displayModeBar: true,
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'],
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>
