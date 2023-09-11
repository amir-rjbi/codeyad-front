<template>
    <div class="pb-[84px]">
        <div class="course-banner py-[68px] bg-blue sm:py-[48px]">
            <div class="container">
                <div class="flex justify-between gap-[60px] sm:flex-col-reverse sm:gap-[40px]">
                    <div class="info w-[50%] text-white flex flex-col gap-[17px] sm:!w-full sm:gap-[12.23px]">
                        <nuxt-link to="/courses" class="category-tag  text-blue bg-secondary rounded-3xl w-fit p-2">
                            برنامه نویسی وب
                        </nuxt-link>
                        <h1 class=" text-h3 sm:text-h7">آموزش جامع و پروژه محور ری اکت (React)</h1>
                        <p class="text-h8 ">
                            یکی از کاربردی‌ترین ابرارهایی که برای اپلیکیشن‌های تک صفحه‌ای به منظور مدیریت لایه‌ها استفاده
                            می‌شود، ری‌ اکت می‌باشد.
                        </p>
                        <div class="flex justify-between gap-2 py-2 flex-wrap sm:gap-4">
                            <div class="flex gap-2 items-center sm:w-full">
                                <span>آخرین بروزرسانی در تاریخ 1402/02/03</span>
                                <IconsCalender color="white" />
                            </div>
                            <div class="flex gap-2 items-center sm:w-full">
                                <span>36 ساعت</span>
                                <IconsTime color="white" />
                            </div>
                            <div class="flex gap-2 items-center sm:w-full">
                                <span>745 دانشجو</span>
                                <icons-users color="white" />
                            </div>
                        </div>
                        <div class="flex justify-between flex-wrap gap-3">
                            <p class="text-h5 text-green-action font-semibold">قیمت دوره : 1,500,000 تومان</p>
                            <BaseButton :render-button-tag="false" to="/course/panel-test" class="sm:w-full" color-white>
                                شروع
                                دوره
                                <template #icon>
                                    <IconsArrowLeft color="var(--primary-color)" />
                                </template>
                            </BaseButton>
                        </div>
                    </div>
                    <base-img alt="courseTitle" class="w-[50%] rounded-[10px] h-[300px] sm:!w-full sm:h-[183px]"
                        style="object-fit: fill;" src="static/images/course.png" />
                </div>
            </div>
        </div>
        <BaseSpyScroll tab-class="sticky top-0 bg-bodyBg z-10 container">
            <template #tabs>
                <div class="tabs sm:overflow-x-auto">
                    <a href="#content" class="active">محتوای دوره</a>
                    <a href="#sections">سرفصل های دوره</a>
                    <a href="#specification">ویژگی های دوره</a>
                    <a href="#comments">نظرات دانشجویان</a>
                </div>
            </template>
            <div class="course-content ">
                <div id="content" class="section container mb-[70px] sm:!mb-3 pt-9">
                    <h2 class="text-h5 font-bold dark:text-white mb-4">توضیحات</h2>
                    <p>
                        ری اکت چیست؟
                        React یک کتابخانه‌ی جاوا اسکریپتی است که برای ساخت یوزر اینترفیس یا همان رابط کاربری مورد استفاده
                        قرار می‌گیرد. همه‌ی این آلمان‌های در این صفحه کنار هم برای ما رابط کاربری را تشکیل می‌دهند. (یوزر
                        اینترفیس (رابط کاربری) چیزی که با کاربر در ارتباط است). کاربرد ری‌اکت این است که یوزر اینترفیس را
                        برای ما با یک سری ویژگی‌های خاص می‌سازد. یکی از مهمترین ویژگی‌ها این است که React این قابلیت را دارد
                        که برای ما یوزر اینترفیس‌ها یا رابط‌های کاربری را با سرعت بالا بسازد. مسلما سرعت بالای هر وبسایت
                        می‌تواند در جذب کاربر تاثیر بسزایی داشته باشد. پس تا به این جا همان طور که گفتم ری‌اکت یک
                        کتابخانه‌‌ی جاوا اسکریپتی برای ساخت رابط‌های کاربری با سرعت بالا است. اینستاگرام به تنهایی می‌تواند
                        یک وزنه‌ی سنگین برای معرفی ری‌اکت‌نیتیو باشد که از این نوع کتابخانه‌ استفاده می‌کند.
                        ری اکت در کنار دو رقیب
                        React برای اولین بار در سال ۲۰۱۱ توسط فیس بوک استفاده شد. بعد از آن روز به روز به محدودیت ری‌اکت
                        افزوده شد. فیس بوک شرکت کوچکی نبود و استفاده‌ی فیس‌بوک از ری‌اکت نشان دهنده‌ی این است که قابلیت
                        بالایی دارد. اگر سری به گوگل ترنس بزنیم و این نوع کتابخانه را در کنار دو رقیبش angular و vue قرار
                        دهیم، می‌بینیم با توجه به قدرتی که این دو رقیب دارند باز هم React پیشتاز است. React برخلاف angular و
                        vue که فریم ورک‌های جاوا اسکریپتی هستند یک کتابخانه است و همین کتابخانه بودنش باعث شده است که اولا
                        خیلی سبک باشد، استفاده از آن آسان و از همه مهم‌تر یادگیری‌اش بسیار راحت است.
                        چرا یادگیری React ساده است؟
                        چرا که ما فقط قرار است از سینتکس خود از جاوا اسکریپت استفاده کنیم. اگر تا حدودی با جاوا اسکریپت آشنا
                        باشیم می‌توانیم به راحتی از آن استفاده کنیم. یکی از مزایای دیگر این نوع کتابخانه کامپوننت محور بودن
                        آن می‌باشد. یعنی همه‌ی آلمان‌های صفحه را داخل یک کامپوننت قرار می‌دهیم و با کنار هم قرار گرفتن آنها
                        پروژه‌ی ما شکل می‌گیرد. حسن این کار این است که مدیریت قسمت‌های مختلف پروژه برای ما خیلی آسان می‌شود.
                        هر تغییری بخواهیم در هر لحظه در پروژه انجام بدهیم نیاز به برسی کدهای زیادی نداریم چرا که هر قسمت
                        خودش یک کامپوننت مجزا است و به راحتی می‌توانیم آن قسمت را پیدا کنیم و تغییر در آن اعمال کنیم.
                    </p>
                </div>
                <CourseLandingSections />
                <div id="specification" class="section container pt-14">
                    <h3 class="text-h5 font-bold dark:text-white text-center mb-[50px]">ویژگی های دوره</h3>
                    <div class="flex justify-between sm:flex-wrap sm:gap-9">
                        <div v-for="item in [1, 2, 3]"
                            class="spec-card w-[28%]
                            md:!w-[32%]
                            text-center flex p-[23px] sm:p-[30px] flex-col items-center justify-center gap-5 bg-secondary rounded-[20px]">
                            <div class="flex flex-col gap-3 items-center justify-center ">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p>معرفی منابع</p>
                            </div>
                            <p>بر اساس منابع مطرح طراحی می شود و این منابع را در اختیار مهارت آموزان خود نیز قرار می دهد</p>
                        </div>

                    </div>
                </div>

                <div id="comments" class=" section pt-2">
                    <HomeSpecialComments title="نظرات دانشجویان" />
                </div>
            </div>
        </BaseSpyScroll>

    </div>
</template>
<script setup lang="ts">
const selectedTab = ref('');

definePageMeta({
    layout: 'un-category'
})
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .spec-card {
        width: 100% !important;
    }
}

.tabs {
    display: flex;

    a {
        padding: 17px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        min-width: fit-content;

        &.active {
            border-bottom: 1.7px solid var(--primary-color);
            color: var(--primary-color);
        }
    }
}

.course-content {
    p {
        color: var(--color-gray-400);
    }
}
</style>