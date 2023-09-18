<template>
  <Form :validation-schema="schema" v-slot="{ meta }" @submit="edit">
    <base-card :class="{ 'card-loading': loading }">
      <template #header>
        <h5>تغییر کلمه عبور</h5>
      </template>
      <div class="flex flex-wrap">
        <div class="p-2 w-full sm:px-0">
          <BaseInputPassword label="کلمه عبور فعلی" name="currentPassword" out-line v-model="data.currentPassword" />
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
          <BaseInputPassword label="کلمه عبور جدید" name="newPassword" out-line v-model="data.newPassword" />
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
          <BaseInputPassword label="تکرار کلمه عبور " name="rePassword" out-line v-model="data.rePassword" />
        </div>
      </div>
      <template #actions>
        <base-button :loading="loading" type="submit" :disabled="!meta.valid">ثبت اطلاعات</base-button>
      </template>
    </base-card>
  </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { ChangePassword } from "../../services/account.service";
import { useAccountStore } from "../../stores/account.store";
import { useAuthStore } from "~/stores/auth.store";

const toast = useToast();
const authStore = useAuthStore();
const schema = Yup.object().shape({
  currentPassword: Yup.string().required().label("کلمه عبور فعلی"),
  newPassword: Yup.string().required().min(7).label("کلمه عبور جدید"),
  //@ts-ignore
  rePassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "کلمه های عبور یکسان نیستند")
    .required()
    .label("تکرار کلمه عبور"),
});
const data = reactive({
  currentPassword: "",
  newPassword: "",
  rePassword: "",
});
const loading = ref(false);
const edit = async () => {
  loading.value = true;
  var formData = new FormData();
  //@ts-ignore
  formData.append("CurrentPassword", data.currentPassword);
  formData.append("NewPassword", data.newPassword);
  formData.append("RePassword", data.rePassword);
  var res = await ChangePassword(formData);
  if (res.isSuccess) {
    toast.showToast('کلمه عبور شما با موفقیت تغییر کرد');
    authStore.logOut().then(()=>{
      document.location.replace('/');
    });
  }
  loading.value = false;
};
definePageMeta({
  layout: "account",
});
</script>
