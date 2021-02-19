<template>
  <div>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="row">
          <div class="col-md-6">
            <h3>Reliability</h3>
          </div>
        </div>
        <hr>
        <div v-if="chartData.showOutageContribution" class="form-group">
          <div class="col-md-12">
            <div id="chartOutageContribution">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12">
            <div id="chartLoadCoverageProbability">
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
      this.$store.dispatch('createReliabilityPlots');
    },
    mounted() {
      this.createChartLoadCoverageProbability('chartLoadCoverageProbability');
      if (this.chartData.showOutageContribution) {
        this.createChartOutageContribution('chartOutageContribution');
      }
    },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: RESULTS_PATH,
        reliabilityTarget: p.reliabilityTarget,
      };
    },
    computed: {
      chartData() {
        return this.$store.state.Results.reliabilityVueObjects;
      },
    },
    methods: {
      getColorFromTechnology(tech) {
        if (tech === 'pv') {
          return '#e2d06b';
        } if (tech === 'ess') {
          return '#a2c7db';
        } if (tech === 'genSet') {
          return '#99999';
        }
        return '#666666';
      },
      createChartOutageContribution(chartId) {
        const ctx = document.getElementById(chartId);
        const rawData = this.chartData.outageContribution;
        const xx = rawData.startDatetimeHb;
        const data = [];

        const pvData = rawData.pVOutageContributionKWh;
        if (pvData !== undefined) {
          const pvTrace = {
            x: xx,
            y: pvData,
            type: 'bar',
            name: 'PV Outage Contribution',
            hovertemplate: '%{y:,.0f} kWh',
            marker: {
              color: this.getColorFromTechnology('pv'),
            },
          };
          data.push(pvTrace);
        }
        const essData = rawData.storageOutageContributionKWh;
        if (essData !== undefined) {
          const essTrace = {
            x: xx,
            y: rawData.storageOutageContributionKWh,
            type: 'bar',
            name: 'ESS Outage Contribution',
            hovertemplate: '%{y:,.0f} kWh',
            marker: {
              color: this.getColorFromTechnology('ess'),
            },
          };
          data.push(essTrace);
        }
        const genSetData = rawData.generatorSetOutageContributionKWh;
        if (genSetData !== undefined) {
          const genSetTrace = {
            x: xx,
            y: rawData.generatorSetOutageContributionKWh,
            type: 'bar',
            name: 'Generator Set Outage Contribution',
            hovertemplate: '%{y:,.0f} kWh',
            marker: {
              color: this.getColorFromTechnology('genSet'),
            },
          };
          data.push(genSetTrace);
        }

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
              visible: false,
            },
          ],
        };
        const layout = {
          legend: {
            orientation: 'h', // 'v'
            x: 0,
            y: 1.04,
          },
          // showlegend: false,
          height: 600,
          modebar: {
            orientation: 'h', // 'h' set how modebar will appear
          },
          title: {
            text: `Energy Needed to Cover a ${this.reliabilityTarget}-Hour Outage`,
            font: {
              size: 25,
            },
            yanchor: 'top',
          },
          barmode: 'stack',
          bargap: 0,
          xaxis: {
            rangeslider: {
              thickness: 0.1,
            },
            rangeselector: selectorOptions,
            range: [xx[0], xx[23]],
            zeroline: true,
            title: {
              text: '',
              font: {
                size: 12,
              },
              standoff: 30, // create gap between axis and title
            },
            // layer: 'below traces',
          },
          yaxis: {
            title: {
              text: 'Energy Used to Cover Load (kWh)',
              font: {
                size: 12,
              },
              standoff: 5, // create gap between axis and title
            },
            tickformat: ',.0',
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
            filename: 'outage-contribution',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },

      createChartLoadCoverageProbability(chartId) {
        const ctx = document.getElementById(chartId);
        const trace1 = {
          x: this.chartData.loadCoverageProbability.outageLengthHrs,
          y: this.chartData.loadCoverageProbability.loadCoverageProbability,
          mode: 'lines+markers', // 'lines' 'markers'
          connectgaps: true, // ignore null values when true
          name: '', // appears in legend, and next to hovertemplate
          marker: {
            color: '#8B4513',
            width: 4,
          },
          line: {
            color: 'gray',
            width: 2,
            shape: 'spline', // 'linear', 'spline', 'hv', 'vh', 'hvh', 'vhv',
            // smoothing: 1.3, // with spline shape only; [0, 1.3], default is 1, 0 is linear
            dash: 'solid', // 'dot', 'dashdot',
          },
          // text: 'Probability', // text will appear below value on hover
          hovertemplate: 'Probability : <b>%{y:.2f}</b><br><b>%{x}</b> <i>hour</i> outage',
          cliponaxis: false, // clip markers/lines at axes when true (default)

        };
        const data = [trace1];
        const layout = {
          showlegend: false,
          modebar: {
            orientation: 'v', // 'h' set how modebar will appear
          },
          title: {
            text: 'Load Coverage Probability',
            font: {
              size: 25,
            },
          },
          xaxis: {
            title: {
              text: 'Outage Duration (hours)',
              font: {
                size: 12,
              },
            },
            // showgrid: false,
            // showline: false,
            // zeroline: false,
            // tickmode: 'linear', // 'auto', 'array',
            // type: 'linear', // '-', 'log', 'date'
            tick0: 0, // first tick mark will go here
            // dtick: 1, // tick interval
            fixedrange: true,
            // rangemode: 'tozero', // 'normal', 'nonnegative'
            // tickangle: 90,
            // showticksuffix: 'all', // 'first', 'last', 'none'
            // ticksuffix: 'h',
          },
          yaxis: {
            title: {
              text: 'Load Coverage Probability',
              font: {
                size: 12,
              },
              standoff: 25, // create gap between axis and title
            },
            range: [0, 1.005],
            dtick: 0.1,
            fixedrange: true,
            // hoverformat: '.2r',
            // showgrid: false,
            // showline: false,
            // zeroline: false,
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
            filename: 'load-coverage-probability',
          },
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>
