<template>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="editSpecification"
    :class="['flex flex-wrap', { 'card-loading': loading }]">
    <div class="w-full flex flex-col space-y-2">
      <BaseInput required placeholder="عنوان" out-line name="title" label="عنوان" v-model="data.title" />
      <base-text-area required placeholder="توضیحات" name="desc" v-model="data.desc" label="توضیحات" />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton :loading="loading" color="green">ثبت تغییرات</BaseButton>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { useToast } from "~/composables/useToast";
import { EditCourseSpecification } from "~/services/teacher.service";

const props = defineProps({
  specification: {
    type: Object,
    required: true,
  },
})
const loading = ref(false);
const emits = defineEmits(['specEdited']);

const data = reactive({
  title: props.specification.title,
  desc: props.specification.description,
});

const schema = Yup.object().shape({
  title: Yup.string()
    .typeError("حتما باید عنوان وارد کنید !")
    .required(),
  desc: Yup.string()
    .typeError("حتما باید توضیحات وارد کنید !")
    .required(),
});

const editSpecification = async () => {
  loading.value=true;
  const fetchResult = await EditCourseSpecification(props.specification.id, props.specification.courseId, data.title, data.desc);
  if (fetchResult.isSuccess) {
    const toast = useToast();
    toast.showToast('ویژگی با موفقیت ایجاد شد');
    emits('specEdited');
  }
  loading.value=false;

};
</script>