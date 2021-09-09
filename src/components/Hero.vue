<template>
  <section>
    <article class="p-4 bg-purple-700 space-y-4">
      <h1 class="text-3xl text-gray-200 font-bold">Instant Whatsapp</h1>
      <p class="text-gray-300 w-full md:w-8/12">
        Cara cepat berkirim pesan melalui WhatsApp tanpa perlu menyimpannya
        terlebih dahulu di kontakmu.
      </p>
    </article>

    <form @submit.prevent="submitForm" ref="form" class="p-4 space-y-6 my-8">
      <div class="transition-all duration-300">
        <label for="phone" class="sr-only">Nomor Telepon</label>
        <VueTelInput
          ref="inputTel"
          v-model="phone"
          :dropdownOptions="dropdownOptions"
          :inputOptions="inputOptions"
          class="
            my-2
            w-full
            rounded-md
            text-gray-800
            shadow-xl
            focus:ring focus:ring-opacity-50
          "
          :class="[
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:border-purple-400 focus:ring-purple-400 ',
          ]"
        />

        <span v-if="error" class="text-sm text-gray-200">
          {{ error }}
        </span>
      </div>

      <button
        type="submit"
        class="
          w-full
          bg-purple-800
          text-gray-200
          rounded-sm
          shadow-xl
          p-3
          font-bold
          hover:bg-purple-600
          disabled:opacity-50
        "
      >
        Kirim Pesan
      </button>
    </form>
  </section>
</template>

<script>
import { VueTelInput } from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';

export default {
  components: {
    VueTelInput,
  },
  data() {
    return {
      phone: '',
      error: '',
      isMobile: false,
      dropdownOptions: {
        showDialCodeInList: true,
        showDialCodeInSelection: true,
        showFlags: true,
        tabindex: 0,
      },
      inputOptions: {
        placeholder: 'on',
        autofocus: false,
        id: '',
        maxlength: 25,
        name: 'telephone',
        readonly: false,
        required: false,
        styleClasses: 'rounded-md',
        tabindex: 0,
        type: 'tel',
        placeholder: 'Masukan nomor ponsel',
      },
    };
  },
  created() {
    if (navigator && navigator.userAgentData.mobile) {
      this.isMobile = true;
    }
  },
  methods: {
    async submitForm(e) {
      const { phoneObject } = this.$refs.inputTel;

      if (!phoneObject.formatted) {
        return (this.error = 'Nomor Ponsel tidak boleh kosong');
      }

      if (phoneObject.formatted.match(/[^\d\s-+]/g)) {
        return (this.error = 'Nomor Ponsel hanya dapat berupa angka');
      }

      if (phoneObject.formatted.length <= 8) {
        return (this.error = 'Nomor Ponsel minimal terdiri dari 8 angka');
      }

      this.error = '';
      this.phone = phoneObject.number.replace('+', '');

      if (this.isMobile) {
        window.open(`whatsapp://send?phone=${this.phone}`, '_blank');
      } else {
        window.open(
          `https://web.whatsapp.com/send?phone=${this.phone}`,
          '_blank',
        );
      }
    },
  },
};
</script>

<style scope>
.vti__selection .vti__country-code {
  color: #e5e7eb !important;
}
</style>
