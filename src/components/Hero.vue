<template>
  <section>
    <article class="p-4 bg-purple-600">
      <h1 class="text-3xl text-gray-200">Instant Whatsapp</h1>
    </article>

    <form @submit.prevent="submitForm" ref="form" class="p-4 space-y-6 my-8">
      <div class="transition-all duration-300">
        <label for="phone" class="sr-only">Nomor Telepon</label>
        <VueTelInput
          v-model="phone"
          :dropdownOptions="dropdownOptions"
          :inputOptions="inputOptions"
          class="
            my-2
            w-full
            rounded-md
            border-gray-300
            text-gray-800
            shadow-sm
            focus:border-purple-300
            focus:ring
            focus:ring-purple-400
            focus:ring-opacity-50
          "
        ></VueTelInput>

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
        required: true,
        styleClasses: 'rounded-md',
        tabindex: 0,
        type: 'tel',
        placeholder: 'Masukan nomor ponsel',
      },
    };
  },
  methods: {
    async submitForm(e) {
      if (!e.target.elements.telephone.value) {
        return (this.error = 'Nomor Ponsel tidak boleh kosong');
      }

      if (e.target.elements.telephone.value.match(/[^\d\s-]/g)) {
        return (this.error = 'Nomor Ponsel hanya dapat berupa angka');
      }
      this.error = ''
      this.phone = e.target.elements.telephone.value
        .replaceAll(/[^\d]/g, '')
        .replace('62', '') //bug for number with 89xx62xx

      window.open(
        `https://web.whatsapp.com/send?phone=62${this.phone}`,
        '_blank',
      );
    },
  },
};
</script>

<style></style>
