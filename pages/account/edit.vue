<template>
  <Form
    :validation-schema="schema"
    v-slot="{ meta }"
    @submit="edit"
    :class="{ 'card-loading': loading }"
  >
    <base-card :loading="loading">
      <template #header>
        <h5>ویرایش اطلاعات</h5>
      </template>
      <div class="flex flex-wrap">
        <div class="p-2 w-full sm:px-0">
          <div class="flex gap-4 items-center w-full">
            <base-img
              width="100px"
              height="100px"
              class="rounded w-[50px] h-[50px]"
              :alt="accountStore.currentUser!.fullName"
              :src="GetUserAvatar(accountStore.currentUser?.imageName ?? '')"
            />
            <div class="flex flex-col gap-2 w-full">
              <BaseInputFile
                accept="image/png,image/gif,image/jpeg"
                v-model="data.avatar"
                name="avatar"
              />
              <p class="text-h9">
                فایل های مجاز: JPG، PNG و GIF. حداکثر اندازه مجاز: 5MB
              </p>
            </div>
          </div>
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
          <BaseInput
            v-model="data.name"
            placeholder="نام خود را وارد کنید"
            out-line
            name="name"
            label="نام"
          />
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
          <BaseInput
            v-model="data.family"
            placeholder="نام خانوادگی خود را وارد کنید"
            out-line
            name="family"
            label="نام خانوادگی"
          />
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
          <BaseInput
            v-model="data.phoneNumber"
            out-line
            name="phoneNumber"
            number
            label="شماره تلفن"
          />
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
          <BaseInput
            v-model="data.email"
            out-line
            name="email"
            type="email"
            label="ایمیل"
          />
        </div>
        <div class="w-full p-2 sm:px-0">
          <BaseHtmlEditor
            placeholder="درباره من"
            v-model="aboutMe"
            id="aboutme"
            name="aboutme"
          />
        </div>
      </div>
      <template #actions>
        <base-button
          @click="loading = !loading"
          type="submit"
          :disabled="!meta.valid"
          >ثبت اطلاعات</base-button
        >
      </template>
    </base-card>
  </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { useAccountStore } from "~/stores/account.store";
import { EditUser } from "../../services/account.service";
const accountStore = useAccountStore();
const data = reactive({
  name: "",
  family: "",
  email: "",
  phoneNumber: "",
  about: "",
  avatar: null,
});
const loading = ref(false);
const schema = Yup.object().shape({
  name: Yup.string().required().label("نام"),
  family: Yup.string().required().label("نام خانوادگی"),
  //@ts-ignore
  phoneNumber: Yup.string().phoneNumber().required().label("شماره تماس"),
  email: Yup.string().required().email().label("ایمیل"),
});
const aboutMe = ref("");
definePageMeta({
  layout: "account",
});
onMounted(() => {
  data.family = accountStore.currentUser!.family;
  data.name = accountStore.currentUser!.name;
  data.email = accountStore.currentUser!.email;
  data.phoneNumber = accountStore.currentUser!.phoneNumber;
});
const edit = async () => {
  var formData = new FormData();
  formData.append("Name", data.name);
  formData.append("Family", data.family);
  formData.append("PhoneNumber ", data.phoneNumber);
  formData.append("Email ", data.email);
  await EditUser(formData);
};
</script>
