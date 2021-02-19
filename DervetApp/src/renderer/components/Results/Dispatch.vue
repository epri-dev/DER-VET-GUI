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
  import _ from 'lodash';
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
      getColorFromTechnology(tech) {
        if (tech === 'pv') {
          return '#e2d06b';
        } if (tech === 'ess') {
          return '#a2c7db';
        } if (tech === 'genSet') {
          return '#99999';
        } if (tech === 'ev') {
          return '#a1eda5';
        }
        return '#666666';
      },
      createChartDispatchTimeSeriesPlots(chartId) {
        const ctx = document.getElementById(chartId);
        const data = [];
        const rawData = this.chartData.stackedLineData;
        const xx = rawData.timeSeriesDateAxis;

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
          barmode: 'relative',
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

        // BUILD LAYOUT AND DATA
        let trace = null;
        const buffer = 0.02;
        let totalNumPlots = 5 - (rawData.hasReservations ? 0 : 1);
        totalNumPlots -= (rawData.aggregatedSOC.data !== null ? 0 : 1);
        console.log(`total number of plots ${totalNumPlots}`);
        const subPlotHeight = (1 / totalNumPlots) - buffer;
        let lastPlotHeight = 0;

        // 1) Net load
        _.forEach(rawData.poiPower, (value) => {
          trace = {
            legendgroup: 'poiPower',
            x: xx,
            y: value.data,
            mode: 'lines',
            type: 'scatter',
            name: value.label,
            // fill: rawData.hasReservations ? 'tozeroy' : 'none',
            line: {
              shape: 'vh',
            },
            // xaxis: 'x',
            yaxis: 'y5',
          };
          data.push(trace);
        });
        // add reservations on top (if included in data)
        _.forEach(rawData.reservations, (value) => {
          trace = {
            legendgroup: 'reservations',
            x: xx,
            y: value.data,
            type: 'bar',
            name: value.label,
            yaxis: 'y5',
          };
          data.push(trace);
        });
        // console.log([lastPlotHeight, lastPlotHeight + subPlotHeight]);
        layout.yaxis5 = {
          domain: [lastPlotHeight, lastPlotHeight + subPlotHeight],
          title: {
            text: 'Power (kW)',
            font: {
              size: 12,
            },
            standoff: 5, // create gap between axis and title
          },
        };
        // increment plot height
        lastPlotHeight = lastPlotHeight + subPlotHeight + buffer;

        // 2) Energy Price
        const energyPriceData = rawData.energyPrice;
        trace = {
          x: xx,
          y: energyPriceData.data,
          mode: 'lines',
          type: 'scatter',
          name: energyPriceData.label,
          line: {
            shape: 'vh',
          },
          // xaxis: 'x',
          yaxis: 'y4',
        };
        data.push(trace);
        console.log([lastPlotHeight, lastPlotHeight + subPlotHeight]);
        layout.yaxis4 = {
          domain: [lastPlotHeight, lastPlotHeight + subPlotHeight],
          title: {
            text: 'Energy Price',
            font: {
              size: 12,
            },
            standoff: 5, // create gap between axis and title
          },
        };
        // increment plot height
        lastPlotHeight = lastPlotHeight + subPlotHeight + buffer;

        // 3) Market/Capacity Prices
        if (rawData.hasReservations) {
          _.forEach(rawData.marketPrices, (value) => {
            trace = {
              legendgroup: 'marketPrices',
              x: xx,
              y: value.data,
              mode: 'lines',
              type: 'scatter',
              name: value.label,
              line: {
                shape: 'vh',
              },
              // xaxis: 'x',
              yaxis: 'y3',
            };
            data.push(trace);
          });
          console.log([lastPlotHeight, lastPlotHeight + subPlotHeight]);
          layout.yaxis3 = {
            domain: [lastPlotHeight, lastPlotHeight + subPlotHeight],
            title: {
              text: '$ / kW',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
          };
          // increment plot height
          lastPlotHeight = lastPlotHeight + subPlotHeight + buffer;
        }

        // 4) All other power flows
        _.forEach(rawData.internalPower, (value) => {
          trace = {
            legendgroup: 'internalPower',
            x: xx,
            y: value.data,
            mode: 'lines',
            type: 'scatter',
            name: value.label,
            line: {
              shape: 'vh',
            },
            // xaxis: 'x',
            yaxis: 'y2',
          };
          data.push(trace);
        });
        console.log([lastPlotHeight, lastPlotHeight + subPlotHeight]);
        layout.yaxis2 = {
          domain: [lastPlotHeight, lastPlotHeight + subPlotHeight],
          title: {
            text: 'Power (kW)',
            font: {
              size: 12,
            },
            standoff: 5, // create gap between axis and title
          },
        };
        // increment plot height
        lastPlotHeight = lastPlotHeight + subPlotHeight + buffer;

        // 5) Aggregated SOC
        const essSocData = rawData.aggregatedSOC;
        if (essSocData.data !== null) {
          // add trace
          trace = {
            x: xx,
            y: essSocData.data,
            mode: 'lines',
            type: 'scatter',
            name: essSocData.label,
            yaxis: 'y',
            line: {
              shape: 'linear',
            },
            marker: {
              color: this.getColorFromTechnology('ess'),
            },
          };
          console.log([lastPlotHeight, lastPlotHeight + subPlotHeight]);
          data.push(trace);
          layout.yaxis = {
            domain: [lastPlotHeight, lastPlotHeight + subPlotHeight],
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
          };
        }
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
          hovermode: false,
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
