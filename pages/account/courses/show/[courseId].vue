<template>
  <template v-if="loading">
    <div class="space-y-2">
      <BaseSkeletonLoaidng type="box" height="50px" />
      <BaseSkeletonLoaidng type="box" height="200px" />
      <BaseSkeletonLoaidng type="box" height="80px" v-for="i in 4" />
    </div>
  </template>
  <div v-if="!loading && course">
    <div class="flex justify-between">
      <span class="font-bold text-h5">{{ course.courseTitle }}</span>
      <base-button color-white size="sm" :render-button-tag="false" to="/account/courses">بازگشت</base-button>
    </div>
    <hr class="my-6">

    <base-alert alert-type="warning" class="my-4">
      <p>
        <strong>در آپلود کردن قسمت ها توجه کنید:</strong>
        <br>
        - هر فصل را به ترتیب تکمیل کنید.
        <br>
        - نام گذاری قسمت ها نسبت به ترتیب آپلود شما گذاشته می شود، مثال :
        <br>
      <ul style="list-style: disc" class="mr-8 space-y-2 mt-2">
        <li>
          <span dir="ltr">1_firstEpisode.mp4</span>
        </li>
        <li>
          <span dir="ltr">2_TestEpisode.mp4</span>
        </li>
      </ul>
      </p>
    </base-alert>

    <base-button color="green" @click="isOpenModal_a = true"> افزودن سرفصل جدید </base-button>
    <ul class="my-4 space-y-4">
      <li v-for="(section, i) in course.sections" :key="section.id">
        <base-collapse :title="section.title" bg-white title-class="text-h5">
          <template #icon>
            <base-button color-white size="sm" @click="openEditModal(section)">
              <IconsEdit />
            </base-button>
          </template>
          <div>
            <base-button color="blue" :render-button-tag="false"
              :to="`/account/courses/${course.id}/${section.id}/addEpisode`"> افزودن قسمت جدید </base-button>
            <div class="table-responsive mt-4 shadow-md">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>عنوان</th>
                    <th>رایگان؟</th>
                    <th>تاریخ ثبت</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="section.episodes.length > 0">
                    <tr v-for="(episode, j) in section.episodes" :key="episode.id">
                      <td>{{ j + 1 }}</td>
                      <td>{{ episode.title }}</td>
                      <td v-if="episode.isFree" class="text-green-500">بلی</td>
                      <td v-else class="text-indigo-500">خیر</td>
                      <td>{{ toPersianDate(new Date(episode.creationDate)) }}</td>
                      <td v-if="episode.isActive" class="text-green-500">فعال</td>
                      <td v-else class="text-red-500">غیر فعال</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="5">اطلاعاتی موجود نیست</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </base-collapse>
      </li>
    </ul>
    <BaseModal title="افزودن فصل جدید" v-model="isOpenModal_a">
      <account-courses-add-section :course-id="course.id" @sectionCreated="onSectionCreated" />
    </BaseModal>
    <BaseModal title="ویرایش سرفصل" v-model="isOpenModal_e">
      <account-courses-edit-section :section="selectedSection!" @sectionEdited="onSectionCreated" />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { GetTeacherCourseById } from "~/services/teacher.service";
import { CourseLanding } from "~/models/courses/CourseLanding";
import { Course, Section } from "~/models/courses/Course";

definePageMeta({
  layout: "account",
});

const loading = ref(false);
const isOpenModal_a = ref(false);
const isOpenModal_e = ref(false);
const selectedSection: Ref<Section | null> = ref(null);

const route = useRoute();
const courseId: number = Number(route.params?.courseId);
const course: Ref<Course | null> = ref(null);

onMounted(async () => {
  await getData();
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await GetTeacherCourseById(courseId);
  if (fetchResult.isSuccess) {
    course.value = fetchResult.data ?? null;
  }
  loading.value = false;
}

const onSectionCreated = async () => {
  isOpenModal_a.value = false;
  isOpenModal_e.value = false;
  await getData();
}

const openEditModal = (section: Section) => {
  selectedSection.value = section;
  isOpenModal_e.value = true;
}

</script>

