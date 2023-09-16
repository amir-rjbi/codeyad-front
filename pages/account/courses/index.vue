<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">دوره ها</p>
      </div>
      <BaseButton color="green" @click="isOpenModal_a = true">افزودن دوره</BaseButton>
    </div>
    <div>Selected: {{ selected }}</div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
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
        <tbody>
          <template v-if="loading">
            <tr c v-for="item in [1, 2, 3]">
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
          <template v-else>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>آموزش جامع ویو جی اس (3 Vue.js) و Nuxt Js - پروژه محور</td>
              <td>محمد اشرافی</td>
              <td class="flex justify-center">
                <div class="flex relative items-center gap-2 cursor-pointer" v-click-outside="() => showMenu = false"
                  @click="showMenu = !showMenu">
                  <IconsArrowLeft class="transition-all" :style="{ rotate: showMenu ? '90deg' : '-90deg' }" />
                  <Transition name="layout">
                    <div class="account-menu" v-if="showMenu">
                      <NuxtLink to="/account">پروفایل</NuxtLink>
                      <NuxtLink to="/account/edit">ویرایش اطلاعات</NuxtLink>
                      <NuxtLink to="/account/tickets">تیکت ها</NuxtLink>
                      <NuxtLink to="/account/change-password">تغییر کلمه عبور</NuxtLink>
                    </div>
                  </Transition>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal title="افزودن دوره" v-model="isOpenModal_a">
      <account-courses-add />
    </BaseModal>
    <BaseModal title="ویرایش دوره" v-model="isOpenModal_e">
      <account-courses-edit />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { Course } from '~/models/courses/Course';

const selected = ref("");
const loading = ref(false);
const isOpenModal_a = ref(false);
const rout = useRouter();
const isOpenModal_e = ref(false);
const courses: Ref<Course[]> = ref([]);

const showMenu = ref(false);
watch(selected, () => {
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
});

definePageMeta({
  layout: "account",
});
</script>
