<template>
  <div class="container pb-12">
    <div class="nav-tabs flex justify-center  sm:justify-between sm:!gap-8">
      <button name="all" :class="{ active: selected == 'all' }" @click="selected = 'all'">همه</button>
      <button name="inProgress" :class="{ active: selected == 'inProgress' }" @click="selected = 'inProgress'">درحال
        یادگیری</button>
      <button name="completed" :class="{ active: selected == 'completed' }" @click="selected = 'completed'">تکمیل
        شده</button>
    </div>
    <div class="courses flex flex-col gap-4">
      <template v-if="loading">
        <BaseSkeletonLoaidng class="rounded-lg" width="100%" height="100px" v-for="item in [1, 2, 3]" :key="item" />
      </template>
      <template v-else>
        <div v-for="item in getCoursesByTab" class="bg-white gap-4 flex-wrap rounded-lg p-6 flex justify-between items-center">
          <div class="flex gap-7 items-center sm:flex-wrap flex-grow">
            <base-img :src="GetCourseImage(item.course.imageName)" class="rounded-sm" alt="course"
              sizes="sm:100vw lg:163px" />
            <div class="flex flex-col gap-6  w-full">
              <p class="text-h5 sm:text-h8 ">{{ item.course.courseTitle }}</p>
              <BaseProgressBar :completed="item.watchPercentage" />
            </div>
          </div>
          <div class="flex flex-col gap-4 items-center sm:flex-row sm:mt-9 sm:justify-between sm:w-full sm:gap-2">
            <p class="text-gray-400">شروع از تاریخ {{ toPersianDate(new Date(item.createDate)) }}</p>
            <BaseButton :render-button-tag="false" :to="`/course/panel-${item.course.id}`">شروع دوره
              <template #icon>
                <IconsArrowLeft color="white" />
              </template>
            </BaseButton>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserCourse } from '~/models/account/User';
import { GetUserCourses } from '~/services/account.service';
import { GetCourseByFilter } from '~/services/course.service';

const selected = ref('all');
definePageMeta({
  layout: "default"
})
const courses: Ref<UserCourse[]> = ref([]);
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  var res = await GetUserCourses();
  if (res.isSuccess)
    courses.value = res.data ?? [];
  loading.value = false;
});

const getCoursesByTab = computed(() => {
  if (selected.value == 'all')
    return courses.value;
  if (selected.value == 'inProgress')
    return courses.value.filter(f => f.watchPercentage < 100);
  else
    return courses.value.filter(f => f.watchPercentage == 100);

})
</script>