<template>
  <div class="form-group form-buffer row">
    <div v-if="showLeft" class="col-md-3 left-btn">
      <button @click="onLeftClick" type="button" class="btn btn-primary">
        {{ leftText }}
      </button>
    </div>
    <div v-else class="col-md-3"/>

    <div v-if="showError" class="col-md-5 error-text-color" v-html="errorText"/>
    <div v-else class="col-md-5"/>

    <div v-if="showRight" class="col-md-4 right-btn">
      <button @click="onRightClick" type="button" class="btn btn-primary pull-right" :disabled="disabled">
        {{ rightText }}
      </button>
    </div>
    <div v-else class="col-md-4"/>
  </div>
</template>

<script>
  export default {
    props: {
      leftText: {
        type: String,
        default: 'Save',
      },
      rightText: {
        type: String,
        default: 'Save and Continue >>',
      },
      errorText: {
        type: String,
        default: 'There are errors on the page.',
      },
      showLeft: {
        type: Boolean,
        default: true,
      },
      showRight: {
        type: Boolean,
        default: true,
      },
      showError: {
        type: Boolean,
        default: false,
      },
      onLeftClick: {
        type: Function,
        default: () => null,
      },
      onRightClick: {
        type: Function,
        default: () => null,
      },
      // TODO Split into left/right disabled
      disabled: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
