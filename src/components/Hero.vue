<template>
    <section class="py-10 md:py-28">
        <article class="px-4 text-center">
            <h1 class="hero-heading">Instant Whatsapp</h1>
            <p class="text-lg">
                Cara cepat berkirim pesan melalui WhatsApp tanpa perlu
                menyimpannya terlebih dahulu di kontakmu.
            </p>
        </article>

        <form
            @submit.prevent="submitForm"
            ref="form"
            class="p-4 space-y-8 md:space-y-10 my-8"
        >
            <div class="transition-all duration-300 space-y-4">
                <div>
                    <label for="phone" class="sr-only">Nomor Telepon</label>
                    <VueTelInput
                        ref="inputTel"
                        v-model="form.phone"
                        v-bind="telInputSettings"
                        class="input"
                        :class="[error ? 'tel-error' : 'tel-valid']"
                    />

                    <span v-if="error" class="text-sm text-red-500">
                        {{ error }}
                    </span>
                </div>

                <div>
                    <label for="text" class="sr-only">Pesan</label>
                    <textarea
                        v-model="form.text"
                        type="text"
                        name="text"
                        id="text"
                        rows="3"
                        placeholder="Masukan pesan"
                        class="input rounded-md py-4 resize-y"
                    >
                    </textarea>
                </div>
            </div>

            <button type="submit" class="btn">Kirim Pesan</button>
        </form>
    </section>
</template>

<script>
import { formatQuery, openNewTab } from '../utils/utils'
// import vue-tel-input components
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

export default {
    components: {
        VueTelInput,
    },
    data() {
        return {
            form: {
                phone: '',
                text: '',
            },
            error: '',
            isMobile: false,
            telInputSettings: {
                dropdownOptions: {
                    showDialCodeInList: true,
                    showDialCodeInSelection: true,
                    showSearchBox: true,
                    showFlags: true,
                    tabindex: 0,
                },
                inputOptions: {
                    placeholder: 'on',
                    autofocus: true,
                    id: '',
                    maxlength: 25,
                    name: 'phone',
                    readonly: false,
                    required: false,
                    styleClasses: 'rounded-md py-4',
                    tabindex: 0,
                    type: 'tel',
                    placeholder: 'Masukan nomor ponsel',
                },
            },
        }
    },
    created() {
        try {
            if (navigator && navigator?.userAgentData?.mobile) {
                this.isMobile = true
            }
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        async submitForm(e) {
            try {
                const { phoneObject } = this.$refs.inputTel

                if (!phoneObject.formatted)
                    return (this.error = 'Nomor Ponsel tidak boleh kosong')
                if (phoneObject.formatted.match(/[^\d\s-+]/g))
                    return (this.error =
                        'Nomor Ponsel hanya dapat berupa angka')

                if (phoneObject.formatted.length <= 8)
                    return (this.error =
                        'Nomor Ponsel minimal terdiri dari 8 angka')

                this.error = ''
                this.form.phone = phoneObject.number.replace('+', '')

                let url = null
                const target = '_blank'
                const query = formatQuery({
                    phone: this.form.phone,
                    text: this.form.text,
                })

                if (this.isMobile) {
                    url = `whatsapp://send${query}`

                    openNewTab({ url, target })
                } else {
                    url = `https://web.whatsapp.com/send${query}`

                    openNewTab({ url, target })
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
}
</script>

<style scope>
.vti__selection .vti__country-code {
    color: #e5e7eb !important;
}

.vti__dropdown.open,
.vti__dropdown:hover {
    border-radius: 8px !important;
    background-color: #000 !important;
}

.vue-tel-input:focus-within {
    border-color: rgb(79 70 229) !important;
}
</style>
