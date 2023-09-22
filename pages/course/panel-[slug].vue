<template>
    <div class="coursePanel flex sm:flex-wrap">

        <Head>
            <Title>{{ videoPlayerData.title }}</Title>
        </Head>
        <template v-if="pending">
            <aside :class="['bg-secondary sm:!w-full', { 'card-loading': videoLoading }]">
                <BaseSkeletonLoaidng height="10px" />
                <BaseSkeletonLoaidng height="500px" class="mt-8" />

            </aside>
            <div class="course-content py-[65px] container sm:!w-full">
                <div class="pr-12 sm:pr-0">
                    <BaseSkeletonLoaidng height="10px" width="110px" class="mb-4" />
                    <BaseSkeletonLoaidng height="400px" class="mb-10" />
                </div>
            </div>
        </template>
        <template v-else>
            <aside :class="['bg-secondary sm:!w-full', { 'card-loading': videoLoading }]">
                <div class="my-4">
                    <div class="flex justify-between">
                        <p class="text-h8">درصد پیشرفت</p>
                        <p>
                            <label class="text-blue"> {{ seenedEpisodeCount }}</label>

                            /
                            <span>{{ videoPlayerData.episodeCount }}</span>
                            جلسه
                        </p>
                    </div>
                    <BaseProgressBar :completed="percentage" />
                </div>
                <h1 class="item mb-4">{{ videoPlayerData.title }}</h1>
                <BaseCollapse :title="item.title" class="item" v-for="item in videoPlayerData.sections"
                    :title-class="item.seenAll ? 'seen-all' : ''">
                    <a href="#player" @click="showVideo(episode)" v-for="(episode, index) in item.episodes" :key="index"
                        :class="['episode-item  items-center flex gap-2 item cursor-pointer',
                            { 'active': episode.id == selectedEpisode?.id },
                            { 'seen': episode.isSeen }]">
                        <svg xmlns="http://www.w3.org/2000/svg" :width="18" :height="18" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M11.1822 10.5901C12.5322 9.81015 12.5322 8.53515 11.1822 7.75515L10.0947 7.12515L9.00719 6.49515C7.65719 5.71515 6.55469 6.35265 6.55469 7.91265V9.16515V10.4176C6.55469 11.6626 7.25969 12.3226 8.23469 12.1351"
                                :stroke="episode.isSeen ? 'green' : '#464646'" stroke-width="1.125" stroke-miterlimit="10"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M3 4.5C2.0625 5.7525 1.5 7.3125 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5C7.9275 1.5 6.9 1.725 5.9775 2.1375"
                                :stroke="episode.isSeen ? 'green' : '#464646'" stroke-width="1.125" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <p>{{ episode.title }}</p>
                    </a>
                </BaseCollapse>
            </aside>
            <div class="course-content py-[65px] container sm:!w-full">
                <div class="pr-12 sm:pr-0">
                    <div id="player" class="flex justify-between flex-wrap mb-2 items-center" v-if="selectedEpisode">
                        <p>عنوان قسمت : <b>{{ selectedEpisode?.title }}</b></p>
                        <div class="flex gap-2">
                            <BaseButton @click="downloadAttachment" color="orange" v-if="selectedEpisode.haveAttachment">
                                دانلود فایل ضمیمه</BaseButton>
                            <BaseButton :disabled="videoLoading" color="green" v-if="selectedEpisode.isSeen == false"
                                @click="Seen">مشاهده کردم
                            </BaseButton>
                        </div>
                    </div>
                    <BaseSkeletonLoaidng v-if="videoLoading" height="400px" class="mb-10" />
                    <BaseVideoPlayer v-else :poster="GetCourseImage(data?.data?.imageName ?? '')" :src="videoUrl" />
                    <div class="tabs justify-between">
                        <div class="items sm:!gap-6">
                            <button @click="selectedTab = 'desc'" :class="{ 'active': selectedTab == 'desc' }"
                                name="desc">توضیحات</button>
                            <button @click="selectedTab = 'comments'" :class="{ 'active': selectedTab == 'comments' }"
                                name="comments">نظرات</button>
                            <button @click="selectedTab = 'requireds'" :class="{ 'active': selectedTab == 'requireds' }"
                                name="requireds">پیش نیاز ها</button>
                            <button @click="selectedTab = 'faqs'" :class="{ 'active': selectedTab == 'faqs' }"
                                name="faqs">پرسش
                                های
                                متداول</button>
                        </div>
                        <button class="share sm:hidden">اشتراک گذاری با لینک کوتاه</button>
                    </div>
                    <div class="tab-content pt-2">
                        <Transition name="page" mode="out-in">
                            <div class="desc p-4" v-if="selectedTab == 'desc'" v-html="videoPlayerData.descriptions">

                            </div>
                            <div class="requireds" v-else-if="selectedTab == 'requireds'">
                                <ClientOnly>
                                    <div class="item flex justify-between gap-4 mb-4 items-center rounded-[12px] flex-wrap p-[19px] bg-white"
                                        v-for="item in videoPlayerData.requirements">
                                        <p class="text-h5">{{ item }}</p>
                                        <BaseButton @click="changeUrl(`/courses?q=${item}`)" class="px-7 sm:w-full">شروع
                                            دوره</BaseButton>
                                    </div>
                                </ClientOnly>
                            </div>
                            <div class="faqs flex gap-6 flex-col" v-else-if="selectedTab == 'faqs'">
                                <BaseCollapse :DownToUpIcon="true" v-for="item in videoPlayerData.faqs" :title="item.title"
                                    :key="item.id">
                                    {{ item.description }}
                                </BaseCollapse>
                            </div>
                        </Transition>
                        <Comments v-show="selectedTab == 'comments'" :comment-type="CommentType.course"
                            :link-id="Number($route.params.slug)" />
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>
<script setup lang="ts">
import { CommentType } from '~/models/comments/Comment';
import { PlayerEpisode } from '~/models/courses/VideoPlayer';
import { GetCourseForPlayer, GetVideoAttachmentFile, SeenVideo } from '~/services/videoPlayer.service';
import { useAuthStore } from '~/stores/auth.store';
import { useUtilStore } from '~/stores/util.store';

const authStore = useAuthStore();
const selectedTab = ref('desc');
const utilStore = useUtilStore();
const route = useRoute();
const toast = useToast();
const selectedEpisode: Ref<PlayerEpisode | null> = ref(null);
const { data, pending } = await useAsyncData("course-panel", () => GetCourseForPlayer(Number(route.params.slug.toString())));
const videoUrl = ref(GetCourseDemo(data.value?.data?.demo ?? ''));
if (!data.value?.data) {
    toast.showToast("درحال حاظر دسترسی به دوره ندارید", ToastType.warning);
    console.log(route.params.slug);
    throw createError({ statusCode: 403, statusMessage: 'دسترسی غیرمجاز' })
}
const videoPlayerData = ref(data.value.data);
const videoLoading = ref(false);
const showVideo = async (episde: PlayerEpisode) => {
    selectedEpisode.value = episde;
    videoLoading.value = true;
    var res = await $fetch<string>(`${BASE_URL}/VideoPlayer/ShowVideo?courseId=${data.value?.data?.id}&episodeToken=${episde.token}&token=${authStore.getAccessToken()}`);
    if (res) {
        videoUrl.value = res ?? '';
    }
    videoLoading.value = false;

}
const Seen = async () => {
    selectedEpisode.value!.isSeen = true;
    await SeenVideo(data.value!.data!.id, selectedEpisode.value!.id);
}
const downloadAttachment = async () => {
    toast.showToast('اگر فایل براش شما دانلود نشد ، باید دسترسی Popup را به مرورگر دهید.', ToastType.info, 5000)
    utilStore.globalLoading = true;
    var res = await GetVideoAttachmentFile(videoPlayerData.value.id, selectedEpisode.value!.token);
    if (res.isSuccess) {
        window.open(res.data!, "_blank")
    }
    utilStore.globalLoading = false;

}
const changeUrl = (url: string) => {
    document.location.replace(url);
}
var percentage = computed(() => {
    var episodes = videoPlayerData.value.episodeCount;
    var seenCount = 0;
    videoPlayerData.value.sections.map((f) => {
        f.episodes.map((r) => {
            if (r.isSeen) {
                seenCount += 1;
            }
        });
    });
    return Number(((seenCount * 100) / episodes).toFixed(2));
});
const seenedEpisodeCount = computed(() => {
    var seenCount = 0;
    videoPlayerData.value.sections.map((f) => {
        f.episodes.map((r) => {
            if (r.isSeen) {
                seenCount += 1;
            }
        });
    });
    return seenCount;
});
definePageMeta({
    layout: 'un-category'
})
</script>
<style scoped lang="scss">
aside {
    width: 25%;

    h1 {
        color: var(--primary-color);
        font-size: 16px;
        font-weight: bold;
    }

    padding: 15px 30px;
}

@media screen and (max-width:768px) {
    .tabs {
        overflow-x: auto;
        overflow-y: hidden;

    }

    .course-content {}
}

.course-content {
    width: 75%;

    .tabs {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-gray-400);
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
        width: 100%;

        .items {
            display: flex;
            gap: 62px;
        }

        button {
            position: relative;
            color: var(--color-black);
            min-width: fit-content;

            &.active {
                font-weight: 900;
                &::after {
                    width: 100%;
                    position: absolute;
                    bottom: -1.15rem;
                    right: 0;
                    z-index: 2;
                    height: 4px;
                    background: var(--primary-color);
                    content: " ";
                }
            }
        }
    }

    .tab-content {

        h1,
        h2,
        h3,
        h4,
        h5 {
            font-size: 20px;
            margin-bottom: 12px;
        }
    }
}

.episode-item {
    &:hover {
        color: var(--primary-color);

        svg {
            path {
                stroke: var(--primary-color);
            }
        }
    }

    &.seen {
        @apply text-green;
    }

    &.active {
        color: var(--primary-color);
        right: -10px;
        position: relative;
        transform: scale(1.1);
        p {
            font-weight: bolder;

        }

        svg {
            path {
                stroke: var(--primary-color);
            }
        }
    }
}

.item {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
}
</style>