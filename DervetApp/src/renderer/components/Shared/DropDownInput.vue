<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label">{{ field.displayName }}</label>
    </div>
    <div class="col-md-9">
      <select
        class="form-control valid numberbox"
        :class="{'is-invalid': isInvalid}"
        id="loc"
        v-model="$attrs.value"
        @change="$emit('input', $event.target.value)">
        <option v-for="option in field.allowedValues" v-bind:value="option.value">
          {{option.label}}
        </option>
      </select>
      <span class="unit-label">{{ field.unit }}</span>
      <div
        v-if="isInvalid"
        class="invalid-feedback">
        {{ errorMessage }}
      </div>
      <p class="tool-tip tooltip-col">{{ field.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field', 'isInvalid', 'errorMessage'],
  };
</script>
