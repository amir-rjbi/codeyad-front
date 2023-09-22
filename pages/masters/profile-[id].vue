<template>
    <div class="mb-[70px]">
        <BaseSeoData :meta="{
            canonical: `${CurrentDomainUrl}/masters/profile/${data?.data?.teacher.userName}`,
            metaTitle: `پروفایل ${data?.data?.teacher.fullName}`
        }" />

        <AccountMastersMasterProfile :teacher-data="data!.data!" />
    </div>
</template>
<script setup lang="ts">
import { GetMasterByUserId } from '~/services/master.service';
const route = useRoute();
var userId = route.params.id.toString();
const { data } = await useAsyncData("singleMasterById", () => GetMasterByUserId(userId));
if (!data.value?.data) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
<style >
.t-about a:hover {
    @apply text-blue-400
}
</style>