<template>
  <div>
    <div class="form-group row">
      <div class="col-md-2">
        <label class="control-label pull-right">
          <b>Zip code</b>
        </label>
      </div>
      <div class="col-md-2">
        <input
          class="form-control valid numberbox"
          :class="{'is-invalid': isInvalid}"
          v-model:numeric="zipCode">
      </div>
      <div class="col-md-1 btn btn-primary center" v-on:click="onClickGo()">
        Go
      </div>
    </div>
  </div>
</template>

<script>
  import { integer, maxLength, minLength } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        zipCode: '',
        submitted: false,
      };
    },
    computed: {
      isInvalid() {
        return this.submitted && this.$v.zipCode.$error;
      },
    },
    validations: {
      zipCode: {
        integer,
        maxLength: maxLength(5),
        minLength: minLength(5),
      },
    },
    methods: {
      onClickGo() {
        this.$v.$touch();
        if (this.$v.zipCode.$error) {
          this.submitError();
        } else if (this.zipCode !== '') {
          this.submitSuccess();
        }
      },
      submitSuccess() {
        this.submitted = false;
        this.$emit('goClicked', this.zipCode);
        this.zipCode = '';
      },
      submitError() {
        this.submitted = true;
        this.$emit('setErrorMessage', this.getErrorMessage());
      },
      getErrorMessage() {
        if (!this.$v.zipCode.integer) {
          return 'Zip code must be an integer';
        }
        if (!this.$v.zipCode.minLength || !this.$v.zipCode.maxLength) {
          return 'Zip code must be five digits';
        }
        return '';
      },
    },
  };
</script>
