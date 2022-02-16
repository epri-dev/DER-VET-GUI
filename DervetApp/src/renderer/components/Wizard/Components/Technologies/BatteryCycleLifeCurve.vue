<template>
  <div>
    <div class="form-group row">
      <div class="col-md-7">
        <b-table-lite
          small striped hover
          :items="cycles"
          :fields="fields">
          <template v-slot:cell(ulimit)="row">
            <b-form-input
              class="text-right"
              :class="{'is-invalid': isInvalidULimit(row.item.ulimit)}"
              v-model.number="row.item.ulimit"
              @input="onChange"
            />
          </template>
          <template v-slot:cell(val)="row">
            <b-form-input
              class="text-right"
              :class="{'is-invalid': isInvalidCycleLifeValue(row.item.val)}"
              v-model.number="row.item.val"
              @input="onChange"
            />
          </template>
          <template v-slot:cell(remove)="row">
            <b-col class="text-center">
              <b-button
                size="sm"
                class="btn-xs btn-danger delete-tech"
                v-on:click="removeRow(row.index)" >
                x
              </b-button>
            </b-col>
          </template>
        </b-table-lite>
        <div class="text-center">
          <button
            type="button"
            class="btn-xs btn-info"
            @click="addRow">
            + Add Cycle
          </button>
        </div>
      </div>

      <div class="col-md-5">
        <p class="tool-tip tool-tip-col">
          Specify the cycle life curve for this battery. Cycle Depth Upper Limit must be a number between 0 and 1 (inclusive) and Cycle Life Value must be a number greater than or equal to 0.
        </p>
      </div>
    </div>
    <div
      v-if="isInvalid"
      class="row error-text-color">
      <div class="col-md-7 text-center" v-html="errorMessage"/>
      <br/>
      <br/>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: {
      cycleLifeCurve: Array,
      isInvalid: Boolean,
      errorMessage: String,
    },
    data() {
      return {
        fields: [
          { key: 'ulimit', label: 'Cycle Depth Upper Limit', thClass: 'text-right' },
          { key: 'val', label: 'Cycle Life Value', thClass: 'text-right' },
          { key: 'remove', label: '' },
        ],
        cycles: _.cloneDeep(this.cycleLifeCurve),
      };
    },
    methods: {
      isInvalidULimit(ulimit) {
        const n = parseFloat(ulimit);
        if (Number.isNaN(n)) { return true; }
        return (ulimit < 0 || ulimit > 1);
      },
      isInvalidCycleLifeValue(val) {
        const n = parseFloat(val);
        if (Number.isNaN(n)) { return true; }
        return (val < 0);
      },
      cyclesError() {
        const isError = _.reduce(this.cycles, (result, row) => {
          const err = this.isInvalidULimit(row.ulimit) || this.isInvalidCycleLifeValue(row.val);
          return err ? true : result;
        }, false);
        return isError ? 'Error in cycle life curve' : null;
      },
      removeRow(index) {
        this.cycles.splice(index, 1);
        this.onChange();
      },
      addRow() {
        this.cycles.push({});
        this.onChange();
      },
      onChange() {
        this.$emit('error', this.cyclesError());
        this.$emit('change', this.cycles);
      },
    },
  };
</script>
