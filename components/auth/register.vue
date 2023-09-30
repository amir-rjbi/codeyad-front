<template>
    <div :class="{ 'card-loading': loading }">
        <h5 class="text-blue font-bold text-2xl">ساخت حساب کاربری</h5>
        <Form :validation-schema="schema" @submit="register" class="mt-10">
            <base-input name="email" type="email" label="ایمیل" placeholder="name@example.com" />
            <base-input name="phoneNumber" number class="mt-4 mb-2" label="شماره تلفن" placeholder="093511100156" />
            <base-input-password name="password" placeholder="*******" class="mt-4 mb-2" label="رمز عبور" />
            <base-input-password name="rePassword" placeholder="*******" class="mt-4 mb-2" label="تکرار رمز عبور" />
            <base-button :loading="loading" class="w-full mt-9" size="lg">ثبت نام</base-button>
        </Form>
        <base-line-text class="text-xl my-8">
            یا
        </base-line-text>
        <GoogleLogin :callback="googleCallback" popup-type="TOKEN" class="w-full h-fit ">
            <base-button :loading="loading" class="w-full  font-bold" transparent>
                <template #icon>
                    <IconsGoogle width="40" height="40" />
                </template>
                ثبت نام با گوگل
            </base-button>
        </GoogleLogin>

        <div class="flex gap-4 items-center justify-center mt-6">
            <p class="m-0">قبلا ثبت نام کرده اید؟</p>
            <button @click="authStore.changeStep('login')" class="text-blue font-bold">ورود به حساب</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { useAuthStore } from '~~/stores/auth.store';
import * as Yup from 'yup';
import { LoginWithGoogle, RegisterCommand, RegisterUser } from '~/services/auth.service';
import Loading from '../icons/loading.vue';
import { CallbackTypes } from 'vue3-google-login';

const schema = Yup.object().shape({
    email: Yup.string().required().email().label('ایمیل'),
    //@ts-ignore
    phoneNumber: Yup.string().phoneNumber().label('شماره تلفن'),
    password: Yup.string().min(4).label('کلمه عبور'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'کلمه های عبور یکسان نیستند').label('تکرار کلمه عبور')
})
const authStore = useAuthStore();
const toast = useToast();
const loading = ref(false);

const register = async (fData: any, ev: any) => {
    loading.value = true;
    var res = await RegisterUser(fData as RegisterCommand);
    if (res.isSuccess) {
        toast.showToast('ثبت نام با موفقت انجام شد ، کد فعال سازی برای شما ارسال شد')
        authStore.registerData = fData;
        authStore.changeStep('activate');
    }
    loading.value = false;

}
const googleCallback: CallbackTypes.TokenResponseCallback = async (response) => {
    loading.value = true;
    var res = await LoginWithGoogle(response.access_token);
    if (res.isSuccess) {
        authStore.setToken(res.data!);
        authStore.isOpenModal = false;
        toast.showToast("ثبت نام با موفقیت انجام شد")
    }
    loading.value = false;
};
</script>