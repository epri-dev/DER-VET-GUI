import { v4 as uuidv4 } from 'uuid';

// allow for up to 4 sets of TS data on a single page (user-defined services)
const csvUploadMixin = {
  data() {
    return {
      inputTimeseries: null,
      childKey: uuidv4(),

      inputTimeseries2: null,
      childKey2: uuidv4(),

      inputTimeseries3: null,
      childKey3: uuidv4(),

      inputTimeseries4: null,
      childKey4: uuidv4(),
    };
  },
  methods: {
    receiveTimeseriesData(timeseries) {
      this.childKey = uuidv4();
      this.inputTimeseries = timeseries;
    },
    receiveTimeseriesData2(timeseries) {
      this.childKey2 = uuidv4();
      this.inputTimeseries2 = timeseries;
    },
    receiveTimeseriesData3(timeseries) {
      this.childKey3 = uuidv4();
      this.inputTimeseries3 = timeseries;
    },
    receiveTimeseriesData4(timeseries) {
      this.childKey4 = uuidv4();
      this.inputTimeseries4 = timeseries;
    },
  },
};

export default csvUploadMixin;
