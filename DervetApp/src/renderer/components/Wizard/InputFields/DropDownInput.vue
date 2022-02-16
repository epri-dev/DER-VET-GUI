<template>
  <div class="form-group row">
    <div class="col-md-3" v-if="metadata.displayName !== undefined">
      <label class="control-label">
        <b v-html="metadata.displayName"></b>
      </label>
    </div>
    <div class="col-md-4">
      <select data-live-search="true"
              class="form-control valid"
              :class="[{'is-invalid': isInvalid}, isLargeBox ? 'numberbox-lg' : 'numberbox']"
              id="loc"
              v-model="$attrs.value"
              @change="$emit('input', $event.target.value)">
        <option
          v-for="option in metadata.allowedValues"
          v-bind:value="option.value">
          {{option.label}}
        </option>
      </select>
      <span class="unit-label" v-html="metadata.unit"></span>
      <div v-if="isInvalid"
           class="invalid-feedback">
        <span v-html="errorMessage"></span>
      </div>
    </div>
    <div class="col-md-5">
      <p class="tool-tip tool-tip-col" v-html="metadata.description"></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['metadata', 'isInvalid', 'isLargeBox', 'errorMessage'],
  };
</script>
