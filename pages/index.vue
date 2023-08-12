<template>
    <div class="py-5">
        <div class="flex gap-3 mb-3">
            <base-button to="/test" :render-button-tag="false">test</base-button>
            <base-button @click="authStore.isOpenModal = true">ورود</base-button>
        </div>
        <div class="my-5 max-h-0" style="width: 80%;margin: auto;">
            <base-video-player src="https://dl.codeyad.com/videos/Courses/Demo/ef814b49-8642-4843-bad0-4430fa37836d.mp4" />

        </div>

    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { Form } from "vee-validate";
const isOpenModal = ref(false);
const authStore = useAuthStore();
definePageMeta({
    colorMode: 'light'
})
</script>