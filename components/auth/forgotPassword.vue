<template>
    <div>
        <h5 class="text-blue font-bold text-2xl mb-4">فراموشی رمز</h5>
        <p>لطفا شماره مویابل خود را واردکنید تا برای شما رمز ارسال شود.</p>
        <Form class="mt-10">
            <base-input name="phoneNumber" number label="شماره همراه" placeholder="093511100156" />
        </Form>
        <base-button class="w-full mt-9" size="lg">بازیابی کلمه عبور</base-button>
        <base-line-text class="text-xl my-8">
            یا
        </base-line-text>
        <base-button class="w-full mt-9 font-bold" size="lg" outline>
        لینک ورود را برایم ایمیل کن
        </base-button>
        <div class="flex gap-4 items-center justify-center mt-6">
            <p class="m-0">قبلا ثبت نام کرده اید؟</p>
            <button @click="authStore.changeStep('login')" class="text-blue font-bold">ورود به حساب</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { useAuthStore } from '~~/stores/auth.store';


const authStore = useAuthStore();
</script>