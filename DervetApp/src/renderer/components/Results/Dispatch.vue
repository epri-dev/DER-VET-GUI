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
        <div id="dispatch-container" class="results-dis-graph" style="position: static; zoom: 1;">
          <div class="form-group row">
            <div class="col-md-6" v-if="dataRange() !== null">
              <h5>{{ dataRange() }}</h5>
            </div>
            <div class="col-md-6 text-right">
              <b-dropdown :text="windowSizeText" 
                          toggle-class="form-control form-control-inline form-control-width-auto buffer-right">
                <b-dropdown-item v-for="option in sizes" v-bind:key="option.id"
                                 v-on:click.native="setCurrentDispatchData(option.value)">
                  {{option.text}}
                </b-dropdown-item>
              </b-dropdown>
            
              <button type="button" id="dispatch-prev" class="btn btn-default" @click="previousDispatchData"
                :disabled="disablePrev">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button type="button" id="dispatch-next" class="btn btn-default"  @click="nextDispatchData"
                :disabled="disableNext">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <!-- TODO keep for d3 plot 
          <div class="form-group text-center">
            <b-form-group>
              <b-form-checkbox-group buttons class="col-md-10" v-model="displayData">
                <b-form-checkbox value='SOC'>
                  SOC
                </b-form-checkbox>
                <b-form-checkbox value='Battery'>
                  Battery
                </b-form-checkbox>
                <b-form-checkbox value='PV'>
                  PV
                </b-form-checkbox>
                <b-form-checkbox value='Distributed Generation'>
                  Distributed Generation
                </b-form-checkbox>
                <b-form-checkbox value='Load'>
                  Load
                </b-form-checkbox>
                <b-form-checkbox value='Net Load'>
                  Net Load
                </b-form-checkbox>
              </b-form-checkbox-group>
              <b-form-checkbox-group buttons v-model="displayData" class="col-md-10">
                <b-form-checkbox value='Day Ahead'>
                  Day Ahead
                </b-form-checkbox>
                <b-form-checkbox value='Spinning Reserves'>
                  Spinning Reserves
                </b-form-checkbox>
                <b-form-checkbox value='Non-Spinning Reserves'>
                  Non-Spinning Reserves
                </b-form-checkbox>
                <b-form-checkbox value='Regulation'>
                  Regulation
                </b-form-checkbox>
                <b-form-checkbox value='Load Following'>
                  Load Following
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </div> -->
          <div class="form-group row text-center">
              <div class="col-md-1">
                <label>From:</label>
              </div>
              <div class="col-md-4">
                <b-form-datepicker v-model="dispatchFrom" :min="minDate" close-button placeholder="MM/DD/YYYY"
                  size="sm" :readonly="true" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  :max="dispatchTo ? dispatchTo : maxDate" locale="en" @onChange="setCustomDispatchData">
                </b-form-datepicker>
              </div>
            
              <div class="col-md-1">
                <label>To:</label>
              </div>
              <div class="col-md-4">
                <b-form-datepicker v-model="dispatchTo" :min="dispatchFrom ? dispatchFrom : minDate"
                  size="sm" :readonly="true" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  placeholder="MM/DD/YYYY" close-button :max="maxDate" locale="en"  @onChange="setCustomDispatchData">
                </b-form-datepicker>
              </div>
          </div>
        </div>
        <div class="col-md-12">
          <div id="chartDispatchTimeSeriesPlots">
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
  import moment from 'moment';
  import * as d3 from 'd3';
  import forEach from 'lodash/forEach';
  import find from 'lodash/find';
  import Plotly from 'plotly.js';
  import { RESULTS } from '@/router/constants';
  import DispatchData from '@/models/Results/DispatchData';
  import { TRACE_NAMES } from '@/models/Results/TimeSeriesData';

  export default {
    mounted() {
      this.createChartEnergyPriceHeatMap('chartEnergyPriceHeatMap');
      this.setCurrentDispatchData('days');
      this.createChartDispatchTimeSeriesPlots('chartDispatchTimeSeriesPlots');
    },
    data() {
      // TODO fixme
      const minDate = new Date(2017, 0, 1);
      const maxDate = new Date(2017, 11, 31);

      return {
        resultsPath: RESULTS,
        displayData: [],
        width: 500,
        height: 270,
        padding: 60,
        dispatchType: 'days',
        dispatchTo: null,
        dispatchFrom: null,
        minDate,
        maxDate,
        sizes: [
          { value: 'days', text: 'Day' },
          { value: 'weeks', text: 'Week' },
          { value: 'months', text: 'Month' },
          // { value: 'years', text: 'Year' },
          // { value: 'custom', text: 'Custom' },
        ],
      };
    },
    computed: {
      windowSizeText() {
        return find(this.sizes, { value: this.dispatchType }).text;
      },
      energyPriceMapData() {
        return this.$store.state.Results.dispatchEnergyPriceMapData;
      },
      dispatchData() {
        return this.$store.state.Results.dispatchData;
      },
      dispatchDataIterator() {
        if (this.dispatchData !== null) {
          const dispatchIter = new DispatchData(this.dispatchData, TRACE_NAMES);
          this.maxDate = dispatchIter.maxDate;
          this.minDate = dispatchIter.minDate;
          return dispatchIter;
        }
        return null;
      },
      rangeX() {
        const width = this.width - this.padding;
        return [0, width];
      },
      rangeY() {
        const height = this.height - this.padding;
        return [0, height];
      },
      viewBox() {
        return `0 0 ${this.width} ${this.height}`;
      },
      dispatchDataPayload() {
        return {
          currStartDate: this.dispatchFrom,
          currEndDate: this.dispatchTo,
          windowSize: this.dispatchType,
        };
      },
      // dipatchPlotData() {
      //   return this.chartData.stackedLineData.current(this.dispatchType);
      // },
      disableNext() {
        return moment(this.dispatchTo).isSameOrAfter(this.maxDate, 'day');
      },
      disablePrev() {
        return moment(this.dispatchFrom).isSameOrBefore(this.minDate, 'day');
      },
    },
    methods: {
      dataRange() {
        const momentFrom = moment(this.dispatchFrom).startOf('day');
        if (this.dispatchType === 'days') {
          return momentFrom.format('MMMM DD, YYYY');
        }
        if (this.dispatchType === 'months') {
          return momentFrom.format('MMMM YYYY');
        }
        const momentTo = moment(this.dispatchTo).startOf('day');
        if (momentTo.isSame(momentFrom)) {
          return momentFrom.format('MMMM DD, YYYY');
        }
        const startStr = momentFrom.format('MMMM DD, YYYY');
        const endStr = momentTo.format('MMMM DD, YYYY');
        return `${startStr} - ${endStr}`;
      },
      redrawDispatchItems() {
        this.dispatchFrom = this.dispatchDataIterator.currStartDate().toDate();
        this.dispatchTo = this.dispatchDataIterator.currEndDate().toDate();
        this.createChartDispatchTimeSeriesPlots('chartDispatchTimeSeriesPlots');
      },
      setCurrentDispatchData(windowSize) {
        this.dispatchDataIterator.setCurrentWindow(windowSize);
        this.dispatchType = windowSize;
        this.redrawDispatchItems();
      },
      setCustomDispatchData() {
        this.dispatchDataIterator.setCurrentWindow('custom', this.dispatchFrom, this.dispatchTo);
        this.dispatchType = 'custom';
        this.redrawDispatchItems();
      },
      nextDispatchData() {
        const { currStartDate, currEndDate, windowSize } = this.dispatchDataPayload;
        this.dispatchDataIterator.next(currStartDate, currEndDate, windowSize);
        this.redrawDispatchItems();
      },
      previousDispatchData() {
        const { currStartDate, currEndDate, windowSize } = this.dispatchDataPayload;
        this.dispatchDataIterator.previous(currStartDate, currEndDate, windowSize);
        this.redrawDispatchItems();
      },
      path(data) {
        const x = d3.scaleLinear().range(this.rangeX);
        const y = d3.scaleLinear().range(this.rangeY);
        d3.axisLeft().scale(x);
        d3.axisTop().scale(y);
        x.domain(d3.extent(data, (d, i) => i));
        y.domain([0, d3.max(data, d => d)]);
        return d3.line()
          .x((d, i) => x(i))
          .y(d => y(d));
      },
      line(data) {
        return this.path(data);
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
        const rawData = this.dispatchDataIterator.value;
        const data = [];
        const xx = rawData.timeSeriesDateAxis.data;
        const layout = {
          showlegend: true,
          legend: {
            orientation: 'h', // 'v'
            traceorder: 'group',
            xanchor: 'center',
            yanchor: 'top',
          },
          margin: {
            t: 0,
          },
          barmode: 'relative',
          height: 900,
          grid: {
            rows: 5,
            columns: 1,
            pattern: 'dependent',
            roworder: 'top to bottom',
          },
          xaxis: {
            title: {
              text: rawData.timeSeriesDateAxis.label,
              font: {
                size: 12,
              },
            },
          },
        };
  
        const config = {
          displaylogo: false, // hides the plotly logo from the modebar when false
          scrollZoom: false, // allows mouse wheel scroll when true
          staticPlot: true, // disable modebar options when true
          responsive: true, // responsive to window size
          autosizeable: true,
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png', // 'jpeg',
            filename: 'dispatch-time-series-plots',
          },
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'],
        };

        // BUILD LAYOUT AND DATA
        let trace = null;
        const buffer = 0.02;
        let totalNumPlots = 5 - (rawData.hasReservations ? 0 : 1);
        totalNumPlots -= (rawData.aggregatedSOC.data !== null ? 0 : 1);
        const subPlotHeight = (1 / totalNumPlots) - buffer;
        let lastPlotHeight = 0;

        // 1) Net load
        forEach(rawData.poiPower, (value) => {
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
        forEach(rawData.reservations, (value) => {
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
          forEach(rawData.marketPrices, (value) => {
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
        forEach(rawData.internalPower, (value) => {
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
          ...this.energyPriceMapData,
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
          responsive: true, // responsive to window size
          autosizeable: true,
          toImageButtonOptions: {
            // set defaults for saving plot image
            format: 'png', // 'jpeg',
            filename: 'energy-price-heat-map',
          },
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines'],
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>