<template>
    <div class="mb-[70px]">
        <div class="bg-blue text-white w-full py-[80px] sm:py-[40px]">
            <div class="container">
                <div class="flex gap-10 sm:flex-wrap sm:gap-5 items-end">
                    <BaseImg src="static/images/users/avatar2.png" alt="mohammad"
                        class="w-[40%] h-[370px] sm:h-[280px] sm:w-[100%] rounded-[10px]" />
                    <div class="info flex gap-[18px] flex-col">
                        <h1 class="text-h3 sm:text-h4">
                            محمد اشرافی
                        </h1>
                        <p class="text-h7">
                            چهار ساله که تو حوزه برنامه نویسی و IT بعنوان مدرس , مشاور و کارشناس فعالیت میکنم … و تخصص اصلیم
                            برنامه نویسی وب مبتنی بر دات نت و حوزه جاوااسکریپت هست
                        </p>
                        <div class="flex gap-7 sm:flex-wrap sm:justify-center">
                            <div class="flex gap-[10px] items-center">
                                <p>تاریخ عضویت: 1402/02/03</p>
                                <IconsCalender color="white" width="24" height="24" />
                            </div>
                            <div class="flex gap-[10px] items-center">
                                <p> دوره ها: 8</p>
                                <IconsTime color="white " width="24" height="24" />
                            </div>
                            <div class="flex gap-[10px] items-center">
                                <p>745,123 دانشجو</p>
                                <IconsUsers color="white" width="24" height="24" />
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-4">
                            <h3 class="text-h4 sm:text-h6">شبکه های اجتماعی</h3>
                            <div class="flex gap-5">
                                <a href="#">
                                    <BaseImg src="static/images/icons/linkdin.png" alt="linkdin" />
                                </a>
                                <a href="#">
                                    <BaseImg src="static/images/icons/instagram.png" alt="instagram" />
                                </a>
                            </div>
                        </div>
                        <div class="flex gap-5 mt-2 sm:gap-3">
                            <BaseButton color="green" class="flex-grow text-[18px] sm:text-[14px]">دنبال کردن</BaseButton>
                            <BaseButton :color-white="true" class="flex-grow text-[18px] sm:text-[14px]">ارسال پیام
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-14 sm:mt-6">
            <h4 class="text-black font-bold text-h3 sm:text-h4">دوره ها</h4>
            <div class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in [1, 2, 3, 4]"
                    :key="item" />

            </div>
        </div>
</div></template>