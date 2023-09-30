<template>
  <div>

    <Head>
      <Link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
    </Head>
    <NuxtLayout>
      <div v-if="utilStore.globalLoading" class="global-loading flex justify-center items-center w-full h-full fixed top-0 right-0">
        <div
          class="content flex justify-center  shadow-sm items-center flex-col bg-white  animate__slow px-12 py-6 rounded ">
          <img src="/logo.png" />
          <p class="mt-4 text-h6 animate__animated animate__heartBeat animate__infinite animate__slow">درحال پردازش
            اطلاعات...</p>
        </div>
      </div>
      <NuxtLoadingIndicator dir="rtl" :height="5" />
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <base-modal size="sm" :mobile-header="true" :hide-close-btn="true" :header-class="'!p-0 !min-h-0 !h-0'"
        v-model="authStore.isOpenModal">
        <AuthContainer />
      </base-modal>
    </ClientOnly>
    <base-modal size="sm" :mobile-header="true" :header-class="'!p-0 !min-h-0 !h-0'" :hide-close-btn="true"
      v-model="utilStore.isOpenFavoriteModal">
      <TheSelectFavoriteCategories />
    </base-modal>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { useAccountStore } from "~~/stores/account.store";
import { useUtilStore } from "./stores/util.store";

const authStore = useAuthStore();
const accountStore = useAccountStore();
const utilStore = useUtilStore();
await utilStore.setSiteSettings();


onMounted(async () => {
  if (authStore.isLogin) {
    await accountStore.initData();

  }
});

watch(() => authStore.isLogin, async (val) => {
  if (val == false) {
    accountStore.currentUser = null;
  } else if (accountStore.currentUser == null) {
    await accountStore.initData();
    if ((accountStore.currentUser!.favoriteCategories?.length ?? 0) == 0) {
      utilStore.isOpenFavoriteModal = true;
    }
  }
})
useSchemaOrg([
  // TODO Select Identity: https://unhead.unjs.io/schema-org/guides/identity
  defineWebSite({
    name: utilStore.siteSettings?.persianSitName,
    description: utilStore.siteSettings?.metaDescription,
    url: "https://codeyad.com",
    inLanguage: 'fa'
  }),
  defineOrganization({
    name: utilStore.siteSettings?.persianSitName,
    url: "https://codeyad.com",
    logo: "/logo.png",
    sameAs: [
      utilStore.siteSettings?.telegram, utilStore.siteSettings?.twitter, utilStore.siteSettings?.instagram, utilStore.siteSettings?.aparat,
    ]
  }),
  defineWebPage()
])
</script>
