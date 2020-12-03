<template>
  <div>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="row">
          <div class="col-md-6">
            <h3>Dispatch</h3>
          </div>
        </div>
        <hr>
        <div class="form-group">
          <div class="col-md-12">
            <p>Hard Coded Data</p>
            <div id="chartDispatchTimeSeriesPlots">
            </div>
          </div>
        </div>
        <hr>
        <div class="form-group">
          <div class="col-md-12">
            <p>Hard Coded Data</p>
            <div id="chartEnergyPriceHeatMap">
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Plotly from 'plotly.js';
  import { RESULTS_PATH } from '@/router/constants';

  export default {
    mounted() {
      this.$store.dispatch('createDispatchPlots');
      this.createChartDispatchTimeSeriesPlots('chartDispatchTimeSeriesPlots');
      this.createChartEnergyPriceHeatMap('chartEnergyPriceHeatMap');
    },
    data() {
      const chartData = this.$store.state.ProjectResult.financialVueObjects;
      return {
        chartData,
        resultsPath: RESULTS_PATH,
      };
    },
    methods: {
      save() {
      },

      createChartDispatchTimeSeriesPlots(chartId) {
        const ctx = document.getElementById(chartId);
        const xtot = 8760;
        const xstart = (new Date('2017-01-01')).getTime();
        const xx = [];
        for (let i = 0; i < xtot; i += 1) {
          xx[i] = new Date(xstart + (i * 36e5));
        }

        const yyBatterySOC = [];
        const yBatterySOC = [0.5, 0.6, 0.7, 0.5, 1, 1, 1, 1, 0.8, 0.6, 0.5, 0.2];
        for (let i = 0; i < xtot; i += 1) {
          yyBatterySOC[i] = yBatterySOC[(i % yBatterySOC.length)];
        }
        const batterySOC = {
          x: xx,
          y: yyBatterySOC,
          mode: 'lines',
          name: 'Battery SOC',
        };

        const yyPoi = [];
        const yPoi = [-2e3, -600, 0, 0, 0, 0, 0, 0, -2e3, -2e3, 0, 0];
        for (let i = 0; i < xtot; i += 1) {
          yyPoi[i] = yPoi[(i % yPoi.length)];
        }
        const poi = {
          x: xx,
          y: yyPoi,
          mode: 'lines',
          name: 'POI power with reservations',
          fill: 'tozeroy',
          line: {
            shape: 'hv',
          },
          // xaxis: 'x',
          yaxis: 'y2',
        };

        const yykWPrices = [];
        const ykWPrices = [0, 0, 0, 0, 0, 0, 0,
          0.14, 0.12, 0.33, 0.41, 0.81, 0.77, 0.44, 0.22, 0.11, 0.02,
          0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < xtot; i += 1) {
          yykWPrices[i] = ykWPrices[(i % ykWPrices.length)];
        }
        const kWPrices = {
          x: xx,
          y: yykWPrices,
          mode: 'lines',
          name: '$/kW Prices',
          line: {
            shape: 'hv',
          },
          // xaxis: 'x',
          yaxis: 'y3',
        };

        const yykWhPrices = [];
        const ykWhPrices = [0, 0, 0, 0, 0, 0, 0,
          0.14, 0.12, 0.33, 0.41, 0.81, 0.77, 0.44, 0.22, 0.11, 0.02,
          0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < xtot; i += 1) {
          yykWhPrices[i] = ykWhPrices[(i % ykWhPrices.length)];
        }
        const kWhPrices = {
          x: xx,
          y: yykWhPrices,
          mode: 'lines',
          name: '$/kWh Prices',
          line: {
            shape: 'hv',
          },
          // xaxis: 'x',
          yaxis: 'y4',
        };

        const yyPower = [];
        const yPower = [5e3, 6e3, 7e3, 9.6e3, 7e3, 6e3, 6e3, 7e3, 3e3, 4e3, 5e3, 4e3];
        for (let i = 0; i < xtot; i += 1) {
          yyPower[i] = yPower[(i % yPower.length)];
        }
        const power = {
          x: xx,
          y: yyPower,
          mode: 'lines',
          name: 'Power by Technology',
          line: {
            shape: 'hv',
          },
          // xaxis: 'x',
          yaxis: 'y5',
        };

        const data = [batterySOC, poi, kWPrices, kWhPrices, power];
        // const data = [pv];
        const selectorOptions = {
          buttons: [
            {
              step: 'month',
              stepmode: 'backward', // 'todate',
              count: 1,
              label: '1m',
              visible: false,
            },
            {
              step: 'all',
            },
          ],
        };
        const layout = {
          // showlegend: false,
          // legend: {
          //   orientation: 'h', // 'v'
          //   x: 0,
          //   y: 1.12,
          // },
          height: 900,
          grid: {
            rows: 5,
            columns: 1,
            pattern: 'dependent',
            roworder: 'top to bottom',
          },
          modebar: {
            orientation: 'h', // 'h' set how modebar will appear
          },
          title: {
            text: '',
            font: {
              size: 25,
            },
            yanchor: 'top',
          },
          xaxis: {
            rangeslider: {
              thickness: 0.03,
            },
            rangeselector: selectorOptions,
            range: [xx[0], xx[23]],
            title: {
              text: '',
              font: {
                size: 12,
              },
              standoff: 30, // create gap between axis and title
            },
            // layer: 'below traces',
          },

          // add vertical space between plots
          yaxis5: {
            domain: [0.00, 0.192],
            title: {
              text: 'Power (kW)',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
          },
          yaxis4: {
            domain: [0.202, 0.394],
            title: {
              text: '$ / kWh',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
          },
          yaxis3: {
            domain: [0.404, 0.596],
            title: {
              text: '$ / kW',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
          },
          yaxis2: {
            domain: [0.606, 0.798],
            title: {
              text: 'Power (kW)',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
          },
          yaxis: {
            domain: [0.808, 1.00],
            fixedrange: true,
            tickformat: ',.0%', // format yaxis as a percent
            range: [0, 1.01],
            title: {
              text: 'SOC (%)',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
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
            filename: 'dispatch-time-series-plots',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },

      createChartEnergyPriceHeatMap(chartId) {
        const ctx = document.getElementById(chartId);
        const xtot = 365;
        const xstart = (new Date('2017-01-01')).getTime();
        const xx = [];
        const y1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        const zz = [[], []];
        const z = [0.054, 0.062, 0.062, 0.007];
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
          colorbar: {
            thickness: 10,
            tickprefix: '$ ',
            ticksuffix: ' kWh',
          },
          name: '', // appears in legend, and next to hovertemplate
          hovertemplate: 'Energy Price : <b>$ %{z:.3f}</b><br>%{x|%Y-%m-%d}<br>hour ending at hour %{y}',
        };
        const data = [trace1];
        const layout = {
          modebar: {
            orientation: 'h', // 'h' set how modebar will appear
          },
          title: {
            text: 'Energy Price Heat Map',
            font: {
              size: 25,
            },
            yanchor: 'top',
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
            l: 40,
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
            filename: 'energy-price-heat-map',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };

</script>
