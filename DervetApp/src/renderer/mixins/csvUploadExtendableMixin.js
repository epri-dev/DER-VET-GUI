import { v4 as uuidv4 } from 'uuid';
import { flatten, startCase } from 'lodash';
import operateOnKeysList from '@/util/object';
import { isNotNullAndNotUndefined } from '@/util/logic';
import TimeseriesDataUpload from '@/components/Shared/TimeseriesDataUpload';

const csvUploadMixin = {
  components: { TimeseriesDataUpload },
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
  methods: {
    capitalize(str) {
      return startCase(str);
    },
    childKey(tsField) {
      const childKeyName = `${tsField}ChildKey`;
      return this[childKeyName];
    },
    getChildKey() {
      return uuidv4();
    },
    getChildKeys(tsFields) {
      const childKeys = {};
      tsFields.forEach((tsField) => {
        const childKeyField = `${tsField}ChildKey`;
        childKeys[childKeyField] = this.getChildKey();
      });
      console.log(childKeys);
      return childKeys;
    },
    /*
    getCompletenessPayload(constants) {
      console.log(this.$v);
      return {
        pageGroup: constants.PAGEGROUP,
        pageKey: constants.PAGEKEY,
        page: constants.PAGE,
        completeness: !this.$v.$invalid && !this.isTSError,
      };
    },
    */
    getConstants(tsField, constants) {
      return {
        setActionName: this.metadata[tsField].setActionName,
        ...constants,
      };
    },
    getDataFromProject(fields) {
      console.log(operateOnKeysList(this.$store.state.Project, fields, f => f));
      return operateOnKeysList(this.$store.state.Project, fields, f => f);
    },
    getErrorListPayload(constants) {
      const errors = [];
      Object.keys(this.$v).forEach((key) => {
        if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
          errors.push(this.getErrorMsg(key));
        }
      });
      // get TS errorlist, and append it
      const tsErrors = this.getErrorListTS();
      errors.push(tsErrors);
      console.log('errors:', flatten(errors));
      return {
        pageGroup: constants.PAGEGROUP,
        pageKey: constants.PAGEKEY,
        page: constants.PAGE,
        errorList: flatten(errors),
      };
    },
    getErrorMsgTS(tsField) {
      return `${this.capitalize(this.metadata[tsField].displayName)} Data is required`;
    },
    getTSInputDefaultDataFromProject(tsFields) {
      const inputTS = {};
      tsFields.forEach((tsField) => {
        console.log(tsField);
        const inputTSField = `${tsField}Input`;
        inputTS[inputTSField] = null;
      });
      console.log(inputTS);
      return inputTS;
    },
    getUseExistingDefaults(tsFields) {
      const useExistingDefaults = {};
      tsFields.forEach((tsField) => {
        const useExistingField = `${tsField}UseExisting`;
        useExistingDefaults[useExistingField] = true;
      });
      return useExistingDefaults;
    },
    receiveUseExisting(payload) {
      const { button, tsName } = payload;
      console.log(tsName);
      console.log(button);
      const tsNameButton = `${tsName}UseExisting`;
      this[tsNameButton] = button;
    },
    receiveTimeseriesData(payload) {
      const { dataArray, tsName } = payload;
      console.log(tsName);
      console.log(dataArray);
      const tsNameInput = `${tsName}Input`;
      this[tsNameInput] = dataArray;
    },
    tsData(tsField) {
      const tsFieldInput = `${tsField}Input`;
      const inputTSDataExists = (this[tsFieldInput] !== null);
      console.log(tsFieldInput, inputTSDataExists);
      return (inputTSDataExists) ? this[tsFieldInput] : this[tsField];
    },
    tsSave(tsFields) {
      // only save uploaded data (if it exists, and useExisting is true)
      tsFields.forEach((tsField) => {
        const inputTSField = `${tsField}Input`;
        const useExistingField = `${tsField}UseExisting`;
        if (this[inputTSField] !== null && this[useExistingField]) {
          this.$store.dispatch(this.metadata[tsField].setActionName, this[inputTSField]);
        }
      });
    },
  },
};

export default csvUploadMixin;
