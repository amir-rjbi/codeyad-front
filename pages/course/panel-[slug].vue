<template>
    <div class="coursePanel flex sm:flex-wrap">
        <aside class="bg-secondary sm:!w-full">
            <h1 class="item mb-4">آموزش پروژه محور ری اکت</h1>
            <BaseCollapse title="شروع" class="item">
                <div v-for="item in [1, 2, 3]" :key="item" :class="['episode-item  items-center flex gap-2 item cursor-pointer',
                    { 'active': item == 2 }]">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="18" :height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M11.1822 10.5901C12.5322 9.81015 12.5322 8.53515 11.1822 7.75515L10.0947 7.12515L9.00719 6.49515C7.65719 5.71515 6.55469 6.35265 6.55469 7.91265V9.16515V10.4176C6.55469 11.6626 7.25969 12.3226 8.23469 12.1351"
                            stroke="#464646" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M3 4.5C2.0625 5.7525 1.5 7.3125 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5C7.9275 1.5 6.9 1.725 5.9775 2.1375"
                            stroke="#464646" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>React چیست ؟</p>
                </div>
            </BaseCollapse>

            <BaseCollapse title="نحوه نصب و راهن اندازی React" class="item">
                <div v-for="item in [1, 2, 3]" :key="item" class="episode-item items-center flex gap-2 item cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="18" :height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M11.1822 10.5901C12.5322 9.81015 12.5322 8.53515 11.1822 7.75515L10.0947 7.12515L9.00719 6.49515C7.65719 5.71515 6.55469 6.35265 6.55469 7.91265V9.16515V10.4176C6.55469 11.6626 7.25969 12.3226 8.23469 12.1351"
                            stroke="#464646" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M3 4.5C2.0625 5.7525 1.5 7.3125 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5C7.9275 1.5 6.9 1.725 5.9775 2.1375"
                            stroke="#464646" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>React چیست ؟</p>
                </div>
            </BaseCollapse>
            <BaseCollapse title="پروژه عملی اول : پیاده سازی فروشگاه اینترنتی با Next" class="item">
                <div v-for="item in [1, 2, 3]" :key="item" class="episode-item items-center flex gap-2 item cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="18" :height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M11.1822 10.5901C12.5322 9.81015 12.5322 8.53515 11.1822 7.75515L10.0947 7.12515L9.00719 6.49515C7.65719 5.71515 6.55469 6.35265 6.55469 7.91265V9.16515V10.4176C6.55469 11.6626 7.25969 12.3226 8.23469 12.1351"
                            stroke="#464646" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M3 4.5C2.0625 5.7525 1.5 7.3125 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5C7.9275 1.5 6.9 1.725 5.9775 2.1375"
                            stroke="#464646" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>React چیست ؟</p>
                </div>
            </BaseCollapse>
            <BaseCollapse class="item" v-for="item in 
            ['تمرین : A complete project', 'رفع اشکال React Apps', 'Styling React Components']" :title="item">
                <div v-for="item in [1, 2, 3]" :key="item" class="episode-item items-center flex gap-2 item cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" :width="18" :height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M11.1822 10.5901C12.5322 9.81015 12.5322 8.53515 11.1822 7.75515L10.0947 7.12515L9.00719 6.49515C7.65719 5.71515 6.55469 6.35265 6.55469 7.91265V9.16515V10.4176C6.55469 11.6626 7.25969 12.3226 8.23469 12.1351"
                            stroke="#464646" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M3 4.5C2.0625 5.7525 1.5 7.3125 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5C7.9275 1.5 6.9 1.725 5.9775 2.1375"
                            stroke="#464646" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>React چیست ؟</p>
                </div>
            </BaseCollapse>
        </aside>
        <div class="course-content py-[60px] container sm:!w-full">
            <BaseVideoPlayer poster="/images/course.png" />
            <div class="tabs justify-between">
                <div class="items sm:!gap-6">
                    <button @click="selectedTab = 'desc'" :class="{ 'active': selectedTab == 'desc' }"
                        name="desc">توضیحات</button>
                    <button @click="selectedTab = 'comments'" :class="{ 'active': selectedTab == 'comments' }"
                        name="comments">نظرات</button>
                    <button @click="selectedTab = 'requireds'" :class="{ 'active': selectedTab == 'requireds' }"
                        name="requireds">پیش نیاز ها</button>
                    <button @click="selectedTab = 'faqs'" :class="{ 'active': selectedTab == 'faqs' }" name="faqs">پرسش های
                        متداول</button>
                </div>
                <button class="share sm:hidden">اشتراک گذاری با لینک کوتاه</button>
            </div>
            <div class="tab-content pt-2">
                <Transition name="page" mode="out-in">
                    <div class="desc p-4" v-if="selectedTab == 'desc'">
                        <h2>به دوره خوش آمدید</h2>
                        <p>
                            ری اکت چیست؟
                            React یک کتابخانه‌ی جاوا اسکریپتی است که برای ساخت یوزر اینترفیس یا همان رابط کاربری مورد
                            استفاده
                            قرار
                            می‌گیرد. همه‌ی این آلمان‌های در این صفحه کنار هم برای ما رابط کاربری را تشکیل می‌دهند. (یوزر
                            اینترفیس
                            (رابط کاربری) چیزی که با کاربر در ارتباط است). کاربرد ری‌اکت این است که یوزر اینترفیس را برای ما
                            با
                            یک
                            سری ویژگی‌های خاص می‌سازد. یکی از مهمترین ویژگی‌ها این است که React این قابلیت را دارد که برای
                            ما
                            یوزر
                            اینترفیس‌ها یا رابط‌های کاربری را با سرعت بالا بسازد. مسلما سرعت بالای هر وبسایت می‌تواند در جذب
                            کاربر
                            تاثیر بسزایی داشته باشد. پس تا به این جا همان طور که گفتم ری‌اکت یک کتابخانه‌‌ی جاوا اسکریپتی
                            برای
                            ساخت
                            رابط‌های کاربری با سرعت بالا است.
                        </p>
                    </div>
                    <CourseComments v-else-if="selectedTab == 'comments'" />
                    <div class="requireds" v-else-if="selectedTab == 'requireds'">
                        <div class="item flex justify-between gap-4 mb-4 items-center rounded-[12px] flex-wrap p-[19px] bg-white"
                            v-for="item in ['الگوریتم و فلوچارت', 'سی شارپ']">
                            <p class="text-h5">{{ item }}</p>
                            <BaseButton class="px-7 sm:w-full" >شروع دوره</BaseButton>
                        </div>
                    </div>
                    <div class="faqs flex gap-6 flex-col" v-else-if="selectedTab == 'faqs'">
                        <BaseCollapse :DownToUpIcon="true" v-for="item in ['یادگیری زبان برنامه نویسی پایتون آسان است؟',
                            'چرا میان تمام زبان‌های برنامه نویسی موجود، این زبان بسیار پرطرفدار و محبوب می‌باشد؟',
                            'زبان برنامه نویسی پایتون چیست؟']" :title="item">

                            یادگیری و استفاده‌ی آسان، همه‌منظوره و بدون محدودیت، نزدیکی به زبان انسان و خوانایی بالا،
                            افزونه‌سازی و استفاده از افزونه‌ها، شی‌گرا و سرگرم‌کننده و کتابخانه‌های عمومی و منابع رایگان
                            برخی از ویژگی های این زبان برنامه نویسی است. همچنین با این زبان، غول های فناوری مثل اینستاگرام،
                            فیسبوک، یوتیوب و... ساخته شده است. به همین دلیل این زبان محبوبیت و شهرت خاص و زیادی دارد.
                        </BaseCollapse>
                    </div>
                </Transition>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const selectedTab = ref('desc');

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

    }
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

    &.active {
        color: var(--primary-color);

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