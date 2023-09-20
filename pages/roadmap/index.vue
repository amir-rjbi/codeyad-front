<template>
    <div class="py-5">
        <BaseSeoData :meta="{
            metaTitle: 'مسیرهای یادگیری',
            indexPage: true
        }" />
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
                            isActive: true,
                        }
                    ]" />

                    <h2 class="text-h4 sm:text-h5">موضوعات ویژه</h2>
                    <p class="text-h5 sm:text-h7 mt-1">موضوع موردعلاقه تو انتخاب کن</p>
                    <div class="mt-7">
                        <template v-if="pending">
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
                                v-for="item in data?.data?.roadMapCards.filter(f => f.roadMapType == RoadMapType.special)"
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
                    <template v-if="pending">
                        <BaseSkeletonLoaidng parentClass="h-[450px]" height="100%" class=" w-full" />
                        <div class="video-content mt-8 sm:mt-2">
                            <div class="header flex justify-between items-center">
                                <div class="teacher flex gap-4 items-center">
                                    <BaseSkeletonLoaidng
                                        parentClass="w-[50px] h-[50px] rounded-full sm:w-[33px] sm:h-[33px]"
                                        style="border-radius: 50%;" height="100%" class=" w-full" />
                                    <BaseSkeletonLoaidng height="8px" width="50px" class=" w-full" />
                                </div>
                                <BaseSkeletonLoaidng height="8px" width="50px" class=" w-full" />
                            </div>
                            <BaseSkeletonLoaidng height="8px" width="100px" class=" w-full mt-3 mb-4 sm:mt-1 sm:mb-2" />
                            <BaseSkeletonLoaidng type="three-line" />
                        </div>
                    </template>
                    <template v-if="pending == false && data?.data?.parentRoadMap">
                        <BaseVideoPlayer :src="GetRoadMapVideo(data.data.parentRoadMap.videoName)" class="h-[450px] w-full"
                            :poster="GetRoadMapImage(data.data.parentRoadMap.imageName)" style="object-fit: cover;" />
                        <div class="video-content mt-8 sm:mt-2">
                            <div class="header flex justify-between items-center">
                                <div class="teacher flex gap-4 items-center">
                                    <BaseImg class="w-[60px] h-[60px] rounded-full sm:w-[33px] sm:h-[33px]"
                                        :src="GetUserAvatar(data?.data?.parentRoadMap.teacher.imageName)" width="80px"
                                        alt="teacher" />
                                    <p class="font-bold text-h6 sm:">{{ data?.data?.parentRoadMap.teacher.fullName }}</p>
                                </div>
                                <p class="text-h6 sm:text-[14px]">{{ data.data.parentRoadMap.visit.toLocaleString() }}
                                    بازدید</p>
                            </div>
                            <h1 class="text-h6 font-bold mt-3 mb-4 sm:mt-1 sm:mb-2">{{ data.data.parentRoadMap.title }}</h1>
                            <p class="text-h8">
                                {{ removeHtmlTagsFromString(data.data.parentRoadMap.description).substring(0, 240) }}...
                            </p>
                            <NuxtLink :to="`/roadmap/${data.data.parentRoadMap.slug}`" class="text-blue mt-1 text-h6 ">بیشتر
                                بخوانید...</NuxtLink>
                        </div>
                    </template>
                    <template
                        v-if="pending == false && (data?.data?.roadMapCards.filter(f => f.roadMapType == RoadMapType.programminglanguage).length ?? 0) > 0">
                        <section class="mt-4">
                            <hr/>
                            <h2 class="text-h5 mt-4">نقشه راه زبان های برنامه نویسی</h2>

                            <div class="flex flex-wrap justify-between mt-4">
                                <div class="w-[50%] sm:w-full p-2"
                                    v-for="item in data?.data?.roadMapCards.filter(f => f.roadMapType == RoadMapType.programminglanguage)">
                                    <div class="bg-white rounded">
                                        <base-img class="rounded-t" :src="GetRoadMapImage(item.imageName)"
                                            :alt="item.title" />
                                        <div class="p-2">
                                            <nuxt-link class="text-h8 font-semibold text-blue"
                                                :to="`/roadmap/${item.slug}`">{{ item.title }}</nuxt-link>
                                            <div class="flex justify-between items-center w-full mt-3">
                                                <p class="text-h8">مدرس :{{ item.teacherName }}</p>
                                                <base-button :renderButtonTag="false" class="text-h9" size="sm" :to="`/roadmap/${item.slug}`">
                                                    <template #icon>
                                                        <IconsArrowLeft color="white"/>
                                                    </template>
                                                    مشاهده
                                                </base-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { RoadMapType } from '~/models/roadMap/roadMap';
import { GetRoadMapData } from '~/services/roadmap.service';
import { useUtilStore } from '~/stores/util.store';
import { GetRoadMapVideo } from '~/utils/videoUtils';

const store = useUtilStore();
const { data, pending } = useAsyncData('roadMap', () => GetRoadMapData());

store.roadMapData = data.value?.data ?? null;

</script>