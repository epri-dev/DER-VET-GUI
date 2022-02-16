<template>
  <div class="form-group row">
    <div class="col-md-4">
      <input
        type="file"
        class="form-control"
        :disabled="disableUpload"
        @change="onFileUpload">
    </div>

    <div class="col-md-4"/>

    <div class="col-md-4">
      <b-button
        size="md"
        class="btn-md btn-danger delete-data pull-right"
        :disabled="!dataExists"
        @click="onRemoveData">
        Remove Data
      </b-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dataExists: Boolean,
      disableUpload: Boolean,
    },
    methods: {
      onFileUpload(e) {
        this.$emit('fileUpload', e);
      },
      onRemoveData() {
        this.$emit('removeData');
      },
    },
  };
</script>