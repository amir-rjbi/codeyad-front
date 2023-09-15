<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="addQuestion"
    class="flex flex-wrap"
  >
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="عنوان    "
        out-line
        name="title"
        label="عنوان دوره:"
      />
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="  عنوان انگلیسی    "
        out-line
        name="title"
        label="عنوان انگلیسی (slug):"
      />
    </div>
    <div class="w-full p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="قیمت دوره  "
        out-line
        name="title"
        label=" قیمت دوره : (0 = رایگان)"
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
      <BaseInputFile out-line name="attachment" label="تصویر اصلی " />
    </div>
    <div class="w-1/2 p-2 sm:w-full sm:px-0">
      <BaseSelectBox
        required
        v-model="data.categoryId"
        label="سطح دوره  "
        out-line
        name="categoryId"
      >
        <option>123</option>
        <option>312</option>
      </BaseSelectBox>
    </div>
    <div class="w-full p-2 sm:w-full sm:px-0">
      <BaseInput
        placeholder="پیشنیاز ها را با - از هم جدا کنید, مثال - c#-js    "
        out-line
        name="title"
        label=" پیش نیاز های دوره:"
      />
    </div>
    <div class="p-2 w-1/2 sm:px-0">
      <BaseInputFile out-line name="attachment" label="مقدمه دوره " />
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
