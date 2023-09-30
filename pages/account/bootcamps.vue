<template>
    <div class="mt-3">
        <div class="table-responsive mt-4 shadow-md">
            <table>
                <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>مدرس</th>
                        <th>تاریخ شروع</th>
                        <th>تاریخ پایان</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="loading">
                        <tr c v-for="item in [1, 2, 3]">
                            <td width="140">
                                <BaseSkeletonLoaidng type="box" height="8px" />
                            </td>
                            <td width="140">
                                <BaseSkeletonLoaidng type="box" height="8px" />
                            </td>
                            <td width="150">
                                <BaseSkeletonLoaidng type="box" height="8px" />
                            </td>
                            <td width="160">
                                <BaseSkeletonLoaidng type="box" height="8px" />
                            </td>
                            <td>
                                <BaseSkeletonLoaidng type="box" height="8px" />
                            </td>
                            <td>
                                <BaseSkeletonLoaidng type="box" height="8px" />
                            </td>
                        </tr>
                    </template>
                    <template v-for="item in data">
                        <tr>
                            <td>بوتکمپ {{ item.title }}</td>
                            <td>{{ item.teacherName }}</td>
                            <td>{{ toPersianDate(new Date(item.startDate)) }}</td>
                            <td>{{ toPersianDate(new Date(item.endDate)) }}</td>
                            <td>
                                <span class="text-green" v-if="item.status == BootcampStatus.درحال_برگزاری">درحال
                                    برگزاری</span>
                                <span class="text-red" v-else-if="item.status == BootcampStatus.به_اتمام_رسیده">
                                    به اتمام رسیده
                                </span>
                                <span class="text-blue" v-else-if="item.status == BootcampStatus.شروع_ثبت_نام">
                                    شروع ثبت نام
                                </span>
                            </td>
                            <td class="flex justify-center gap-2 items-center">
                                <BaseButton size="sm" :render-button-tag="false" :to="`/bootcamps/${item.slug}`">نمایش
                                </BaseButton>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import { GetUserBootcamps } from "~/services/bootcamp.service";
import { BootCampFilterData, BootcampStatus } from "~/models/bootcamps/BootCampFilterData";
definePageMeta({
    layout: "account",
    title: "بوتکمپ های من"
});
const data: Ref<BootCampFilterData[]> = ref([]);
const loading = ref(false);

onMounted(async () => {
    loading.value = true;
    var res = await GetUserBootcamps();
    if (res.isSuccess) {
        data.value = res.data ?? []
    }
    loading.value = false;
});
</script>
  