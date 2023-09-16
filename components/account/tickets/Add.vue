<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="AddToWallet"
    class="flex flex-wrap"
  >
    <div class="w-full">
      <BaseInput
        required
        placeholder="  عنوان تیکت"
        out-line
        name="title"
        label="عنوان:"
      />
    </div>
    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        placeholder="   متن پیام"
        required
        label="متن :"
        name="description"
        id="question_text"
      />
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

const data = reactive({
  title: "",
});
const schema = Yup.object().shape({
  title: Yup.number()
    .typeError("حتما باید عدد وارد کنید !")
    .required()
    .min(3, "بیشتر از یک عدد باشد"),
});
const AddToWallet = () => {};
</script>
