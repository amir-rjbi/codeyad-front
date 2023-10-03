<template>
    <div class="mb-[70px]">
        <BaseSeoData :meta="{
            canonical: `${CurrentDomainUrl}/masters/profile/${data?.data?.teacher.userName}`,
            metaTitle: `پروفایل ${data?.data?.teacher.fullName}`
        }" />
        <MastersMasterProfile :teacher-data="data!.data!" />
    </div>
</template>
<script setup lang="ts">
import { GetMasterByUserName } from '~/services/master.service';
const route = useRoute();
var userName = route.params.slug.toString();
const { data } = await useAsyncData("singleMaster", () => GetMasterByUserName(userName));
if (!data.value?.data) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
<style >
.t-about a:hover {
    @apply text-blue-400
}
</style>