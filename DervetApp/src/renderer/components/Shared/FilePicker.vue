<template>
  <div :class="wrapperDivAttributes">
    <div :class="buttonAttributes" @click="onClick">
      <div
        v-if="this.saving"
        class="spinner-border text-light"
        role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>{{label}}</div>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron'; // eslint-disable-line

  /* TODO
    - Use typescript in script
    - Validate that directory is received using accepted answer here:
      https://stackoverflow.com/questions/52667995/how-to-check-if-selected-file-is-a-directory-or-regular-file
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
      callback: {
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
      onClick() {
        const properties = this.isDirectory ? ['openDirectory'] : ['openFile'];
        remote.dialog.showOpenDialog({ properties })
          .then((e) => {
            if (!e.canceled) {
              this.onFileSelect(e.filePaths[0]);
            }
          });
      },
      onFileSelect(filePath) {
        return this.isAsync ? this.onFileSelectAsync(filePath) : this.callback(filePath);
      },
      onFileSelectAsync(path) {
        this.saving = true;
        this.callback(path)
          // In case the operation is instantaneous, load for 1.5 seconds
          .then(this.setSavingWithTimeout)
          .catch(() => { this.$emit('importError'); })
          .finally(this.setSavingWithTimeout);
      },
      setSavingWithTimeout() {
        setTimeout(() => { this.saving = false; }, 1500);
      },
    },
  };
</script>
