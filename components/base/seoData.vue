<template>
  <Head>
    <Title>{{ meta?.metaTitle }}</Title>
    <Meta content="index , follow" name="robots" v-if="meta.indexPage"/>
    <Meta content="noindex , nofollow" name="robots" v-else/>
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
    <Meta rel="canonical" :href="meta.canonical ?? requestUrl.href" />
    <Meta content="website" property="og:type" />
    <Meta content="summary_large_image" name="twitter:card" />
    <Meta :content="`${requestUrl.protocol}//${requestUrl.host}`" name="twitter:site" />
    <Meta :content="requestUrl.href" property="og:url" />
    <slot />
  </Head>
</template>
  
<script setup lang="ts">
import { date } from 'yup';
import { SeoData } from '~~/models/SeoData';
const requestUrl = useRequestURL();

defineProps<{
  meta: SeoData
}>();

</script>
  
<style></style>