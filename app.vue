<template>
  <div>
    <Head>
      <Link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
      <Script src="/js/ckeditorConfig.js"></Script>
      <Script src="/ckeditor5/build/ckeditor.js"></Script>

      
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <base-modal size="sm" :mobile-header="true" :hide-close-btn="true" :header-class="'!p-0 !min-h-0 !h-0'"
      v-model="authStore.isOpenModal">
      <AuthContainer />
    </base-modal>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";

const authStore = useAuthStore();
</script>