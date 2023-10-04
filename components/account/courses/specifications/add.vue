<template>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="createSpecification"
    :class="['flex flex-wrap', { 'card-loading': loading }]">
    <div class="w-full flex flex-col space-y-2">
      <BaseInput required placeholder="عنوان" out-line name="title" label="عنوان" v-model="data.title" />
      <base-text-area required placeholder="توضیحات" name="desc" v-model="data.desc" label="توضیحات" />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton :loading="loading" color="green">ثبت ویژگی جدید</BaseButton>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { useToast } from "~/composables/useToast";
import { AddCourseSpecification } from "~/services/teacher.service";

const loading = ref(false);
const props = defineProps({
  courseId: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['specCreated']);

const data = reactive({
  courseId: 0,
  title: "",
  desc: "",
});

const schema = Yup.object().shape({
  title: Yup.string()
    .typeError("حتما باید عنوان وارد کنید !")
    .required(),
  desc: Yup.string()
    .typeError("حتما باید توضیحات وارد کنید !")
    .required(),
});

const createSpecification = async () => {
  data.courseId = props.courseId;

  loading.value = true;
  const fetchResult = await AddCourseSpecification(data.courseId, data.title, data.desc);
  if (fetchResult.isSuccess) {
    const toast = useToast();
    toast.showToast('ویژگی با موفقیت ایجاد شد');
    emits('specCreated');
  }
  loading.value = false;

};
</script>