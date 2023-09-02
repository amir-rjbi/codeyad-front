<template>
    <div class="py-5 ">
        <div class="container">
            <BaseTab :items="[{
                title: 'همه دوره ها',
                value: 'all'
            }, {
                title: 'بازی',
                value: 'game'
            }, {
                title: 'مارکتینگ',
                value: 'marketing'
            },
            {
                title: 'برنامه نویسی',
                value: 'programming'
            },
            {
                title: 'دیزاین',
                value: 'desing'
            }]" />

            <div class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16]" :key="item" />

            </div>
        </div>
    </div>
</template>