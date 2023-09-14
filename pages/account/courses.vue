<template>
    <div class="container pb-12">
        <div class="nav-tabs flex justify-center  sm:justify-between sm:!gap-8">
            <button name="all" :class="{ active: selected == 'all' }" @click="selected = 'all'">جاری</button>
            <button name="inProgress" :class="{ active: selected == 'inProgress' }" @click="selected = 'inProgress'">درحال
                برگزاری</button>
            <button name="completed" :class="{ active: selected == 'completed' }" @click="selected = 'completed'">تکمیل
                شده</button>
        </div>
        <div class="courses">
            <div class="bg-white gap-4 flex-wrap rounded-lg p-6 flex justify-between items-center">
                <div class="flex gap-7 items-center sm:flex-wrap">
                    <base-img src="static/images/course.png" class="rounded-sm" alt="course" sizes="sm:100vw lg:163px" />
                    <div class="flex flex-col gap-6 sm:w-full">
                        <p class="text-h5 sm:text-h8 ">توسعه اپلیکیشن موبایل با Flutter & Dart (iOS و Android)</p>
                        <BaseProgressBar :completed="75" />
                    </div>
                </div>
                <div class="flex flex-col gap-4 items-center sm:flex-row sm:mt-9 sm:justify-between sm:w-full sm:gap-2">
                    <p class="text-gray-400">شروع از تاریخ 1402/02/22</p>
                    <BaseButton>شروع دوره
                        <template #icon>
                            <IconsArrowLeft color="white" />
                        </template>
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const selected = ref('all');

</script>