import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';
import startCase from 'lodash/startCase';
import operateOnKeysList from '@/util/object';
import { isNotNullAndNotUndefined, isNullOrUndefined } from '@/util/logic';
import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';
import MonthlyDataUpload from '@/components/Shared/MonthlyDataUpload';

const csvUploadMixin = {
  components: { TimeseriesDataUpload, MonthlyDataUpload },
  data() { },
  beforeMount() {
    // submitted is false initially; set it to true after the first save.
    // initially, complete is null; after saving, it is set to either true or false.
    // we want to show validation errors at any time after the first save, with submitted.
    if (isNotNullAndNotUndefined(this.complete)) {
      this.submitted = true;
      this.$v.$touch();
    }
  },
  computed: {
    complete() {
      // TODO: AE: if this.complete is not being used except for when error list is null
      //   before the first save, then it can be true otherwise.
      //   - do we even need this?
      const errors = this.$store.state.Application
        .errorList[this.CONSTANTS.PAGEGROUP][this.CONSTANTS.PAGEKEY][this.CONSTANTS.PAGE];
      return isNullOrUndefined(errors) ? null : errors.length === 0;
    },
    expectedRowCount() {
      if (this.timeseriesXAxis.length === 0) {
        return 'TBD';
      }
      return this.timeseriesXAxis.length;
    },
    // this property is triggered when there are no non-TS errors to the inputs on the page,
    //   and submitted is true
    isTSError() {
      return this.getErrorListTS().length !== 0;
    },
    timeseriesXAxis() {
      // the first timestamp should be Jan 1 of dataYear at timestep minutes
      //   to represent the period-ending value.
      return this.$store.getters.getTimeseriesXAxis;
    },
  },
  methods: {
    capitalize(str) {
      return startCase(str);
    },
    childKey(tsField) {
      return this[this.childKeyField(tsField)];
    },
    childKeyField(tsField) {
      return `${tsField}ChildKey`;
    },
    getChildKey() {
      return uuidv4();
    },
    getChildKeys(tsFields) {
      const childKeys = {};
      tsFields.forEach((tsField) => {
        childKeys[this.childKeyField(tsField)] = this.getChildKey();
      });
      return childKeys;
    },
    getDataFromProject(fields) {
      return operateOnKeysList(this.$store.state.Project, fields, f => f);
    },
    getErrorListPayload() {
      const errors = [];
      Object.keys(this.$v).forEach((key) => {
        if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
          errors.push(this.getErrorMsg(key));
        }
      });
      // get TS errorlist, and append it
      const tsErrors = this.getErrorListTS();
      errors.push(tsErrors);
      return {
        pageGroup: this.CONSTANTS.PAGEGROUP,
        pageKey: this.CONSTANTS.PAGEKEY,
        page: this.CONSTANTS.PAGE,
        errorList: flatten(errors),
      };
    },
    getErrorMsgTS(tsField) {
      return `${this.capitalize(this.metadata[tsField].displayName)} Data are required`;
    },
    getErrorMsgTSFromProject(tsField) {
      // this method also revalidates the TS to reset the errors
      const errorMsgTS = this.requiredDataLabel(tsField);
      if (this.tsData(tsField).data.length === 0
        || (!this.isMonthly(tsField)
        && this.tsData(tsField).revalidate(this.expectedRowCount).length !== 0)
        || (this[tsField].data.length === 0 && !this[this.useExistingField(tsField)])) {
        return errorMsgTS;
      }
      return '';
    },
    getMetadata(projectMetadata, fields) {
      return operateOnKeysList(projectMetadata, fields, f => f);
    },
    getTSInputDefaultDataFromProject(tsFields) {
      const inputTS = {};
      tsFields.forEach((tsField) => {
        inputTS[this.inputField(tsField)] = null;
      });
      return inputTS;
    },
    getUseExistingDefaults(tsFields) {
      const useExistingDefaults = {};
      tsFields.forEach((tsField) => {
        useExistingDefaults[this.useExistingField(tsField)] = true;
      });
      return useExistingDefaults;
    },
    isMonthly(tsField) {
      return tsField.charAt(0) === 'm';
    },
    inputField(tsField) {
      return `${tsField}Input`;
    },
    requiredDataLabel(tsField) {
      const name = this[tsField].columnHeaderName;
      if (this.isMonthly(tsField)) {
        return `Monthly (12 values) of ${name} are required`;
      }
      return `A timeseries (${this.expectedRowCount} values) of ${name} is required`;
    },
    receiveMonthlyData(payload) {
      // TODO: AE: this is identical to receiveTimeseriesData; should it be?
      const { dataArray, objectName } = payload;
      // TODO: AE: I do not think this filtering is needed,
      //   given that we trim the last row off in onFileUpload() in DataUpload
      // dataArray.data = _.filter(dataArray.data, x => (x !== null) && (x !== undefined));
      this[this.inputField(objectName)] = dataArray;
    },
    receiveRemove(payload) {
      const { objectName } = payload;
      // remove data by overwriting with an empty data object
      const emptyData = cloneDeep(this[objectName]);
      emptyData.data = [];
      this.$store.dispatch(this.metadata[objectName].actionSetName, emptyData);
      this[objectName] = cloneDeep(emptyData);
      // set input Data object to null
      this[this.inputField(objectName)] = null;
      // set errorList
      this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
    },
    receiveTimeseriesData(payload) {
      const { dataArray, objectName } = payload;
      // TODO: AE: I do not think this filtering is needed,
      //   given that we trim the last row off in onFileUpload() in DataUpload
      // dataArray.data = _.filter(dataArray.data, x => (x !== null) && (x !== undefined));
      this[this.inputField(objectName)] = dataArray;
    },
    receiveUseExisting(payload) {
      const { button, objectName } = payload;
      this[this.useExistingField(objectName)] = button;
    },
    resetNonRequired(list) {
      list.forEach((item) => {
        this[item] = this.metadata[item].defaultValue;
      });
      return true;
    },
    save(fields) {
      fields.forEach((field) => {
        this.$store.dispatch(
          this.metadata[field].actionSetName,
          this[field],
        );
      });
    },
    tsData(tsField) {
      const inputTSDataExists = (this[this.inputField(tsField)] !== null);
      return (inputTSDataExists) ? this[this.inputField(tsField)] : this[tsField];
    },
    tsSave(tsFields) {
      // only save uploaded data (if it exists, and useExisting is true)
      tsFields.forEach((tsField) => {
        if (this[this.inputField(tsField)] !== null && this[this.useExistingField(tsField)]) {
          this.$store.dispatch(
            this.metadata[tsField].actionSetName,
            this[this.inputField(tsField)],
          );
        }
      });
    },
    useExistingField(tsField) {
      return `${tsField}UseExisting`;
    },
    validatedSave() {
      this.submitted = true;
      this.$v.$touch();
      // save
      this.tsSave(this.CONSTANTS.TS_FIELDS);
      this.save(this.CONSTANTS.FIELDS);
      // set errorList (important to do this AFTER tsSave())
      this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
    },
    validatedSaveContinue() {
      this.validatedSave();
      this.$router.push({ path: this.CONSTANTS.DESTINATION_PATH });
    },
    validatedSaveStay() {
      this.validatedSave();
    },
  },
};

export default csvUploadMixin;
