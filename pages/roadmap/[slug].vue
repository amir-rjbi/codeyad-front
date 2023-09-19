<template>
    <div class="py-5">
        <BaseSeoData v-if="roadMapData.seoData" :meta="roadMapData.seoData" />
        <div class="container">
            <div class="flex justify-between sm:flex-col sm:gap-[55px] relative ">
                <div class="side-bar w-[35%] sm:!w-full sticky top-2 h-fit sm:!relative">
                    <BaseBreadCrumb class="mb-4" :items="[
                        {
                            title: 'خانه',
                            isActive: false,
                            link: '/'
                        },
                        {
                            title: 'نقشه راه',
                            isActive: false,
                            link: '/roadmap'
                        },
                        {
                            title: roadMapData.title,
                            isActive: true,

                        },
                    ]" />
                    <h2 class="text-h4 sm:text-h5">موضوعات ویژه</h2>
                    <p class="text-h5 sm:text-h7 mt-1">موضوع موردعلاقه تو انتخاب کن</p>
                    <div class="mt-7">
                        <template v-if="loading">
                            <div v-for="item in [1, 2, 3, 4]" :key="item"
                                class="bg-white items-center rounded-[12px] py-[0.70rem] px-[18px] flex gap-3 mb-2">
                                <BaseSkeletonLoaidng parentClass="w-[50px] h-[50px] rounded-full sm:w-[33px] sm:h-[33px]"
                                    style="border-radius: 50%;" height="100%" class=" w-full" />
                                <div class="content">
                                    <BaseSkeletonLoaidng height="8px" width="200px" class=" w-full" />
                                    <BaseSkeletonLoaidng height="8px" width="120px" class=" w-full mt-2" />
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <nuxt-link
                                v-for="item in utilStore.roadMapData?.roadMapCards.filter(f => f.roadMapType == RoadMapType.special)"
                                :key="item.slug" :to="`/roadmap/${item.slug}`"
                                class="bg-white items-center rounded-[12px] py-[0.70rem] px-[18px] flex gap-3 mb-2">
                                <BaseImg class="w-[55px] h-[55px] rounded-full" :alt="item.title"
                                    :src="GetRoadMapImageThumbnal(item.thumbnailName)" width="100px" />
                                <div class="content">
                                    <p class="text-[16px] font-semibold">{{ item.title }}</p>
                                    <p class="text-[14px]">مدرس: {{ item.teacherName }}</p>
                                </div>
                            </nuxt-link>
                        </template>
                    </div>
                </div>
                <div class="content w-[60%] sm:!w-full  md:w-[62%]">
                    <BaseVideoPlayer :src="GetRoadMapVideo(roadMapData.videoName)" class="h-[450px] w-full"
                        :poster="GetRoadMapImage(roadMapData.imageName)" style="object-fit: cover;" />
                    <div class="video-content mt-8 sm:mt-2">
                        <div class="header flex justify-between items-center">
                            <div class="teacher flex gap-4 items-center">
                                <BaseImg width="100px" class="w-[60px] h-[60px] rounded-full sm:w-[33px] sm:h-[33px]"
                                    :src="GetUserAvatar(roadMapData.teacher.imageName)"
                                    :alt="roadMapData.teacher.fullName" />
                                <p class="font-bold text-h6 sm:">{{ roadMapData.teacher.fullName }}</p>
                            </div>
                            <p class="text-h6 sm:text-[14px]">{{ roadMapData.visit.toLocaleString() }} بازدید</p>
                        </div>
                        <h1 class="text-h6 font-bold mt-3 mb-4 sm:mt-1 sm:mb-2">{{ roadMapData.title }}</h1>
                        <p class="text-h8" v-if="roadMapData.seoData?.metaDescription">
                            {{ roadMapData.seoData.metaDescription }}
                        </p>
                    </div>
                    <div class="read-map-content" v-html="roadMapData.description">
                    </div>
                    <section class="comments mt-12">
                        <Comments :linkId="roadMapData.id" :commentType="CommentType.roadMap" />
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CommentType } from '~/models/comments/Comment';
import { RoadMapType } from '~/models/roadMap/roadMap';
import { GetRoadMapBySlug, GetRoadMapData } from '~/services/roadmap.service';
import { useAuthStore } from '~/stores/auth.store';
import { useUtilStore } from '~/stores/util.store';
const loading = ref(true);
const utilStore = useUtilStore();
const route = useRoute();
const { data } = await useAsyncData('singleRoadMap', () => GetRoadMapBySlug(route.params.slug.toString()));
if (!data.value?.data) {
    throw createError({ statusCode: 404, message: 'not found' })
}
const roadMapData = ref(data.value.data)
console.log(roadMapData.value.seoData);
onMounted(async () => {
    loading.value = true;
    if (utilStore.roadMapData == null) {
        var res = await GetRoadMapData();
        if (res.isSuccess) {
            utilStore.roadMapData = res.data ?? null;
        }
    }
    loading.value = false;
})
</script>
<style  lang="scss">
@media screen and (max-width:768px) {
    .read-map-content {
        padding-right: 1.5rem;

        &::after {
            right: 0 !important;
        }

        h1,
        h2,
        h3,
        h5,
        h6 {
            &::after {
                right: -1.80rem !important;
            }
        }

    }
}

.read-map-content {
    margin-top: 2.5rem;
    font-size: var(--h7-font-size);
    font-weight: 400;
    font-style: normal;
    text-align: right;
    position: relative;
    height: fit-content;

    a {
        display: inline-block;
    }

    &::after {
        position: absolute;
        right: -1.70rem;
        width: 1.5px;
        top: 1rem;
        height: calc(100% - 1rem);
        border-radius: 50%;
        content: " ";
        background: var(--primary-color);
        z-index: 1;
    }

    p {
        margin: 0;
    }

    h1,
    h2,
    h3,
    h5,
    h6 {
        color: var(--primary-color) !important;
        font-size: 20px;
        margin-bottom: 11px;
        margin-top: 50px;
        font-weight: 700;
        position: relative;

        &::after {
            position: absolute;
            right: -2rem;
            width: 11px;
            top: .80rem;
            height: 11px;
            border-radius: 50%;
            z-index: 2;
            content: " ";
            background: var(--primary-color);
        }
    }
}
</style>