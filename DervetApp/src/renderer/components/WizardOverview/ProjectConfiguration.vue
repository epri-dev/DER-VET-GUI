<template>
  <div class="container body-content">

    <h3>Project Configuration</h3>
    <hr />

    <div class="form-horizontal form-buffer">

      <text-input
        v-model="name"
        :field="metadata.name"
        :isInvalid="submitted && $v.name.$error"
        :errorMessage="getErrorMsg('name')">
      </text-input>

      <text-input
        v-model="startYear"
        :field="metadata.startYear"
        :isInvalid="submitted && $v.startYear.$error"
        :errorMessage="getErrorMsg('startYear')">
      </text-input>

      <fieldset class="section-group">
        <legend>Analysis Window</legend>

        <radio-button-input
          v-model="analysisHorizonMode"
          :field="metadata.analysisHorizonMode"
          :isInvalid="submitted && $v.analysisHorizonMode.$error"
          :errorMessage="getErrorMsg('analysisHorizonMode')">
        </radio-button-input>

        <div v-if="analysisHorizonMode === '1'">
          <text-input
            v-model="analysisHorizon"
            :field="metadata.analysisHorizon"
            :isInvalid="submitted && $v.analysisHorizon.$error"
            :errorMessage="getErrorMsg('analysisHorizon')">
          </text-input>
        </div>
      </fieldset>

      <fieldset class="section-group">
        <legend>Time Series Data</legend>
          <text-input
            v-model="dataYear"
            :field="metadata.dataYear"
            :isInvalid="submitted && $v.dataYear.$error"
            :errorMessage="getErrorMsg('dataYear')">
          </text-input>

          <drop-down-input
            v-model="timestep"
            :field="metadata.timestep"
            :isInvalid="submitted && $v.timestep.$error"
            :errorMessage="getErrorMsg('timestep')">
          </drop-down-input>
      </fieldset>

      <radio-button-input
        v-model="gridLocation"
        :field="metadata.gridLocation"
        :isInvalid="submitted && $v.gridLocation.$error"
        :errorMessage="getErrorMsg('gridLocation')">
      </radio-button-input>

      <radio-button-input
        v-model="ownership"
        :field="metadata.ownership"
        :isInvalid="submitted && $v.ownership.$error"
        :errorMessage="getErrorMsg('ownership')">
      </radio-button-input>

      <fieldset class="section-group">
        <legend>Run Configuration</legend>
        <div class="row form-group">
          <div class="col-md-5 control-label">
            <b>Output Folder</b>
            <div>{{this.outputDirectory}}</div>
          </div>
          <file-picker
            label="Select folder"
            :callback="onOutputDirectorySelection"
            :isAsync="false"
            :isDirectory="true"
            buttonAttributes="btn btn-secondary btn-md"
            wrapperDivAttributes="col-md-3"
          />
          <div class="col-md-4">
            <p class="tool-tip">Folder where output files will be saved (optional).</p>
          </div>
        </div>
      </fieldset>

      <hr/>

      <save-and-save-continue
        :displayError="submitted && $v.$anyError"
        :save="validatedSaveStay"
        :save-continue="validatedSaveContinue"
      />
    </div>
  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';
  import flatten from 'lodash/flatten';

  import FilePicker from '@/components/Shared/FilePicker';
  import * as p from '@/models/Project/ProjectMetadata';
  import * as c from '@/models/Project/constants';
  import { SET_TS_ERROR } from '@/store/actionTypes';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import technologySpecsMixin from '@/mixins/technologySpecsMixin';
  import * as paths from '@/router/constants';
  import operateOnKeysList from '@/util/object';

  const metadata = p.projectMetadata;
  const validations = metadata.getValidationSchema(c.START_PROJECT_FIELDS);
  const PAGEGROUP = 'overview';
  const PAGE = 'start';

  export default {
    mixins: [wizardFormMixin, technologySpecsMixin],
    components: {
      FilePicker,
    },
    data() {
      return {
        paths,
        ...this.getDataFromProject(),
        metadata,
        tsRequiredLines: null,
      };
    },
    validations: {
      ...validations,
      analysisHorizon: {
        ...validations.analysisHorizon,
        required: requiredIf(function isAnalysisHorizonRequired() {
          return this.analysisHorizonMode === '1';
        }),
      },
    },
    beforeMount() {
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null && this.complete !== undefined) {
        this.submitted = true;
        this.$v.$touch();
      }
      this.tsRequiredLines = this.numberOfEntriesRequired;
    },
    computed: {
      complete() {
        return this.$store.state.Application.pageCompleteness[PAGEGROUP][PAGE];
      },
      numberOfEntriesRequired() {
        if (this.timeseriesXAxis.length === 0) {
          return 'TBD';
        }
        return String(this.timeseriesXAxis.length);
      },
      isTBD() {
        return this.numberOfEntriesRequired === 'TBD';
      },
      timeseriesXAxis() {
        // the first timestamp should be Jan 1 of dataYear at timestep minutes
        //   to represent the period-ending value.
        return this.$store.getters.getTimeseriesXAxis;
      },
    },
    methods: {
      resetNonRequired(list) {
        list.forEach((item) => {
          this[item] = this.metadata.getDefaultValues()[item];
        });
        return true;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      getDataFromProject() {
        return operateOnKeysList(this.$store.state.Project, c.START_PROJECT_FIELDS, f => f);
      },
      getCompletenessPayload() {
        return {
          pageGroup: PAGEGROUP,
          page: PAGE,
          completeness: !this.$v.$invalid && !this.isTSError,
        };
      },
      onOutputDirectorySelection(path) {
        this.outputDirectory = path;
      },
      getErrorListPayload() {
        const errors = [];
        Object.keys(this.$v).forEach((key) => {
          if (key.charAt(0) !== '$' && this.$v[key].$invalid) {
            errors.push(this.getErrorMsg(key));
          }
        });
        return {
          pageGroup: PAGEGROUP,
          page: PAGE,
          errorList: errors,
        };
      },
      revalidateAssociatedInputsData() {
        // add to appropriate errorList for all saved TS from Technologies
        // NOTE: Monthly Data is not affected here
        if (this.tsRequiredLines !== this.numberOfEntriesRequired) {
          // re-validate all saved Associated Inputs TS data here
          const techTSList = [];
          this.techSpecs.forEach((item) => {
            techTSList.push(this.hasAssociatedInputs(item.items));
          });
          flatten(techTSList).forEach((item) => {
            const { id } = item;
            (item.associatedInputs).forEach((ai, index) => {
              const { ts, actionSetName } = ai;
              if (ts && ts.data.length !== 0) {
                // update the associatedInputs object
                const errorsString = ts.revalidate(this.numberOfEntriesRequired);
                const tsError = `The timeseries of ${ts.columnHeaderName} has the wrong number of values`;
                const tsError2 = `A timeseries of ${ts.columnHeaderName} is required`;
                const tsError3 = '<b>Invalid data:</b> The frequency is TBD';
                const errorList = [];
                if (this.isTBD) {
                  errorList.push(tsError2);
                } else if (errorsString !== '') {
                  errorList.push(tsError);
                }
                const payload = {
                  id,
                  index,
                  errorsString: this.isTBD ? tsError3 : errorsString,
                  data: {
                    complete: (!this.isTBD && errorsString === ''),
                    errorList,
                  },
                };
                this.$store.dispatch(actionSetName, payload);
              }
            });
          });
        }
      },
      revalidateData() {
        // add to appropriate errorList for all saved TS from Services
        // NOTE: Monthly Data is not affected here
        if (this.tsRequiredLines !== this.numberOfEntriesRequired) {
          // re-validate all saved TS data here
          const dataObjects = operateOnKeysList(this.$store.state.Project, c.TS_ALL, f => f);
          Object.values(dataObjects).forEach((dataObject) => {
            // only need this when the TS already exists in the store
            if (dataObject.data.length !== 0) {
              const errorsString = dataObject.revalidate(this.numberOfEntriesRequired);
              const tsError = `The timeseries of ${dataObject.columnHeaderName} has the wrong number of values`;
              const tsError2 = `A timeseries of ${dataObject.columnHeaderName} is required`;
              const tsError3 = '<b>Invalid data:</b> The frequency is TBD';
              // attach errorsString to the stored ts.error
              const errorPayload = {
                tsName: dataObject.tsName,
                error: this.isTBD ? tsError3 : errorsString,
              };
              this.$store.dispatch(SET_TS_ERROR, errorPayload);
              const { pageGroup, pageKey, page } = dataObject.pageAttributes;
              let errorList = this.$store.state.Application.errorList[pageGroup][pageKey][page];
              const tsErrorMatch = `timeseries of ${dataObject.columnHeaderName}`;
              // reset errorList
              errorList = errorList.filter(item => !item.includes(tsErrorMatch));
              // set error with this TS only if it is required
              if (dataObject.required) {
                if (this.isTBD) {
                  errorList.push(tsError2);
                } else if (errorsString !== '') {
                  errorList.push(tsError);
                }
              }
              const payload = {
                pageGroup,
                pageKey,
                page,
                errorList,
              };
              this.$store.dispatch('Application/setErrorList', payload);
            }
          });
        }
      },
      validatedSaveContinue() {
        this.validatedSave();
        this.save();
        this.$router.push({ path: this.paths.OBJECTIVES });
      },
      validatedSaveStay() {
        this.validatedSave();
        this.save();
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.analysisHorizonMode !== '1') {
          this.resetNonRequired(['analysisHorizon']);
        }
        // set completeness
        this.$store.dispatch('Application/setCompleteness', this.getCompletenessPayload());
        this.submitted = true;
        this.$v.$touch();
        // set errorList
        this.$store.dispatch('Application/setErrorList', this.getErrorListPayload());
        // handle a change in numberOfEntriesRequired
        this.$store.dispatch('setDataYear', this.dataYear);
        this.$store.dispatch('setTimestep', this.timestep);
        this.revalidateData();
        this.revalidateAssociatedInputsData();
        // reset the value in case of 'saveStay'
        this.tsRequiredLines = this.numberOfEntriesRequired;
      },
      save() {
        this.$store.dispatch('setName', this.name);
        this.$store.dispatch('setStartYear', this.startYear);
        this.$store.dispatch('setAnalysisHorizonMode', this.analysisHorizonMode);
        this.$store.dispatch('setAnalysisHorizon', this.analysisHorizon);
        this.$store.dispatch('setGridLocation', this.gridLocation);
        this.$store.dispatch('setOwnership', this.ownership);
        this.$store.dispatch('setOutputDirectory', this.outputDirectory);
      },
    },
  };
</script>
