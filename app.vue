<template>
  <div>

    <Head>
      <Link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
    </Head>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <base-modal size="sm" :mobile-header="true" :hide-close-btn="true" :header-class="'!p-0 !min-h-0 !h-0'"
        v-model="authStore.isOpenModal">
        <AuthContainer />
      </base-modal>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { useAccountStore } from "~~/stores/account.store";

const authStore = useAuthStore();
const accountStore = useAccountStore();

onMounted(async () => {
  if (authStore.isLogin) {
    await accountStore.initData();
  }
});

watch(() => authStore.isLogin, (val) => {
  if (val == false) {
    accountStore.currentUser = null;
    accountStore.notifications = [];
  } else if (accountStore.currentUser == null) {
    accountStore.initData();
  }
})
</script>