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
                        <NuxtLink to="/roadmap/prog" class="text-blue mt-1 text-h6 ">بیشتر بخوانید...</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>