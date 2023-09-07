<template>
    <div class=" relative">
        <div class="text-banner">
            <p class="sm:text-h7">"کدنویسی، هنری برای خلق دنیای بهتر"</p>
        </div>
        <header class="main !sticky top-0 ">
            <div class="container py-7">
                <BaseSpyScroll tabClass="flex justify-between">
                    <template #tabs>
                        <NuxtLink to="/"><img src="/logo.png" class="w-[162px] h-[45px]" alt="logo" /></NuxtLink>
                        <nav class="links flex sm:hidden gap-[56px]">
                            <a href="#desc" class="active">معرفی دوره</a>
                            <a href="#sections" class="">سرفصل های دوره</a>
                            <a href="#questions" class="">سواالات متداول</a>
                        </nav>
                        <BaseButton class="px-6">ثبت نام بوت کمپ </BaseButton>
                    </template>
                </BaseSpyScroll>
            </div>
        </header>
        <main>
            <div class="intro py-[67px] text-white text-center d-flex justify-center items-center">
                <h1 class="text-h3 font-bold mb-8">بوت کمپ طراحی گرافیک</h1>
                <p class="text-h5 font-normal w-[50%] m-auto sm:w-[90%]">
                    کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که بر روی درآمدزایی ، مهارت های نرم ،اصول
                    مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است
                </p>
                <div class="flex flex-col gap-10 justify-center items-center mt-20">
                    <p class="text-h4 font-bold">طراح گرافیک شوید</p>
                    <BaseButton color="orange" class="text-h5">ثبت نام بوت کمپ</BaseButton>
                </div>
            </div>
            <div class="container">
                <div id="desc" class="section">
                    <div class="cards flex gap-3 flex-wrap justify-between py-[110px] sm:py-10 sm:justify-center">
                        <div
                            class="detail-card flex flex-col px-9 sm:px-8 py-8 gap-[10px] justify-center items-center  bg-white rounded-[16px]">
                            <div class="flex flex-col gap-[10px] ustify-center items-center">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p class="text-black font-bold">تاریخ شروع دوره</p>
                            </div>
                            <p class="font-bold">۱۴۰۲/۰۲/۰۳</p>
                        </div>
                        <div
                            class="detail-card flex flex-col px-9 sm:px-8  py-8 gap-[10px] justify-center items-center  bg-white rounded-[16px]">
                            <div class="flex flex-col gap-[10px] ustify-center items-center">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p class="text-black font-bold">تاریخ شروع دوره</p>
                            </div>
                            <p class="font-bold">۱۴۰۲/۰۲/۰۳</p>
                        </div>
                        <div
                            class="detail-card flex flex-col px-[23px] sm:px-4  pb-4 py-8 gap-[10px] justify-center items-center  bg-white rounded-[16px]">
                            <div class="flex flex-col gap-[10px] ustify-center items-center">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p class="text-black font-bold">روز برگزاری</p>
                            </div>
                            <div class="text-center">
                                <p class="font-bold">یکشنبه و سه شنبه</p>
                                <p class="font-bold">
                                    ساعت ۱۸:۳۰ تا ۲۰:۰۰
                                </p>
                            </div>
                        </div>

                        <div
                            class="detail-card flex flex-col px-9 sm:px-8  py-8  gap-[10px] justify-center items-center  bg-white rounded-[16px]">
                            <div class="flex flex-col gap-[10px] ustify-center items-center">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p class="text-black font-bold">نوع برگزاری </p>
                            </div>
                            <p class="font-bold">آنلاین و حضوری</p>
                        </div>
                        <div
                            class="detail-card flex flex-col px-9 sm:px-8  py-8 gap-[10px] justify-center items-center  bg-white rounded-[16px]">
                            <div class="flex flex-col gap-[10px] ustify-center items-center">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p class="text-black font-bold">محل برگزاری</p>
                            </div>
                            <p class="font-bold">دیسکورد کدیاد</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-24">
                        <div class="description  w-[70%] sm:w-[100%] mx-auto text-center">
                            <h2 class="text-h3 sm:text-h4 mb-2 text-black  font-bold">درباره بوت کمپ طراحی گرافیک</h2>
                            <p class="text-h5 sm:text-h6">
                                کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که بر روی درآمدزایی ، مهارت های
                                نرم
                                ،اصول
                                مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است
                            </p>
                        </div>
                        <div class="video w-[90%] mx-auto  h-[600px]  sm:h-[300px]">
                            <div class="back" v-if="playVideo == false">
                                <svg @click="playVideo = true" xmlns="http://www.w3.org/2000/svg" width="84" height="118"
                                    viewBox="0 0 84 118" fill="none">
                                    <path
                                        d="M0.19335 7.62307C0.19335 1.88888 6.71018 -1.41283 11.3337 1.97886L81.126 53.176C84.9388 55.973 84.9388 61.6676 81.1259 64.4645L11.3337 115.66C6.71009 119.052 0.193353 115.75 0.193353 110.016L0.19335 58.8193V7.62307Z"
                                        fill="white" />
                                </svg>
                            </div>
                            <video ref="video" poster="/images/course.jpg" src="https://codeyad.com/bootcamp/design.mp4"
                                :controls="playVideo" class=" h-[600px] sm:h-[300px] object-cover" />
                        </div>
                    </div>
                </div>
                <div class="section pt-[110px]" id="sections">
                    <h3 class="text-center text-black text-h3 sm:text-h4 font-bold mb-10">سرفصل های دوره</h3>
                    <div class="sections ">
                        <div class="item"
                            v-for="(item, index) in ['طراحی گرافیک چیست؟', 'آشنایی با کوچک ترین واحد تشکیل دهنده تصاویر']">
                            <p class="text-blue text-h4 font-bold sm:text-h5 title">{{ item }}</p>
                            <p class="text-h6 sm:text-h7 mt-2">کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که
                                بر روی
                                درآمدزایی ، مهارت های
                                نرم ،اصول مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است </p>
                            <div class="teachers mt-6 flex flex-wrap gap-4 sm:gap-2">
                                <div class="teacher flex items-center gap-3" v-for="item in index + 1">
                                    <base-img src="static/images/users/avatar.png"
                                        class="w-[70px] h-[70px] sm:w-[45px] sm:h-[45px] rounded-full" alt="teacher" />
                                    <div>
                                        <p class="text-black">محمد اشرافی</p>
                                        <p>کارشناس گرافیک</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="section pr-8 py-[115px] sm:pr-0" id="questions">
                    <h3 class="text-center text-black text-h3 sm:text-h4 font-bold mb-10">سوالات متداول</h3>
                    <div class="flex flex-col gap-4">
                        <BaseCollapse title-class="!font-bold text-h4 sm:!text-h5" title="پیش نیاز های دوره ؟"
                            -down-to-up-icon>
                            <p class="text-h6 sm:text-h7 mt-2">کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که
                                بر روی
                                درآمدزایی ، مهارت های
                                نرم ،اصول مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است </p>
                        </BaseCollapse>
                        <BaseCollapse title-class="!font-bold text-h4 sm:!text-h5"
                            title="آیا در طول بوت کمپ امکان پرسش سوالات و دریافت پاسخ از منتورها وجود دارد؟‌"
                            -down-to-up-icon>
                            <p class="text-h6 sm:text-h7 mt-2">کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که
                                بر روی
                                درآمدزایی ، مهارت های
                                نرم ،اصول مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است </p>
                        </BaseCollapse>
                        <BaseCollapse title-class="!font-bold text-h4 sm:!text-h5"
                            title="این ورکشاپ برای چه کسانی مناسب است؟" -down-to-up-icon>
                            <p class="text-h6 sm:text-h7 mt-2">کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که
                                بر روی
                                درآمدزایی ، مهارت های
                                نرم ،اصول مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است </p>
                        </BaseCollapse>
                        <BaseCollapse title-class="!font-bold text-h4 sm:!text-h5" title="پلتفرم برگزاری دوره ؟"
                            -down-to-up-icon>
                            <p class="text-h6 sm:text-h7 mt-2">کدیاد اولین برگزار کننده بوت کمپ طراحی سایت در ایران هستش که
                                بر روی
                                درآمدزایی ، مهارت های
                                نرم ،اصول مذاکره و آموزش و طراحی قالب برای فروش در مارکت های راستچین و ژاکت است </p>
                        </BaseCollapse>
                    </div>
                </div>
            </div>

        </main>
        <TheFooter />
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: "empty"
});
var video: Ref<HTMLVideoElement | null> = ref(null);
const playVideo = ref(false);


watch(playVideo, (val) => {
    if (val == true) {
        video.value?.play();
    }
});
const setPlay = () => {
    playVideo.value = true;
}
const setStop = () => {
    playVideo.value = false;
}
onMounted(() => {
    setTimeout(() => {
        video.value!.addEventListener("play", setPlay);
        video.value!.addEventListener("pause", setStop);
    }, 500);
});
onUnmounted(() => {
    video.value!.removeEventListener("play", setPlay);
    video.value!.removeEventListener("pause", setStop);
})

</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .back {
        svg {
            width: 44px;
        }
    }

    .sections {
        padding-right: 1.5rem !important;

        .title {
            &::after {
                right: -1.80rem !important;
            }
        }
    }
}

.sections {
    padding-right: 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 80px;

    &::after {
        position: absolute;
        right: 0rem;
        width: 1.5px;
        top: 1.5rem;
        height: 100%;
        border-radius: 50%;
        content: " ";
        background: var(--primary-color);
        z-index: 1;
    }

    .title {
        position: relative;

        &::after {
            position: absolute;
            right: -2.30rem;
            width: 11px;
            top: 1.25rem;
            height: 11px;
            border-radius: 50%;
            z-index: 2;
            content: " ";
            background: var(--primary-color);
        }
    }
}

.video {
    position: relative;
    border-radius: 27px;

    video {
        border-radius: 27px;
        width: 100%;
    }

    .back {
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.342));
        border-radius: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;

        svg {
            cursor: pointer;
        }
    }
}

header {
    background: #EEF4FB;
    z-index: 5;
}

main {
    .intro {
        position: relative;
        overflow: hidden;

        &::after {
            background: rgba(40, 107, 184, 0.80);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            content: " ";
            z-index: -1;
        }

        &::before {
            content: " ";
            background: url('/images/bootcamp-bg.png') no-repeat;
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 100%;
            position: absolute;
            top: -0%;
            right: 0;
            z-index: -2;
        }
    }
}

.links {
    a {
        @apply text-black;
        font-weight: 500;
        font-size: 16px;

        &.active {
            color: var(--primary-color);
        }
    }
}
</style>