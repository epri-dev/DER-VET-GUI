<template>
  <div class="form-horizontal form-buffer">

    <fieldset class="section-group">
      <legend>OpenEI Connection</legend>

      <div>
        To use this tool, you must sign up for an API key on <open-external-link :link="OPEN_EI_SIGNUP_URL" text="OpenEI's website."/> Please enter the key below and click 'Save'.
      </div>

      <br/>

      <text-input
        v-model="apiKey"
        :metadata="metadata.apiKey"
        :isInvalid="$v.$dirty && $v.apiKey.$invalid"
        :errorMessage="getErrorMessage('apiKey')"
        :includeButton="true"
        :disableButton="$v.$dirty && $v.apiKey.$invalid"
        :buttonCallback="saveApiKey"
        buttonText="Save">
      </text-input>

    </fieldset>

    <radio-button-input v-model="sector"
                        :metadata="metadata.sector"
                        :isInvalid="$v.$dirty && $v.sector.$error"
                        :errorMessage="getErrorMessage('sector')">
    </radio-button-input>

    <text-input
      v-model="zipCode"
      :metadata="metadata.zipCode"
      :isInvalid="$v.$dirty && $v.zipCode.$error"
      :errorMessage="getErrorMessage('zipCode')">
    </text-input>

    <drop-down-input
      v-model="utility"
      :metadata="utilityMetadata"
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
  import isEmpty from 'lodash/isEmpty';
  import { integer, maxLength, minLength, required } from 'vuelidate/lib/validators';

  import OpenExternalLink from '@/components/Shared/OpenExternalLink';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { Sector } from '@/service/OpenEI/response';
  import * as a from '@/store/actionTypes';
  import { AllowedValue } from '@/models/Project/Metadata/AllowedValues/AllowedValue';
  import {
    arrayToAllowedValues,
    enumToAllowedValues,
  } from '@/models/Project/Metadata/AllowedValues/generators';

  const OPEN_EI_SIGNUP_URL = 'https://openei.org/services/api/signup/';

  interface ProjectField {
    allowedValues?: AllowedValue[];
    displayName: string;
    type?: any;
    description?: string;
  }

  // TODO validation
  interface Data {
    OPEN_EI_SIGNUP_URL: string;
    apiKey: string;
    sector: Sector;
    utility: string;
    zipCode: string;
    metadata: {
      apiKey: ProjectField,
      sector: ProjectField,
      zipCode: ProjectField,
    }
  }

  const validations = {
    apiKey: { required },
    zipCode: {
      required,
      integer,
      maxLength: maxLength(5),
      minLength: minLength(5),
    },
    sector: { required },
    utility: { required },
  };

  export default {
    mixins: [wizardFormMixin],
    components: { OpenExternalLink },
    computed: {
      isInvalid() {
        return this.$v.$dirty && this.$v.$invalid;
      },
      utilityMetadata() {
        return {
          allowedValues: arrayToAllowedValues(this.$store.state.OpenEI.utilities),
          displayName: 'Utility',
        };
      },
    },
    data(): Data {
      return {
        OPEN_EI_SIGNUP_URL,
        apiKey: this.$store.state.OpenEI.apiKey,
        sector: null,
        utility: null,
        zipCode: null,
        metadata: {
          apiKey: {
            displayName: 'API Key',
            type: String,
          },
          zipCode: {
            displayName: 'Zip Code',
            type: String,
            description: 'Note: Tariffs displayed will be all those provided by the utilities serving this zip code.',
          },
          sector: {
            allowedValues: enumToAllowedValues(Sector),
            displayName: 'Sector',
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
      saveApiKey() {
        this.$store.dispatch(`OpenEI/${a.SET_API_KEY}`, this.apiKey)
          .then(() => {
            if (isEmpty(this.$store.state.OpenEI.utilities)) {
              this.$store.dispatch(`OpenEI/${a.LOAD_UTILITIES}`, this.apiKey)
                .catch((err: any) => err); // TODO handle error
            }
          });
      },
      submitSuccess() {
        this.$emit('searchClicked', this.zipCode, this.sector, this.utility);
      },
      getErrorMessage(fieldName: string) {
        const metadata = { ...this.metadata, ...{ utility: this.utilityMetadata } };
        return this.getErrorMsgWithMetadata(validations, this.$v, fieldName, metadata);
      },
    },
  };
</script>