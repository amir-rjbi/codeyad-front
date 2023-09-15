<template>
    <div :class="{ 'card-loading': loading }">
        <h5 class="text-blue font-bold text-2xl">ورود به حساب کاربری</h5>
        <Form @submit="loginWithPhoneNumber" :validation-schema="schema" v-slot="{ meta }" class="mt-10">
            <base-input name="phoneNumber" v-model="data.phoneNumber" number label="شماره تلفن" placeholder="09351170000" />
            <base-input-password name="password" v-model="data.password" placeholder="******" class="mt-4 mb-2"
                label="رمز عبور" />
            <button type="button" @click="authStore.changeStep('forgotPassword')" class="text-blue ">کلمه عبور خود را فراموش
                کرده
                اید؟</button>
            <base-button :loading="loading" class="w-full mt-9" size="lg">ورود</base-button>
        </Form>

        <base-line-text class="text-xl my-8">
            یا
        </base-line-text>
        <GoogleLogin :callback="googleCallback" popup-type="TOKEN" class="w-full h-fit ">
            <base-button :loading="loading" class="w-full  font-bold" transparent>
                <template #icon>
                    <IconsGoogle width="40" height="40" />
                </template>
                ورود با گوگل
            </base-button>
        </GoogleLogin>


        <div class="flex gap-4 items-center justify-center mt-6">
            <p class="m-0">حساب کاربری ندارید ؟ </p>
            <button @click="authStore.changeStep('register')" class="text-blue font-bold">ثبت نام</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { useAuthStore } from '~~/stores/auth.store';
import * as Yup from 'yup'

const data = reactive({
    phoneNumber: "",
    password: ""
})
const authStore = useAuthStore();
const loading = ref(false);
const toast = useToast();
import type { CallbackTypes } from "vue3-google-login";
import { Login, LoginWithGoogle } from '~/services/auth.service';

const schema = Yup.object().shape({
    //@ts-ignore
    phoneNumber: Yup.string().required().phoneNumber().label("شماره تلفن"),
    password: Yup.string().required().label("کلمه عبور"),
});

const loginWithPhoneNumber = async () => {
    loading.value = true;
    var res = await Login(data.phoneNumber, data.password);
    if (res.isSuccess) {
        authStore.setToken(res.data!);
        authStore.isOpenModal = false;
        toast.showToast("ورود با موفقیت انجام شد")
    }
    loading.value = false;

}
const googleCallback: CallbackTypes.TokenResponseCallback = async (response) => {
    loading.value = true;
    var res = await LoginWithGoogle(response.access_token);
    if (res.isSuccess) {
        authStore.setToken(res.data!);
        authStore.isOpenModal = false;
        toast.showToast("ورود با موفقیت انجام شد")
    }
    loading.value = false;
};
</script>