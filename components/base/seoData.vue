<template>
  <Head>
    <Title>{{ meta?.metaTitle }}</Title>
    <template v-if="meta.metaTitle">
      <Meta name="og:title" :content="meta.metaTitle" />
      <Meta name="twitter:title" :content="meta.metaTitle" />
    </template>
    <template v-if="meta.metaDescription">
      <Meta name="description" :content="meta.metaDescription" />
      <Meta name="twitter:description" :content="meta.metaDescription" />
      <Meta name="og:description" :content="meta.metaDescription" />
    </template>
    <Meta name="keywords" v-if="meta.metaKeyWords" :content="meta.metaKeyWords" />
    <Meta rel="canonical" :href="meta.canonical" v-if="meta.canonical" />
    <slot />
  </Head>
</template>
  
<script setup lang="ts">
import { SeoData } from '~~/models/SeoData';


defineProps<{
  meta: SeoData
}>();

</script>
  
<style></style>