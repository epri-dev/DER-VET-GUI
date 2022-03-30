<template>
  <div class="form-group row">
    <div class="col-md-3" v-if="metadata.displayName !== undefined">
      <label class="control-label">
        <b v-html="metadata.displayName"></b>
      </label>
    </div>
    <div class="col-md-4">
      <input v-if="metadata.type === String"
             class="form-control valid"
             :class="{'is-invalid': isInvalid}"
             v-model="$attrs.value"
             @input="onChange">
      </input>
      <input v-if="isNumeric(metadata.type)"
             class="form-control valid"
             :class="[{'is-invalid': isInvalid}, isLargeBox ? 'numberbox-lg' : 'numberbox']"
             v-model.number="$attrs.value"
             @input="onChange">
      </input>
      <input v-if="metadata.type === Date"
             type="date"
             class="form-control valid"
             :class="{'is-invalid': isInvalid}"
             v-model="$attrs.value"
             @input="onChange">
      </input>
      <span class="unit-label" v-html="metadata.unit"></span>
      <div v-if="isInvalid"
           class="invalid-feedback">
        <span v-html="errorMessage"></span>
      </div>
    </div>
    <div v-if="includeButton" class="col-md-5">
      <div class="btn btn-primary" @click="buttonCallback">
        {{ buttonText }}
      </div>
    </div>
    <div v-else class="col-md-5">
      <p class="tool-tip tool-tip-col" v-html="metadata.description"></p>
    </div>

  </div>
</template>

<script>
  export default {
    props: [
      'metadata',
      'isInvalid',
      'isLargeBox',
      'errorMessage',
      'includeButton',
      'buttonText',
      'buttonCallback',
    ],
    methods: {
      isNumeric(type) {
        return type === Number || type === 'float' || type === 'int';
      },
      onChange(e) {
        let val = e.target.value;
        if (this.isNumeric(this.metadata.type)) {
          const n = parseFloat(val);
          val = Number.isNaN(n) ? val : n;
        /* // for type int, this approach was suboptimal
        // the input became an integer, but the user still sees the decimal
        } else if (this.metadata.type === 'int') {
          const n = parseInt(val, 10);
          val = Number.isNaN(n) ? val : n;
        */
        } else if (this.metadata.type === String) {
          val = val.trim();
        }
        this.$emit('input', val);
      },
    },
  };
</script>
