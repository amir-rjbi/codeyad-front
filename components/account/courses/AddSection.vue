<template>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="createSection" class="flex flex-wrap">
    <div class="w-full">
      <BaseInput required placeholder="  عنوان فصل" out-line name="title" label="عنوان:" v-model="data.title" />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت سرفصل جدید</BaseButton>
    </div>
  </Form>
</template>

<script setup lang="ts">
import {Form} from "vee-validate";
import * as Yup from "yup";
import {ToastType, useToast} from "~/composables/useToast";
import {AddSection} from "~/services/teacher.service";

const props = defineProps({
  courseId : {
    type:Number,
    required:true,
  },
})

const emits = defineEmits(['sectionCreated']);

const data = reactive({
  title: "",
  courseId: 0
});

const schema = Yup.object().shape({
  title: Yup.string()
      .typeError("حتما باید عنوان وارد کنید !")
      .required(),
});

const router = useRouter();
const createSection = async () => {
  data.courseId = props.courseId;
  if (!data.title || data.courseId === 0) {
    const toast = useToast();
    toast.showToast('باید عنوان را وارد کنید',ToastType.error);
    return;
  }
  const fetchResult = await AddSection(data.title,data.courseId);
  if (fetchResult.isSuccess) {
    const toast = useToast();
    toast.showToast('فصل با موفقیت ایجاد شد');
    emits('sectionCreated');
  }
};
</script>