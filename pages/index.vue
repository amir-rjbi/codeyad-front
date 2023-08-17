<template>
    <div class="py-5">
        <BaseButton to="/account" :render-button-tag="false">حساب کاربری</BaseButton>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { Form } from "vee-validate";
const isOpenModal = ref(false);
const authStore = useAuthStore();
</script>