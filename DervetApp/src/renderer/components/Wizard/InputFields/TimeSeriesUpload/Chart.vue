<template>
  <div class="row">
    <div class="col-md-12" :id="getChartId()">
    </div>
  </div>
</template>

<script>
  import Plotly from 'plotly.js';

  export default {
    props: {
      chartKey: String,
      columnHeaderName: String,
      data: Array,
      displayName: String,
      unit: String,
      timeSeriesXAxis: Array,
    },
    mounted() {
      this.createChartUploadedDataPlot(this.getChartId());
    },
    updated() {
      this.createChartUploadedDataPlot(this.getChartId());
    },
    methods: {
      getChartId() {
        return `${this.chartKey}${this.displayName}`;
      },
      createChartUploadedDataPlot(chartId) {
        const ctx = document.getElementById(chartId);
        const uploadedTS = {
          x: this.timeSeriesXAxis,
          y: this.data,
          unit: this.unit,
          mode: 'lines',
          name: '', // this.firstLetterCapitalized,
          hovertemplate: `%{y:.3f} ${this.unit}`,
        };
        const data = [uploadedTS];
        const layout = {
          // showlegend: true,
          legend: {
            orientation: 'h', // 'v'
            x: 0,
            y: 1.12,
          },
          height: 310,
          modebar: {
            orientation: 'v', // 'h' set how modebar will appear
          },
          title: {
            text: this.columnHeaderName,
            font: {
              size: 20,
            },
            yanchor: 'top',
          },
          yaxis: {
            title: {
              text: this.unit,
              font: {
                size: 12,
              },
              standoff: 0,
            },
          },
          xaxis: {
            rangeslider: {
              thickness: 0.06,
            },
            title: {
              text: '',
              font: {
                size: 12,
              },
              standoff: 30, // create gap between axis and title
            },
            // layer: 'below traces',
          },
          margin: {
            l: 50, // 80 is default
            r: 60, // 80 is default
            t: 20, // 100 is default
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
            filename: `${this.displayName.replace(/ /g, '-')}-uploaded-data-plot`,
          },
          modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'resetScale2d'],
        };
        return Plotly.newPlot(ctx, data, layout, config);
      },
    },
  };
</script>