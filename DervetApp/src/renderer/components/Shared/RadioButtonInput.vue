<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label" for="size">{{ field.displayName }}</label>
    </div>
    <div class="col-md-9 foo">
      <div v-for="option in field.allowedValues">
        <input
          type="radio"
          v-model="$attrs.value"
          :value="option.value"
          @change="onChange">
        <label>{{ option.label }}</label>
      </div>
      <p class="tool-tip tooltip-col">{{ field.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field'],
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
