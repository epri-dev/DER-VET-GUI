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
