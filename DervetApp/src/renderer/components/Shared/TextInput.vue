<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label">{{ field.displayName }}</label>
    </div>
    <div class="col-md-9">
      <input
        v-if="field.type === String"
        class="form-control valid"
        :class="{'is-invalid': isInvalid}"
        v-model.trim="$attrs.value"
        @input="$emit('input', $event.target.value)">
      </input>
      <input
        v-if="field.type === Number"
        class="form-control valid numberbox"
        :class="[{'is-invalid': isInvalid}, isLargeBox ? 'numberbox-lg' : 'numberbox']"
        v-model.number="$attrs.value"
        @input="$emit('input', $event.target.value)">
      </input>
      <input
        v-if="field.type === Date"
        type="date"
        class="form-control valid"
        :class="{'is-invalid': isInvalid}"
        v-model.number="$attrs.value"
        @input="$emit('input', $event.target.value)">
      </input>
      <span class="unit-label">{{ field.unit }}</span>
      <div
        v-if="isInvalid"
        class="invalid-feedback">
        {{ errorMessage }}
      </div>
      <p class="tool-tip tool-tip-col">{{ field.description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field', 'isInvalid', 'isLargeBox', 'errorMessage'],
  };
</script>
