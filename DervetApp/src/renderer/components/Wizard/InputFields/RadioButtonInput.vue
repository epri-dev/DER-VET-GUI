<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label" for="size">
        <b v-html="metadata.displayName"></b>
      </label>
    </div>
    <div class="col-md-4 form-control-static">
      <div v-for="option, idx in metadata.allowedValues" class="form-check">
        <input
          class="form-check-input"
          type="radio"
          v-model="$attrs.value"
          :class="{'is-invalid': isInvalid}"
          :value="option.value"
          @change="onChange">
        <span v-html="option.label"></span>
        <div
          v-if="isInvalid && idx === (metadata.allowedValues.length - 1)"
          class="invalid-feedback form-check-label">
          <span v-html="errorMessage"></span>
        </div>
      </div>
    </div>
    <div class="col-md-5">
      <p class="tool-tip tool-tip-col" v-html="metadata.description"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['metadata', 'isInvalid', 'errorMessage'],
    inheritAttrs: false,
    methods: {
      onChange(e) {
        if (this.metadata.type === Boolean) {
          // Radio buttons values are coerced to string, so this re-booleans them
          this.$emit('input', e.target.value === 'true');
        } else {
          this.$emit('input', e.target.value);
        }
      },
    },
  };
</script>
