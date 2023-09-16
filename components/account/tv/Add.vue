<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="addQuestion"
    class="flex flex-wrap"
  >
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder=" عنوان ویدئو    "
        out-line
        name="title"
        label=" عنوان ویدئو :"
      />
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="  عنوان انگلیسی    "
        out-line
        name="title"
        label=" عنوان ویدئو (انگلیسی ) :"
      />
    </div>
    <div class="w-full p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="00:00:00  "
        out-line
        name="title"
        label=" زمان این بخش : فرمت مجاز : ##:##:##"
      />
    </div>
    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        label="توضیحات: "
        name="description"
        v-model="data.description"
        id="question_text2"
      />
    </div>

    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        label="  توضیحات کوتاه: "
        name="description"
        v-model="data.description"
        id="question_text"
      />
    </div>

    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.categoryId"
        label="دسته بندی اصلی"
        out-line
        name="categoryId"
      >
        <option>123</option>
        <option>312</option>
      </BaseSelectBox>
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.categoryId"
        label="دسته بندی دوم"
        out-line
        name="categoryId"
      >
        <option>123</option>
        <option>312</option>
      </BaseSelectBox>
    </div>
    <div class="p-2 w-1/2 sm:px-0">
      <BaseInputFile out-line name="attachment" label="فایل تصویر   " />
    </div>
    <div class="p-2 w-1/2 sm:px-0">
      <BaseInputFile out-line name="attachment" label="فایل ویدیو   " />
    </div>

    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput out-line name="title" label=" MetaTitle" />
    </div>

    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        out-line
        name="title"
        label=" 
Meta KeyWords (Test,Test2,Test3)"
      />
    </div>

    <div class="w-full p-2 sm:px-0">
      <BaseHtmlEditor
        label="   MetaDescription "
        name="description"
        v-model="data.description"
        id="question_text3"
      />
    </div>

    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت اطلاعات</BaseButton>
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
