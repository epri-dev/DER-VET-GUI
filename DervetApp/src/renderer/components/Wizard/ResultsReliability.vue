
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
            id="chartLoadCoverageProbability">
          </div>
        </div>
      </div>
      <div class="buffer-top text-center">
        <a class="btn btn-sm btn-default">
          View Detailed Financials Results...
        </a>
      </div>
    </form>

  </div>
</template>

<script>
  import Plotly from 'plotly.js';

  export default {
    mounted() {
      this.createChartLoadCoverageProbability('chartLoadCoverageProbability');
    },
    methods: {
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
            // range: [0, 1.005],
            dtick: 0.1,
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
