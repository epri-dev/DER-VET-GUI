<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label"><b v-html="field.displayName"/></label>
    </div>
    <div class="col-md-9">
      <input
        v-if="field.type === String"
        class="form-control valid"
        :class="{'is-invalid': isInvalid}"
        v-model="$attrs.value"
        @input="onChange">
      </input>
      <input
        v-if="field.type === Number || field.type === 'float' || field.type === 'int'"
        class="form-control valid numberbox"
        :class="[{'is-invalid': isInvalid}, isLargeBox ? 'numberbox-lg' : 'numberbox']"
        v-model.number="$attrs.value"
        @input="onChange">
      </input>
      <input
        v-if="field.type === Date"
        type="date"
        class="form-control valid"
        :class="{'is-invalid': isInvalid}"
        v-model="$attrs.value"
        @input="onChange">
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
    methods: {
      onChange(e) {
        let val = e.target.value;
        if (this.field.type === Number || this.field.type === 'float'
          || this.field.type === 'int') {
          const n = parseFloat(val);
          val = Number.isNaN(n) ? val : n;
        /* // for type int, this approach was suboptimal
        // the input became an integer, but the user still sees the decimal
        } else if (this.field.type === 'int') {
          const n = parseInt(val, 10);
          val = Number.isNaN(n) ? val : n;
        */
        } else if (this.field.type === String) {
          val = val.trim();
        }
        this.$emit('input', val);
      },
    },
  };
</script>
