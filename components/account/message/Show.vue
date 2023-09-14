<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="addQuestion"
    class="flex flex-wrap"
  >
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        required
        placeholder="عنوان پرسش را وارد کنید"
        out-line
        name="title"
        label="عنوان پرسش"
      />
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.categoryId"
        label="تگ"
        out-line
        name="categoryId"
      >
        <option>123</option>
        <option>312</option>
      </BaseSelectBox>
    </div>
    <div class="p-2 w-full sm:px-0">
      <BaseInputFile out-line name="attachment" label="فایل ضمیمه" />
    </div>
    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        required
        label="متن پرسش"
        name="description"
        v-model="data.description"
        id="question_text"
      />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت پرسش</BaseButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";

const data = reactive({
  title: "",
  categoryId: "",
  description: "",
});
const schema = Yup.object().shape({
  title: Yup.string().required().label("عنوان پرسش"),
  categoryId: Yup.string().required().min(1).label("تگ"),
  description: Yup.string().required().label("متن پرسش"),
});
const addQuestion = () => {};
</script>
