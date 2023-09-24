<template>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="editSection" class="flex flex-wrap">
    <div class="w-full">
      <BaseInput required placeholder="  عنوان فصل" out-line name="title" label="عنوان:" v-model="data.title" />
    </div>
    <div class="justify-end flex w-full mt-2">
      <BaseButton :loading="loading" color="green">ویرایش سرفصل</BaseButton>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { ToastType, useToast } from "~/composables/useToast";
import { EditSection } from "~/services/teacher.service";

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['sectionEdited']);
const loading = ref(false);
const data = reactive({
  title: props.section.title,
  courseId: props.section.courseId,
  sectionId: props.section.id
});

const schema = Yup.object().shape({
  title: Yup.string()
    .typeError("حتما باید عنوان وارد کنید !")
    .required(),
});

const router = useRouter();
const editSection = async () => {
  if (!data.title || data.courseId === 0 || data.sectionId === 0) {
    const toast = useToast();
    toast.showToast('باید عنوان را وارد کنید', ToastType.error);
    return;
  }
  loading.value = true;
  const fetchResult = await EditSection(data.title, data.courseId, data.sectionId);
  if (fetchResult.isSuccess) {
    const toast = useToast();
    toast.showToast('فصل با موفقیت ویرایش شد');
    emits('sectionEdited', data.title);
  }
  loading.value = false;

};
</script>