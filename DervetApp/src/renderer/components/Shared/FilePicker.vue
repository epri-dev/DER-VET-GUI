<template>
  <div :class="wrapperDivAttributes">
    <label for="filePicker" :class="buttonAttributes">
      <div
        v-if="this.saving"
        class="spinner-border text-light"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>{{label}}</div>
    </label>
    <input 
      id="filePicker"
      class="file-picker"
      style="visibility:hidden;"
      type="file"
      @change="onChange"
      :webkitdirectory="isDirectory"
      :directory="isDirectory">
  </div>
</template>

<script>
  /* TODO
    - Use typescript in script
    - Use this component in StartProject component
  */
  export default {
    props: {
      buttonAttributes: {
        type: String,
        default: '',
      },
      isAsync: {
        type: Boolean,
        default: false,
      },
      isDirectory: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: 'Select folder',
      },
      onFileSelect: {
        type: Function,
        default: () => null,
      },
      wrapperDivAttributes: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        saving: false,
      };
    },
    methods: {
      onFileSelectAsync(path) {
        this.saving = true;
        this.onFileSelect(path)
          // In case the operation is instantaneous, load for 1.5 seconds
          .then(this.setSavingWithTimeout)
          .catch(() => { this.$emit('importError'); })
          .finally(this.setSavingWithTimeout);
      },
      onChange(e) {
        const files = e.target.files[0];
        if (files !== undefined) {
          if (this.isAsync) {
            this.onFileSelectAsync(files.path);
          } else {
            this.onFileSelect(files.path);
          }
        }
      },
      setSavingWithTimeout() {
        setTimeout(() => { this.saving = false; }, 1500);
      },
    },
  };
</script>
