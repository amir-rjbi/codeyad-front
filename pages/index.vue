<template>
    <div class="py-5 ">
        <div class="container">
            <HomeLandingBanner />
            <HomeLinks />
            <div class="flex gap-[100px] flex-col">
                <HomePopularCourses />
                <section class="description text-center flex flex-col justify-center items-center  ">
                    <h6 class="text-blue text-h2">برنامه نویسی رو از کجا شروع کنم؟</h6>
                    <p class="text-h4 text-center sm:text-[13px] mt-7 sm:mt-4 sm:font-bold ">
                        برنامه‌نویسی ابزاری نوین برای تسلط بر جهان تکنولوژی است. بهترین روش برای فراگیری این علم از پایه و
                        به
                        صورت
                        تخصصی، گذراندن دوره‌های آموزش برنامه نویسی زیر نظر مدرسان کارآزموده است. کدیاد، تیمی متشکل از مدرسان
                        متخصص
                        می‌باشد و هدفشان آموزش صفر تا صد برنامه نویسی به علاقه‌مندان است. در ضمن بسیاری از دوره‌های موجود در
                        کدیاد،
                        رایگان بوده و شما می‌توانید نیمی از مسیر را بدون هیچ هزینه‌ای پیش بروید.
                    </p>
                    <BaseButton class="sm:w-full shadow-sm sm:mt-4 mt-14" :render-button-tag="false" to="/">بزن بریم
                    </BaseButton>
                </section>
            </div>
        </div>
        <HomeSpecialComments />
        <HomeArticles />
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";
import { Form } from "vee-validate";
const isOpenModal = ref(false);
const authStore = useAuthStore();
</script>