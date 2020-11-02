<template>
  <div class="form-group row">

    <div class="col-md-3">
      <label class="control-label" for="inverter-max">{{ getDisplayName('inverterMax') }}</label>
    </div>
    <div class="col-md-9">
      <input
        class="form-control valid numberbox-lg"
        :class="{'is-invalid': submitted && $v.inverterMax.$error}"
        id="cost"
        v-model.number="inverterMax">
      </input>
      <span class="unit-label">{{ getDisplayUnit('inverterMax') }}</span>
      <div
        v-if="submitted && $v.inverterMax.$error"
        class="invalid-feedback">
        {{ getErrorMsg('inverterMax') }}
      </div>
      <p class="tool-tip tooltip-col">{{ getDescription('inverterMax') }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['field', 'isInvalid', 'errorMessage'],
  };
</script>
