import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import DropDownInput from '@/components/Wizard/InputFields//DropDownInput';
import RadioButtonInput from '@/components/Wizard/InputFields//RadioButtonInput';
import NavButtons from '@/components/Shared/NavButtons';
import TextInput from '@/components/Wizard/InputFields//TextInput';
import TimeSeriesUpload from '@/components/Wizard/InputFields//TimeSeriesUpload/Layout';
import MetadataFactory from '@/models/Project/Metadata/Factory';
import CollectionTypes from '@/models/Project/CollectionTypes';
import { FieldListFactory } from '@/models/Project/constants';
import ValidationService from '@/service/Validation/ValidationService';
import * as a from '@/store/actionTypes';
import operateOnKeysList from '@/util/object';
import {
  getFieldKeys,
  getDefaultValue,
  getTimeSeriesFieldKeys,
  getValueFieldKeys,
  metadataCollectionToValidationSchema,
} from '@/service/ProjectPage';
import {
  requiredMsg,
  decimalMsg,
  integerMsg,
  betweenMsg,
  maxMsg,
  minMsg,
} from '@/service/Validation/Values/messages';
import { WIZARD_COMPONENT } from '@/router/constants';

export default {
  components: {
    DropDownInput,
    RadioButtonInput,
    TextInput,
    TimeSeriesUpload,
    NavButtons,
  },
  beforeMount() {
    // We want to show validation errors at any time after the first save if submitted is true
    if (this.submitted && this.$v !== undefined) {
      this.$v.$touch();
      this.resetAllNonRequired();
    }
  },
  validations() {
    return this.validationSchema;
  },
  computed: {
    mergedProject() {
      const mergedProject = _.cloneDeep(this.$store.state.Project);
      // TODO this only handles when collectionType = Project
      // mergedProject[this.collectionType][this.id]
      _.each(this.allFields, field => { mergedProject[field] = this[field]; });
      return mergedProject;
    },
    timeSeriesErrors() {
      return _.reduce(this.timeSeriesFields, (result, field) => {
        const error = this.getSingleTimeSeriesError(field);
        if (error !== '') { result[field] = error; }
        return result;
      }, {});
    },
  },
  methods: {
    getData(collectionType, page, destinationPath = WIZARD_COMPONENT) {
      const metadata = this.getPageMetadata(page, collectionType);
      const fields = this.getPageFields(metadata);
      return {
        chartKey: uuidv4(),
        collectionType,
        destinationPath,
        metadata,
        page,
        submitted: this.getPageSubmitted(page, this.id),
        validationSchema: metadataCollectionToValidationSchema(metadata),
        ...fields,
        ...this.getPageData(fields.allFields, { type: collectionType, id: this.id }),
      };
    },
    getPageMetadata(page, collectionType = CollectionTypes.Project) {
      const meta = MetadataFactory.getMetadata(collectionType);
      return collectionType === CollectionTypes.Project ? this.filterMetadata(meta, page) : meta;
    },
    getPageFields(metadata) {
      return {
        timeSeriesFields: getTimeSeriesFieldKeys(metadata),
        valueFields: getValueFieldKeys(metadata),
        allFields: getFieldKeys(metadata),
      };
    },
    getPageSubmitted(page, id) {
      return this.$store.getters['Application/isPageSubmitted'](page, id);
    },
    getPageData(fields, collectionDetails = { type: CollectionTypes.Project }) {
      const collection = this.getCollection(collectionDetails);
      return operateOnKeysList(collection, fields, f => f);
    },
    filterMetadata(metadata, page) {
      const fields = FieldListFactory.get(page);
      return _.pick(metadata, fields);
    },
    getCollection(collectionDetails) {
      const { type, id } = collectionDetails;
      if (type === CollectionTypes.Project) return this.$store.state.Project;
      return this.$store.getters.getCollectionItemById(type, id).values;
    },
    getErrorMsg(field) {
      return this.getErrorMsgWrapped(this.validationSchema, this.$v, field);
    },
    getErrorMsgWrapped(validation, $v, field) {
      return this.getErrorMsgWithMetadata(validation, $v, field, this.metadata);
    },
    // This method returns a single validation error message (String)
    getErrorMsgWithMetadata(validation, $v, field, metadata) {
      const fieldMetadata = metadata[field];
      const { displayName, minValue, maxValue } = fieldMetadata;

      // NOTE: the ordering of each if-block is intentional here
      if (!$v[field].required) return requiredMsg(displayName);
      if (validation[field].decimal && !$v[field].decimal) return decimalMsg(displayName);
      if (validation[field].integer && !$v[field].integer) return integerMsg(displayName);
      if (validation[field].between && !$v[field].between) {
        return betweenMsg(displayName, minValue, maxValue);
      }
      if (validation[field].minValue && !$v[field].minValue) return minMsg(displayName, minValue);
      if (validation[field].maxValue && !$v[field].maxValue) return maxMsg(displayName, maxValue);
      return '';
    },
    setData(data) {
      const { fieldName, value } = data;
      this[fieldName] = value;
      // This triggers rerendering of timeseries chart
      this.chartKey = uuidv4();
    },
    validatedSaveContinue() {
      this.validatedSave();
      // Make this a then
      this.$router.push({ path: this.destinationPath });
    },
    validatedSave() {
      this.submitted = true;
      this.$v.$touch();
      this.saveErrorList();
      this.save();
    },
    saveErrorList() {
      // TODO when validation is external to components, this can be part of subscribed
      // validation upon project changes
      this.$store.dispatch(`Application/${a.SET_PAGE_STATUS}`, this.getPageStatusPayload());
    },
    getPageStatusPayload() {
      return {
        page: this.page,
        id: this.id,
        pageStatus: {
          errors: this.getErrors(),
          submitted: this.submitted,
        },
      };
    },
    getErrors() {
      return {
        ...this.getValueErrors(),
        ...this.getTimeSeriesErrors(),
        ...this.getOtherError(),
      };
    },
    // Rename across-field error?
    getOtherError() { return {}; },
    getValueErrors() {
      const errors = _.mapValues(this.$v, (value, key) => {
        if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
          return this.getErrorMsg(key);
        } return null;
      });
      return _.pickBy(errors, value => value !== null);
    },
    getTimeSeriesErrors() {
      return _.reduce(this.timeSeriesFields, (result, field) => {
        const error = this.getSingleTimeSeriesError(field);
        if (error !== '') { result[field] = error; }
        return result;
      }, {});
    },
    getSingleTimeSeriesError(field) {
      return ValidationService.validateTimeSeriesField(field, this[field], this.mergedProject);
    },
    save() {
      const payload = _.map(this.allFields, field => ({ key: field, value: this[field] }));
      this.$store.dispatch(a.SET_VALUES, payload);
    },
    saveCollectionItem() {
      this.$store.dispatch(a.REPLACE_COLLECTION_ITEM, {
        collectionType: this.collectionType,
        id: this.id,
        values: this.buildCollectionItemFromPageData(),
      });
    },
    buildCollectionItemFromPageData() {
      return operateOnKeysList(this, this.allFields, f => f);
    },
    resetAllNonRequired() {},
    resetNonRequired(list) {
      return list.forEach((field) => {
        this[field] = getDefaultValue(this.metadata[field]);
      });
    },
    isValueError() {
      return this.$v.$anyError;
    },
    isTimeSeriesError() {
      return _.some(this.timeSeriesFields, field => (
        this.timeSeriesErrors[field] !== '' && this.timeSeriesErrors[field] !== undefined
      ));
    },
    showSaveButtonErrorMessage() {
      return this.submitted && (this.isValueError() || this.isTimeSeriesError());
    },
    showTimeSeriesErrorMessage() {
      return this.submitted && this.isTimeSeriesError();
    },
  },
};
