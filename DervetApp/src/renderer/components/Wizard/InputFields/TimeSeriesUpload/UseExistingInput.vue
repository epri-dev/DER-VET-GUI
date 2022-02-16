<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <label class="control-label">
          <b>{{this.displayNameCapitalized()}}</b> data have been uploaded for this project. Do you want to use these data?
        </label>
      </div>
    </div>
    <br/>
    <div class="row use-existing-button">
      <div class="col-md-4">
        <b-form-group>
          <b-form-radio-group
            v-model="$attrs.value"
            :options="optionsYN"
            @input="onUseExistingChange"
          ></b-form-radio-group>
        </b-form-group>
      </div>
      <div class="col-md-8">
        <b-button
          size="sm"
          class="btn-xs btn-danger delete-data pull-right"
          @click="removeData">
          Remove Data
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      displayName: String,
      fieldName: String,
    },
    data() {
      return {
        optionsYN: [
          { text: 'Yes', value: true },
          { text: 'No', value: false },
        ],
      };
    },
    methods: {
      displayNameCapitalized() {
        return this.displayName.charAt(0).toUpperCase() + this.displayName.slice(1);
      },
      onUseExistingChange(e) {
        this.$emit('input', e);
      },
    },
  };
</script>