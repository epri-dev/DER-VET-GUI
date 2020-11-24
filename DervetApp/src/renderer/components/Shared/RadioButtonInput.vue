<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label" for="size"><b>{{ field.displayName }}</b></label>
    </div>
    <div class="col-md-4 form-control-static">
      <div v-for="option, idx in field.allowedValues" class="form-check">
        <input
          class="form-check-input"
          type="radio"
          v-model="$attrs.value"
          :class="{'is-invalid': isInvalid}"
          :value="option.value"
          @change="onChange">
        <label>{{ option.label }}</label>
        <div
          v-if="isInvalid && idx === (field.allowedValues.length - 1)"
          class="invalid-feedback form-check-label">
          {{ errorMessage }}
        </div>
      </div>
    </div>
    <div class="col-md-5">
      <p class="tool-tip tool-tip-col">{{ field.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field', 'isInvalid', 'errorMessage'],
    inheritAttrs: false,
    methods: {
      onChange(e) {
        if (this.field.type === Boolean) {
          // Radio buttons values are coerced to string, so this re-booleans them
          this.$emit('input', e.target.value === 'true');
        } else {
          this.$emit('input', e.target.value);
        }
      },
    },
  };
</script>
