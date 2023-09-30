<template>
    <div class="container py-9 mb-9">
        <h1 class="text-center text-[30px] font-semibold">نویسنده های کدیاد</h1>
        <div class="flex mt-[56px] gap-[52px] flex-wrap justify-center">
            <template v-if="pending">
                <BaseSkeletonLoaidng height="300px" v-for="item in [1, 2, 3, 4]" :key="item"
                    parent-class="teacher-card flex h-[100%] w-[22%] justify-center items-center flex-col bg-surface sm:w-full" />

            </template>
            <template v-else>
                <div class="teacher-card flex w-[22%] justify-center items-center flex-col bg-surface sm:w-full"
                    v-for="item in data?.data">
                    <BaseImg :src="GetUserAvatar(item.imageName)" width="100px" height="100px" :alt="item.fullName" />
                    <p class="text-black text-h7 font-bold mt-1">{{ item.fullName }}</p>
                    <p class=" text-h8 mt-1">{{ item.email }}</p>
                    <baseButton :render-button-tag="false" :to="`/writers/${item.id}`" class="w-full mt-[18px]">
                        مشاهده
                        پروفایل</baseButton>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { GetMasters } from '~/services/master.service';
import { GetWriters } from '~/services/writers.service';

useSeoMeta({
    title: "نویسنده های کدیاد",
    ogTitle: 'نویسنده های کدیاد',
    robots: 'noindex-nofollow'
});

const { data, pending } = useAsyncData('writers', () => GetWriters());
</script>
<style scoped lang="scss">
.teacher-card {
    border-radius: 8.118px;
    box-shadow: 0px 2.70588px 14.20588px 0px rgba(36, 50, 88, 0.11);
    padding: 18px;

    img {
        width: 96.059px;
        height: 96.059px;
        border-radius: 50%;
    }
}
</style>