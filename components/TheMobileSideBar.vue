<template>
    <aside class="relative">
        <NuxtLink @click="CloseSideBar" to="/" class="header">
            <img src="/logo.png" />
        </NuxtLink>
        <div class="mb-12 p-3">
            <ul class="gap-8 flex flex-col mt-2">
                <li>
                    <NuxtLink @click="CloseSideBar" to="/courses">دوره ها</NuxtLink>
                </li>
                <li>
                    <NuxtLink @click="CloseSideBar" to="/mag">بلاگ</NuxtLink>
                </li>
                <li>
                    <NuxtLink @click="CloseSideBar" to="/about">درباره ما</NuxtLink>

                </li>
                <li>
                    <NuxtLink @click="CloseSideBar" to="/masters">مدرسین</NuxtLink>

                </li>
                <li>
                    <NuxtLink @click="CloseSideBar" to="/bootcamps">بوتکمپ ها</NuxtLink>
                </li>
                <li>
                    <NuxtLink @click="CloseSideBar" to="/questions">پرسش و پاسخ</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="p-3 absolute bottom-2 w-full" v-if="authStore.isLogin">
            <BaseButton :render-button-tag="false" to="/account" class="w-full mb-2">ورود به حساب کاربری</BaseButton>
            <BaseButton @click="authStore.logOut" class="w-full font-bold" color="red" outline>خروج از جساب</BaseButton>
        </div>
        <div class="p-3 absolute bottom-2 w-full" v-else>
            <BaseButton @click="register" class="w-full mb-2">ثبت نام</BaseButton>
            <BaseButton @click="login" class="w-full font-bold" outline>ورود</BaseButton>
        </div>

    </aside>
</template>
<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth.store';

const authStore = useAuthStore();
const emits = defineEmits(['closeSideBar']);

const CloseSideBar = () => {
    emits('closeSideBar');
}
const register = () => {
    authStore.openRegisterModal();
}
const login = () => {
    authStore.openLoginModal();
}
</script>
<style scoped lang="scss">
aside {
    width: 80%;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 1001;
    background: var(--color-white);
    font-size: 16px;

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--color-blue-gray-050);
        padding: 1rem;

        img {
            width: 110px;
        }
    }
}
</style>