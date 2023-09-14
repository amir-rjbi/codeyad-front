<template>
    <Form v-slot="{ meta }" :validation-schema="schema" @submit="addQuestion"
        :class="['flex flex-wrap', { 'card-loading': loading }]">
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
            <BaseInput required v-model="data.title" placeholder="عنوان پرسش را وارد کنید" out-line name="title"
                label="عنوان پرسش" />
        </div>
        <div class="w-1/2 p-2 sm:w-full sm:px-0">
            <template v-if="categoryLoading">
                <label class="input-label">دسته بندی</label>
                <BaseSkeletonLoaidng class="mt-1" height="48px" />
            </template>
            <BaseSelectBox v-else required v-model="data.categoryId" label="دسته بندی" out-line name="categoryId">
                <option v-for="item in utilStore.questionCategories" :value="item.id">{{ item.categoryTitle }}</option>
            </BaseSelectBox>
        </div>
        <div class="p-2 w-full sm:px-0">
            <BaseInputFile out-line name="attachment" v-model="data.attachment" label="فایل ضمیمه" />
        </div>
        <div class="w-full p-2 sm:px-0">
            <BaseHtmlEditor required label="متن پرسش" name="description" v-model="data.description" id="question_text" />
        </div>
        <div class="justify-end flex w-full mt-2">
            <BaseButton type="button" @click="authStore.openLoginModal(addQuestion)" :loading="loading" :disabled="!meta.valid"
                class="sm:w-full" v-if="authStore.isLogin == false">ورود
                و
                ثبت پرسش
            </BaseButton>
            <BaseButton v-else :loading="loading" :disabled="!meta.valid" class="sm:w-full">ثبت پرسش</BaseButton>
        </div>
    </Form>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { GetQuestionCategories, CreateQuestion } from '~/services/questions.service';
import { useAuthStore } from '~/stores/auth.store';
import { useUtilStore } from '~/stores/util.store';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();
const utilStore = useUtilStore();
const categoryLoading = ref(false);
const loading = ref(false);
const emits = defineEmits(['closeModal']);
const data = reactive({
    title: "",
    categoryId: "",
    description: "",
    attachment: null
})
const schema = Yup.object().shape({
    title: Yup.string().required().label('عنوان پرسش'),
    categoryId: Yup.string().required().min(1).label('تگ'),
    description: Yup.string().required().label('متن پرسش')
});
const addQuestion = async () => {
    var formData = new FormData();
    formData.append('Subject', data.title);
    formData.append('Text', data.description);
    formData.append('CategoryId', data.categoryId);
    if (data.attachment)
        formData.append('Attachment', data.attachment);

    loading.value = true;
    var res = await CreateQuestion(formData);
    if (res.isSuccess) {
        toast.showToast("سوال شما با موفقیت ثبت شد");
        router.push('/questions/show/' + res.data + '/' + data.title.replaceAll(' ', '-'));
        emits('closeModal')
    }
    loading.value = false;
}

onMounted(async () => {
    if (utilStore.questionCategories.length == 0) {
        categoryLoading.value = true;
        var res = await GetQuestionCategories();
        if (res.isSuccess) {
            utilStore.questionCategories = res.data ?? [];
        }
        categoryLoading.value = false;

    }
})
</script>