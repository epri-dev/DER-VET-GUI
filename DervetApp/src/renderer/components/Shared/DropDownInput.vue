<template>
  <div class="form-group row">
    <div class="col-md-3" v-if="field.displayName !== undefined">
      <label class="control-label">
        <b v-html="field.displayName"></b>
      </label>
    </div>
    <div class="col-md-4">
      <select class="form-control valid numberbox"
              :class="{'is-invalid': isInvalid}"
              id="loc"
              v-model="$attrs.value"
              @change="$emit('input', $event.target.value)">
        <option v-for="option in field.allowedValues" v-bind:value="option.value">
          {{option.label}}
        </option>
      </select>
      <span class="unit-label" v-html="field.unit"></span>
      <div v-if="isInvalid"
           class="invalid-feedback">
        {{ errorMessage }}
      </div>
    </div>
    <div class="col-md-5">
      <p class="tool-tip tool-tip-col" v-html="field.description"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field', 'isInvalid', 'errorMessage'],
  };
</script>
