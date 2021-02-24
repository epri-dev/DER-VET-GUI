import _ from 'lodash';

const csvUploadMixin = {
  data() {
    return {
      inputTimeseries: {},
      inputMonthly: {},
    };
  },
  methods: {
    receiveTimeseriesData(payload) {
      const { dataArray, dataName } = payload;
      dataArray.data = _.filter(dataArray.data, x => (x !== null) && (x !== undefined));
      this.inputTimeseries[dataName] = dataArray;
    },
    receiveMonthlyData(payload) {
      const { dataArray, dataName } = payload;
      dataArray.data = _.filter(dataArray.data, x => (x !== null) && (x !== undefined));
      this.inputMonthly[dataName] = dataArray;
    },
  },
};

export default csvUploadMixin;
