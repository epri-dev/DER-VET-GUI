<template>
  <div class="form-horizontal form-buffer">

    <radio-button-input v-model="sector"
                        v-bind:field="metadata.sector"
                        :isInvalid="$v.$dirty && $v.sector.$error"
                        :errorMessage="getErrorMessage('sector')">
    </radio-button-input>

    <text-input
      v-model="zipCode"
      v-bind:field="metadata.zipCode"
      :isInvalid="$v.$dirty && $v.zipCode.$error"
      :errorMessage="getErrorMessage('zipCode')">
    </text-input>

    <drop-down-input
      v-model="utility"
      v-bind:field="metadata.utility"
      :isLargeBox="true"
      :isInvalid="$v.$dirty && $v.utility.$error"
      :errorMessage="getErrorMessage('utility')">
    </drop-down-input>

    <div class="row">
      <div class="col-md-3 text-center">
        <div class="btn btn-primary pull-left" @click="onClickSearch">
          Search
        </div>
      </div>
      <div class="col-md-4 error-text-color" v-if="isInvalid">
        Please correct errors above.
      </div>
    </div>

  </div>

</template>

<script lang="ts">
  import { integer, maxLength, minLength, required } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { Sector } from '@/service/OpenEI/response';
  import { arrayToAllowedValues, enumToAllowedValues, AllowedValue } from '@/util/project';

  interface ProjectField {
    allowedValues?: Array<AllowedValue>;
    displayName: string;
    type?: any;
  }

  // TODO validation
  interface Data {
    zipCode: string;
    sector: Sector;
    utility: string;
    metadata: {
      zipCode: ProjectField,
      sector: ProjectField,
      utility: ProjectField,
    }
  }

  const validations = {
    zipCode: {
      required,
      integer,
      maxLength: maxLength(5),
      minLength: minLength(5),
    },
    utility: { required },
    sector: { required },
  };

  export default {
    mixins: [wizardFormMixin],
    computed: {
      isInvalid() {
        return this.$v.$dirty && this.$v.$invalid;
      },
    },
    data(): Data {
      return {
        zipCode: null,
        sector: null,
        utility: null,
        metadata: {
          zipCode: {
            displayName: 'Zip Code',
            type: String,
          },
          sector: {
            allowedValues: enumToAllowedValues(Sector),
            displayName: 'Sector',
          },
          utility: {
            allowedValues: arrayToAllowedValues(this.$store.state.OpenEI.utilities),
            displayName: 'Utility',
          },
        },
      };
    },
    validations,
    methods: {
      onClickSearch() {
        this.$v.$touch();
        if (!this.isInvalid) {
          this.submitSuccess();
        }
      },
      submitSuccess() {
        this.$emit('searchClicked', this.zipCode, this.sector, this.utility);
      },
      getErrorMessage(fieldName: string) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
    },
  };
</script>