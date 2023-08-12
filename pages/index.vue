<template>
    <div class="py-5">
        <base-button to="/test" :render-button-tag="false" @click="isOpenModal = true">نمایش</base-button>
        <div class="my-5 max-h-0" style="width: 80%;margin: auto;">
            <base-video-player src="https://dl.codeyad.com/videos/Courses/Demo/ef814b49-8642-4843-bad0-4430fa37836d.mp4" />

        </div>

    </div>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
const isOpenModal = ref(false);
</script>