const csvUploadMixin = {
  data() {
    return {
      inputTimeseries: {},
    };
  },
  methods: {
    receiveTimeseriesData(payload) {
      const { key, timeseries } = payload;
      this.inputTimeseries[key] = timeseries;
    },
  },
};

export default csvUploadMixin;
