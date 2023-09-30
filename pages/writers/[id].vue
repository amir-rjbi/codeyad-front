<template>
    <div class="mb-[70px]" v-if="data?.data">
        <BaseSeoData :meta="{
            metaTitle: `پروفایل ${data?.data?.fullName}`
        }" />

        <div class="mb-[70px]">
            <div class="bg-blue text-white w-full py-[80px] sm:py-[40px]">
                <div class="container">
                    <div class="flex gap-10 sm:flex-wrap sm:gap-5 ">
                        <div class="w-[30%] h-[300px] sm:h-[280px] sm:w-[100%]">
                            <BaseImg :src="GetUserAvatar(data.data.imageName)" :alt="data.data.fullName"
                                class=" rounded-[10px] w-full h-full" fit="contain" height="300px" width="300px" />
                        </div>

                        <div class="info flex gap-[18px] flex-col justify-between w-[55%] sm:w-full">
                            <div>
                                <h1 class="text-h3 sm:text-h4">
                                    {{ data.data.fullName }}
                                </h1>
                                <div class="text-h7 t-about" v-html="data.data.aboutUs"></div>
                            </div>
                            <div class="flex gap-7 sm:flex-wrap sm:justify-center">
                                <div class="flex gap-[10px] items-center">
                                    <p>تاریخ عضویت: {{ toPersianDate(new Date(data.data.registerDate)) }}</p>
                                    <IconsCalender color="white" width="24" height="24" />
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <p class="flex items-center  gap-1"> مقالات:
                                        <BaseSkeletonLoaidng v-if="pending" height="10px" width="15px" />
                                        <span v-else>{{ articleFilterResult?.data?.entityCount }}</span>
                                    </p>
                                    <IconsTime color="white " width="24" height="24" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-14 sm:mt-6">
                <h4 class="text-black font-bold text-h3 sm:text-h4">مقالات</h4>
                <div class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                    <BlogArticleCard :row="true" v-for="item in articles" :key="item.id" :item="item" class="mb-4" />
                    <div v-if="pending" class="w-full">
                        <BaseSkeletonLoaidng class="mb-2 w-full" parent-class="w-full" height="250px" v-for="item in [1, 2]" />
                    </div>
                    <div class="flex justify-center w-full" v-if="(articleFilterResult?.data?.pageCount ?? 1) > pageId">
                        <BaseButton class="sm:w-10/12" :loading="pending" @click="pageId += 1">مشاهده بیشتر ...</BaseButton>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { GetWriterArticles, GetWriterById, GetWriters } from '~/services/writers.service';
const route = useRoute();
var userId = route.params.id.toString();

const pageId = ref(1);
const { data } = await useAsyncData("singleWiterById", () => GetWriterById(userId));
const { data: articleFilterResult, pending, refresh } =await useAsyncData('writer-articles', () => GetWriterArticles(userId, pageId.value))
const articles = ref(articleFilterResult.value?.data?.articleDtos ?? []);

watch(articleFilterResult, (val) => {
    val?.data?.articleDtos?.forEach(element => {
        articles.value.push(element)
    });
})
if (!data.value?.data) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
watch(pageId, () => {
    refresh()
})
</script>
<style >
.t-about a:hover {
    @apply text-blue-400
}
</style>