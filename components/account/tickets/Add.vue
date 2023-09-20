<template>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="AddTicket" class="flex flex-wrap">
    <div class="w-full">
      <BaseInput required placeholder="  عنوان تیکت" out-line name="title" label="عنوان:" v-model="data.title" />
    </div>
    <div class="w-full p-2 sm:px-0">
      <BaseTextArea out-line placeholder="   متن پیام" required label="متن :" name="description"
        v-model="data.description" />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت تیکت جدید</BaseButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "vee-validate";
import * as Yup from "yup";
import { CreateTicket } from "~/services/ticket.service";

const data = reactive({
  title: "",
  description: "",
});
const schema = Yup.object().shape({
  title: Yup.string()
    .typeError("حتما باید عنوان وارد کنید !")
    .required(),
  description: Yup.string()
    .typeError("حتما باید توضیحات وارد کنید !")
    .required(),
});

const router = useRouter();
const AddTicket = async () => {
  if (!data.title || !data.description) {
    alert('باید عنوان و توضیحات را وارد کنید');
    return;
  }
  const fetchResult = await CreateTicket(data.title, data.description);
  if (fetchResult.isSuccess) {
    const toast = useToast();
    toast.showToast('تیکت با موفقیت ایجاد شد', ToastType.success, 3000);
    await router.push(`/account/tickets/show?ticketId=${fetchResult.data}`);
  }
};
</script>
