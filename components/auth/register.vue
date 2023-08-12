<template>
    <div>
        <h5 class="text-blue font-bold text-2xl">ساخت حساب کاربری</h5>
        <Form class="mt-10">
            <base-input name="email" type="email" label="ایمیل" placeholder="name@example.com" />
            <base-input name="phoneNumber" number class="mt-4 mb-2" label="شماره تلفن" placeholder="093511100156" />
            <base-input-password name="password" placeholder="**************" class="mt-4 mb-2" label="رمز عبور" />
            <base-input-password name="password" placeholder="**************" class="mt-4 mb-2" label="تکرار رمز عبور" />
            <nuxt-link to="/" class="text-blue ">کلمه عبور خود را فراموش کرده اید؟</nuxt-link>
        </Form>
        <base-button class="w-full mt-9" size="lg">ثبت نام</base-button>
        <base-line-text class="text-xl my-8">
            یا
        </base-line-text>
        <base-button class="w-full mt-9 font-bold" transparent>
            <template #icon>
                <IconsGoogle width="40" height="40" />
            </template>
            ثبت نام از طریق گوگل
        </base-button>

        <div class="flex gap-4 items-center justify-center mt-6">
            <p class="m-0">قبلا ثبت نام کرده اید؟</p>
            <button @click="authStore.changeStep('login')" class="text-blue font-bold">ورود به حساب</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth.store';


const authStore = useAuthStore();
</script>