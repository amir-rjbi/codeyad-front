<template>
  <div>
    <BaseAlert class="mb-3">
      برای هر دوره فقط 3 ویژگی میتوان اضافه کرد.
    </BaseAlert>
    <div class="flex justify-between">
      <span class="font-bold text-h5">ویژگی های دوره</span>
      <base-button color-white size="sm" :render-button-tag="false" to="/account/courses">بازگشت</base-button>
    </div>

    <hr class="my-6">

    <base-button color="green" @click="b_createSpec = true" v-if="specifications.length < 3">افزودن ویژگی
      جدید</base-button>

    <div class="table-responsive mt-4 shadow-md">
      <table ref="specialTable">
        <thead>
          <tr>
            <th>عنوان</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr c v-for="item in 5">
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
          <template v-else-if="specifications.length > 0">
            <tr v-for="spec in specifications" :key="spec.id">
              <td width="10%">{{ spec.title }}</td>
              <td class="text-right">{{ spec.description }}</td>
              <td width="5%">
                <div class="flex items-center space-x-2 space-x-reverse">
                  <base-button outline color-white class="mx-auto" title="ویرایش ویژگی"
                    @click="selected = spec, b_editSpec = true">
                    <IconsEdit width="16" height="16" color="green" />
                  </base-button>
                  <base-button outline color-white class="mx-auto" @click="openDeleteModal(spec)" title="حذف ویژگی">
                    <IconsTrash width="16" height="16" color="red" />
                  </base-button>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="3">اطلاعاتی موجود نیست</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <base-modal title="افزودن ویژگی جدید" v-model="b_createSpec">
      <account-courses-specifications-add :course-id="courseId" @spec-created="getAgainData" />
    </base-modal>

    <base-modal title="ویرایش ویژگی" v-model="b_editSpec">
      <account-courses-specifications-edit :specification="selected!" @spec-edited="getAgainData" />
    </base-modal>
    <BaseConfirmPopup v-model="isOpenDeletePopup" :confirm-function="deleteSpecification" />
  </div>
</template>

<script setup lang="ts">
import { CourseSpecificationDto } from "~/models/teachers/courseSpecification";
import { GetSpecificationsOfCourse, RemoveCourseSpecification } from "~/services/teacher.service";


definePageMeta({
  layout: "account",
});

const b_createSpec = ref(false);
const b_editSpec = ref(false);
const isOpenDeletePopup = ref(false);
const loading = ref(false);
const route = useRoute();
const courseId = Number(route.params?.courseId);
const specifications: Ref<CourseSpecificationDto[]> = ref([]);
const selected: Ref<CourseSpecificationDto | null | undefined> = ref(null);
const toast = useToast();

onMounted(async () => {
  await getData();
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await GetSpecificationsOfCourse(courseId);
  if (fetchResult.isSuccess) {
    specifications.value = fetchResult.data ?? [];
  }

  loading.value = false;
}

const getAgainData = async () => {
  b_createSpec.value = false;
  b_editSpec.value = false;
  await getData();
}
const openDeleteModal = (selectedItem: CourseSpecificationDto) => {
  selected.value = selectedItem;
  isOpenDeletePopup.value = true;
}
const deleteSpecification = async () => {
  loading.value = true;
  const fetchResult = await RemoveCourseSpecification(selected.value!.id);
  if (fetchResult.isSuccess) {
    toast.showToast();
    await getData();
    selected.value = null;
    isOpenDeletePopup.value = false;
  }
  loading.value = false;
}

</script>