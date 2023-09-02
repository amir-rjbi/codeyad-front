<template>
    <div class="py-5">
        <div class="container">
            <div class="flex justify-between sm:flex-col sm:gap-[55px] relative ">
                <div class="side-bar w-[35%] sm:!w-full sticky top-0 h-fit sm:!relative">
                    <h2 class="text-h4 sm:text-h5">موضوعات ویژه</h2>
                    <p class="text-h5 sm:text-h7 mt-1">موضوع موردعلاقه تو انتخاب کن</p>
                    <div class="mt-7">
                        <nuxt-link v-for="item in [1, 2, 3, 4]" :key="item" :to="`/roadmap/${item}`"
                            class="bg-white items-center rounded-[12px] py-[0.70rem] px-[18px] flex gap-3 mb-2">
                            <BaseImg class="w-[55px] h-[55px] rounded-full" alt="test" src="static/images/article.jpg" />
                            <div class="content">
                                <p class="text-[16px] font-semibold">مسیر یادگیری برنامه نویسی موبایل </p>
                                <p class="text-[14px]">مدرس: ساسان صفری</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="content w-[60%] sm:!w-full  md:w-[62%]">
                    <BaseVideoPlayer class="h-[450px] w-full" poster="/images/html.png" style="object-fit: cover;" />
                    <div class="video-content mt-8 sm:mt-2">
                        <div class="header flex justify-between items-center">
                            <div class="teacher flex gap-4 items-center">
                                <BaseImg class="w-[60px] h-[60px] rounded-full sm:w-[33px] sm:h-[33px]"
                                    src="static/images/users/avatar.png" alt="teacher" />
                                <p class="font-bold text-h6 sm:">میلاد دهیامی</p>
                            </div>
                            <p class="text-h6 sm:text-[14px]">4,948 بازدید</p>
                        </div>
                        <h1 class="text-h6 font-bold mt-3 mb-4 sm:mt-1 sm:mb-2">مسیر یادگیری برنامه نویسی</h1>
                        <p class="text-h8">
                            اگر شما هم علاقه‌مند به آشنایی با مسیر یادگیری برنامه‌نویسی هستید بدون شک این موضوع را شنیده‌اید
                            که
                            برنامه‌نویسی یک شغل بسیار پول‌ساز است که می‌تواند درآمد بالایی را برای شما به همراه داشته باشد.
                            از
                            طرفی دیگر برخی از افراد نیز هستند که پس از ورود به این
                        </p>
                    </div>
                    <div class="read-map-content">
                        <h2>یک نکته کلیدی و مهم برای یادگیری برنامه‌نویسی</h2>
                        <p>
                            ر خصوص مسیر یادگیری برنامه‌نویسی باید به این نکته دقت داشته باشید که یادگیری برنامه‌نویسی کار
                            ساده‌ای نیست. البته تمامی افراد که از نظر بهره هوشی در سطح نرمال جامعه هستند می‌توانند یادگیری
                            آن را آغاز کنند و موفق شوند به شرطی که هر روز تمرین کنند. شما باید به‌عنوان یک برنامه‌نویس هر
                            روز در حال آموزش و یادگیری باشید. بزرگ‌ترین چالش شما در این مسیر صرف زمان زیاد برای یادگیری است.
                            بسیاری از افراد صبر و حوصله کافی برای تمرین هرروزه ندارند و به همین علت نیز برنامه‌نویس موفقی
                            نمی‌شوند. چالش دوم مشکلاتی است که در انجام پروژه‌ها ممکن است برای شما به وجود بیاید. گاهی اوقات
                            برای برطرف‌کردن یک مشکل کوچک باید زمان زیادی را صرف پروژه خود کنید. پس باید برای این مسیر سخت
                            آماده باشید.
                            نکته دیگری که باید درباره نقشه راه یادگیری برنامه‌نویسی بدانید این است که پس از یادگیری یک زبان
                            برنامه‌نویسی را به طور کامل آموختید و آماده ورود به بازار کار شدید سه گزینه پیش روی شما خواهد
                            بود. این سه گزینه به ترتیب استخدام شدن و تبدیل‌شدن به یک کارمند، فعالیت به‌صورت فریلنسری و
                            راه‌اندازی استارت‌آپ هستند. کارمند شدن در یک شرکت برای شروع کار می‌تواند بسیار مناسب باشد و به
                            شما کمک کند تا با چرخه و سازوکار راه‌اندازی یک پروژه و تعریف آن آشنا شوید. بااین‌حال نباید
                            فراموش کنید که با کارمند شدن نمی‌توانید به درآمد فوق‌العاده‌ای که در برنامه‌نویسی از آن صحبت
                            می‌شود دست پیدا کنید.
                        </p>
                        <h3>یک نکته کلیدی و مهم برای یادگیری برنامه‌نویسی</h3>
                        <p>
                            ر خصوص مسیر یادگیری برنامه‌نویسی باید به این نکته دقت داشته باشید که یادگیری برنامه‌نویسی کار
                            ساده‌ای نیست. البته تمامی افراد که از نظر بهره هوشی در سطح نرمال جامعه هستند می‌توانند یادگیری
                            آن را آغاز کنند و موفق شوند به شرطی که هر روز تمرین کنند. شما باید به‌عنوان یک برنامه‌نویس هر
                            روز در حال آموزش و یادگیری باشید. بزرگ‌ترین چالش شما در این مسیر صرف زمان زیاد برای یادگیری است.
                            بسیاری از افراد صبر و حوصله کافی برای تمرین هرروزه ندارند و به همین علت نیز برنامه‌نویس موفقی
                            نمی‌شوند. چالش دوم مشکلاتی است که در انجام پروژه‌ها ممکن است برای شما به وجود بیاید. گاهی اوقات
                            برای برطرف‌کردن یک مشکل کوچک باید زمان زیادی را صرف پروژه خود کنید. پس باید برای این مسیر سخت
                            آماده باشید.
                            نکته دیگری که باید درباره نقشه راه یادگیری برنامه‌نویسی بدانید این است که پس از یادگیری یک زبان
                            برنامه‌نویسی را به طور کامل آموختید و آماده ورود به بازار کار شدید سه گزینه پیش روی شما خواهد
                            بود. این سه گزینه به ترتیب استخدام شدن و تبدیل‌شدن به یک کارمند، فعالیت به‌صورت فریلنسری و
                            راه‌اندازی استارت‌آپ هستند. کارمند شدن در یک شرکت برای شروع کار می‌تواند بسیار مناسب باشد و به
                            شما کمک کند تا با چرخه و سازوکار راه‌اندازی یک پروژه و تعریف آن آشنا شوید. بااین‌حال نباید
                            فراموش کنید که با کارمند شدن نمی‌توانید به درآمد فوق‌العاده‌ای که در برنامه‌نویسی از آن صحبت
                            می‌شود دست پیدا کنید.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
        margin-top: 11px;
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