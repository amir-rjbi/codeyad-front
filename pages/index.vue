<template>
    <div class="py-5">
        <HomeLandingBanner />
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { Form } from "vee-validate";
const isOpenModal = ref(false);
const authStore = useAuthStore();
</script>