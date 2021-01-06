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
            <div id="chartDispatchTimeSeriesPlots">
            </div>
          </div>
        </div>
        <hr>
        <div class="form-group">
          <div class="col-md-12">
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
    beforeMount() {
      this.$store.dispatch('createDispatchPlots');
    },
    mounted() {
      this.createChartDispatchTimeSeriesPlots('chartDispatchTimeSeriesPlots');
      this.createChartEnergyPriceHeatMap('chartEnergyPriceHeatMap');
    },
    data() {
      return {
        resultsPath: RESULTS_PATH,
      };
    },
    computed: {
      chartData() {
        return this.$store.state.Results.dispatchVueObjects;
      },
    },
    methods: {
      save() {
      },

      createChartDispatchTimeSeriesPlots(chartId) {
        const ctx = document.getElementById(chartId);
  
        const rawData = this.chartData.stackedLineData;
        const xx = rawData.timeSeriesDateAxis;

        const batterySOC = {
          x: rawData.timeSeriesDateAxis,
          y: rawData.aggregatedStateOfCharge,
          mode: 'lines',
          name: 'Aggregated ESS SOC',
        };

        // TODO - optionally add reservations
        const poi = {
          x: xx,
          y: rawData.netLoadKW,
          mode: 'lines',
          name: 'POI power with reservations',
          fill: 'tozeroy',
          line: {
            shape: 'hv',
          },
          // xaxis: 'x',
          yaxis: 'y2',
        };

        // TODO - optionally add
        // const yykWPrices = [];
        // const kWPrices = {
        //   x: xx,
        //   y: yykWPrices,
        //   mode: 'lines',
        //   name: '$/kW Prices',
        //   line: {
        //     shape: 'hv',
        //   },
        //   // xaxis: 'x',
        //   yaxis: 'y3',
        // };

        const kWhPrices = {
          x: xx,
          y: rawData.energyPriceKWh,
          mode: 'lines',
          name: '$/kWh Prices',
          line: {
            shape: 'hv',
          },
          // xaxis: 'x',
          yaxis: 'y4',
        };

        // const yyPower = [];
        // const yPower = [5e3, 6e3, 7e3, 9.6e3, 7e3, 6e3, 6e3, 7e3, 3e3, 4e3, 5e3, 4e3];
        // for (let i = 0; i < xtot; i += 1) {
        //   yyPower[i] = yPower[(i % yPower.length)];
        // }
        const power = [
          {
            x: xx,
            y: rawData.totalStoragePowerKW,
            mode: 'lines',
            name: 'Total Storage Net Power',
            line: {
              shape: 'hv',
            },
            // xaxis: 'x',
            yaxis: 'y5',
          },
          {
            x: xx,
            y: rawData.totalGenerationKW,
            mode: 'lines',
            name: 'Total Generation Power',
            line: {
              shape: 'hv',
            },
            // xaxis: 'x',
            yaxis: 'y5',
          },
          {
            x: xx,
            y: rawData.totalLoadKW,
            mode: 'lines',
            name: 'Total Load',
            line: {
              shape: 'hv',
            },
            // xaxis: 'x',
            yaxis: 'y5',
          },
          {
            x: xx,
            y: rawData.criticalLoadKW,
            mode: 'lines',
            name: 'Critial Load',
            line: {
              shape: 'hv',
            },
            // xaxis: 'x',
            yaxis: 'y5',
          },
        ];

        // const data = [batterySOC, poi, kWPrices, kWhPrices, power];
        const data = [batterySOC, poi, kWhPrices, ...power];
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
        const trace1 = {
          type: 'heatmap',
          ...this.chartData.heatMapData,
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
