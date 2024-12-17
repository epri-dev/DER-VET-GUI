<template>
  <div class="form-group row">
    <div class="col-md-3">
      <label class="control-label">
        <b v-html="metadata.displayName"></b>
      </label>
    </div>
    <div class="col-md-4">
      <textarea
          v-model="$attrs.value"
          ref="textarea"
          rows="1"
          @focus="resize"
          @keyup="resize"
          @input="onChange">
      </textarea>
    </div>
    <div class="col-md-1">
    </div>
    <div class="col-md-4">
      <p class="tool-tip tool-tip-col" v-html="metadata.description"></p>
    </div>

  </div>
</template>

<script>
  export default {
    props: [
      'metadata',
    ],
    mounted() {
      this.resize();
    },
    methods: {
      isNumeric(type) {
        return type === Number || type === 'float' || type === 'int';
      },
      onChange(e) {
        let val = e.target.value;
        val = val.trim();
        this.$emit('input', val);
      },
      resize() {
        const { textarea } = this.$refs;
        textarea.style.height = `${textarea.scrollHeight - 4}px`;
      },
    },
  };
</script>
