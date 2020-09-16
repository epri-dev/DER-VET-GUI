<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3>Reliability</h3>
      </div>
    </div>
    <hr>
    <form>
      <div class="form-group">
        <div class="col-md-12">
          <div
            id="chartOutageContribution">
          </div>
        </div>
      </div>
    </form>
    <hr>
    <form>
      <div class="form-group">
        <div class="col-md-12">
          <div
            id="chartLoadCoverageProbability">
          </div>
        </div>
      </div>
    </form>
    <hr />
    <!-- TODO get rid of save & continue button -->
    <nav-buttons
      :back-link="resultsPath"
      back-text="<< Return to results summary"
    />
  </div>
</template>

<script>
  import Plotly from 'plotly.js';
  import NavButtons from '@/components/Shared/NavButtons';

  export default {
    components: { NavButtons },
    mounted() {
      this.createChartLoadCoverageProbability('chartLoadCoverageProbability');
      this.createChartOutageContribution('chartOutageContribution');
    },
    data() {
      const p = this.$store.state.Project;
      return {
        resultsPath: p.paths.results,
        reliabilityTarget: p.reliabilityTarget,
      };
    },
    methods: {

      getColorFromTechnology(tech) {
        if (tech === 'pv') {
          return '#e2d06b';
        } else if (tech === 'ess') {
          return '#a2c7db';
        } else if (tech === 'ice') {
          return '#99999';
        }
        return '#666666';
      },

      createChartOutageContribution(chartId) {
        const ctx = document.getElementById(chartId);
        const xtot = 8760;
        const xstart = (new Date('2017-01-01')).getTime();
        const xx = [];
        for (let i = 0; i < xtot; i += 1) {
          xx[i] = new Date(xstart + (i * 36e5));
        }

        const yyPV = [];
        const yPV = [0, 0, 0, 0,
          15, 78.889, 440, 862, 1315, 1764, 1907,
          1874, 1508, 1012, 508, 119, 16,
          0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < xtot; i += 1) {
          yyPV[i] = yPV[(i % yPV.length)];
        }
        const pv = {
          x: xx,
          y: yyPV,
          type: 'bar',
          name: 'PV Outage Contribution',
          hovertemplate: '%{y:.0f} kWh',
          marker: {
            color: this.getColorFromTechnology('pv'),
          },
        };

        const yyESS = [];
        const yESS = [5341, 5360, 5157, 5312, 5411, 5328, 5295, 5030,
          4733, 4550, 4362, 4087, 4157, 4358, 4678, 5215, 5518, 5593,
          5623.36545, 5711, 5747, 5607, 5450, 5152];
        for (let i = 0; i < xtot; i += 1) {
          yyESS[i] = yESS[(i % yESS.length)];
        }
        const ess = {
          x: xx,
          y: yyESS,
          type: 'bar',
          name: 'ESS Outage Contribution',
          hovertemplate: '%{y:.0f} kWh',
          marker: {
            color: this.getColorFromTechnology('ess'),
          },
        };

        const data = [pv, ess];
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
          x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13],
          y: [1, 1, 1, 1, 0.99, 9.411 / 10, 8.999 / 10, 0.8, 3 / 4.1, 2 / 3, 1 / 2.004, null, 0.0],
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
            dtick: 1, // tick interval
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
