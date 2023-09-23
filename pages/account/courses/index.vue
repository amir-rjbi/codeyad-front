<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">دوره ها</p>
      </div>
      <BaseButton color="green" @click="isOpenModal_a = true">افزودن دوره</BaseButton>
    </div>
    <div v-if="selected">دوره انتخاب شده: {{ selected.courseTitle }}</div>
    <div class="table-responsive mt-4 shadow-md">
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>قیمت</th>
            <th>فعال</th>
            <th>تاریخ ثبت</th>
            <th>دانشجویان</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody >
          <template v-if="loading">
            <tr c v-for="item in 5">
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="150">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else-if="courses && courses.length > 0">
            <tr v-for="course in courses" :key="course.id" @click="setSelected(course)">
              <td>{{course.id}}</td>
              <td>
                <base-button class="mx-auto" :render-button-tag="false" :to="`/account/courses/show/${course.id}`" color-white>
                  {{course.courseTitle}}
                </base-button>
              </td>
              <td v-if="course.price > 0">{{ toTomanPrice(course.price) }} تومان</td>
              <td v-else>رایگان</td>
              <td v-if="course.status === CourseStatus.active" class="text-green-500">فعال</td>
              <td v-if="course.status === CourseStatus.rejected" class="text-red-500">رد شده</td>
              <td v-if="course.status === CourseStatus.pending" class="text-indigo-500">در حال بررسی</td>
              <td>{{toPersianDate(new Date(course.creationDate))}}</td>
              <td>{{course.studentCount}}</td>
              <td class="flex lg:inherit sm:relative justify-center border-none">
                <div class="w-16 h-12 flex absolute overflow-y-visible items-center gap-2 cursor-pointer" @click.self="showOptions">
                  <IconsArrowLeft class="w-full justify-self-start pointer-events-none transition-all" :style="{ rotate: showMenu ? '90deg' : '-90deg' }"/>
                  <Transition name="layout">
                    <div class="account-menu w-[438px] p-2" style="width: max-content;right: -3rem; display: none" >
                      <BaseButton color-white :render-button-tag="false" :to="`/account/courses/show/${course.id}`">سرفصل ها</BaseButton>
                      <hr class="my-2">
                      <BaseButton color-white @click="isOpenModal_e = true">ویرایش</BaseButton>
                      <NuxtLink :to="`/account/courses/AddNote?courseId=${course.id}`">ثبت یادداشت</NuxtLink>
                      <NuxtLink :to="`/account/courses/SpecialComments?courseId=${course.id}`">کامنت های ویژه</NuxtLink>
                    </div>
                  </Transition>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">اطلاعاتی موجود نیست</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="w-full flex items-center justify-center mt-4">
      <base-pagination v-if="!loading" v-model="pageId" :filter-result="coursesResult"></base-pagination>
    </div>
    <BaseModal title="افزودن دوره" v-model="isOpenModal_a" >
      <account-courses-add @courseCreated="isOpenModal_a = false,getData"/>
    </BaseModal>
    <BaseModal title="ویرایش دوره" v-model="isOpenModal_e">
      <account-courses-edit :course-id="selected.id" @courseEdited="isOpenModal_e = false,getData" />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import {GetTeacherCourses} from "~/services/teacher.service";
import {CourseFilterData,TeacherCourseFilterParams} from "~/models/courses/CourseFilterData";
import {CourseStatus} from "~/models/courses/CourseFilterData";
import {toTomanPrice} from "~/utils/numberUtils";
import {toPersianDate} from "~/utils/dateUtil";
import {BaseFilterResult} from "~/models/IApiResponse";

const selected:Ref<CourseFilterData> = ref();
const loading = ref(false);
const isOpenModal_a = ref(false);
const router = useRouter();
const isOpenModal_e = ref(false);
const courses: Ref<CourseFilterData[]> = ref([]);
const coursesResult: Ref<BaseFilterResult> = ref();
const pageId = ref(1);

const filterParams:TeacherCourseFilterParams = reactive({
  pageId:pageId,
  take: 10,
  filterBy:undefined,
  categorySlug:undefined,
  status:undefined,
  userId:undefined,
  search:undefined,
  courseLevel:undefined,
  orderBy:undefined,
  progressStatus:undefined,
  searchOn:undefined
});

const showMenu = ref(false);
/*watch(selected, () => {
  if (selected.value == "ویرایش") {
    selected.value = "";
    isOpenModal_e.value = true;
  }
  if (selected.value == "ثبت یادداشت") {
    selected.value = "";
    rout.push("/account/courses/AddNote");
  }
  if (selected.value == "کامنت های ویژه") {
    selected.value = "";
    rout.push("/account/courses/SpecialComments");
  }
});*/

definePageMeta({
  layout: "account",
});

onMounted(async ()=>{
  await getData();
})

const getData = async ()=>{
  loading.value = true;
  const fetchResult = await GetTeacherCourses(filterParams);
  if(fetchResult.isSuccess){
    courses.value = fetchResult.data?.data ?? [];
    coursesResult.value = fetchResult.data!;
  }

  loading.value = false;
}

const setSelected = (course:CourseFilterData)=>{
  selected.value = course;
}

const showOptions = (e)=>{
  const optionsMenu = e.target.querySelector('.account-menu');
  if(optionsMenu.style.display == 'none')
    optionsMenu.style.display='flex';
  else
    optionsMenu.style.display='none';
}
</script>
