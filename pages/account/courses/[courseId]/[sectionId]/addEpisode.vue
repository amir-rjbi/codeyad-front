<template>
  <Form :validation-schema="schema" v-slot="{ meta }" @submit="submitEpisode">
    <BaseCard :loading="loading">
      <template #header>
        <div class="flex justify-between">
          <span class="font-bold text-h5">افزودن بخش جدید</span>
          <base-button outline color="red" size="sm" :render-button-tag="false"
            :to="`/account/courses/show/${courseId}`">بازگشت</base-button>
        </div>
      </template>
      <div class="grid grid-cols-2 gap-4">
        <base-input class="sm:col-span-2" label="عنوان بخش (فارسی)" placeholder="عنوان بخش را به فارسی وارد کنید"
          name="episodeTitle" autocomplete="on" v-model="episodeData.episodeTitle" />
        <base-input autocomplete="on" class="sm:col-span-2" label="عنوان بخش (انگلیسی)"
          placeholder="این نام به عنوان نام فایل ویدئویی در نظر گرفته میشود" name="englishName"
          v-model="episodeData.englishName" />
        <base-text-area class="col-span-2" label="توضیحات" placeholder="توضیحات این بخش را وارد کنید" name="description"
          v-model="episodeData.description" />
        <base-input class="sm:col-span-2" label="مدت زمان بخش" placeholder="فرمت صحیح: 00:19:56" name="time"
          v-model="episodeData.time" />
        <BaseSelectBox class="sm:col-span-2" v-model="episodeData.isFree" name="isFree" label="این بخش رایگان است ؟">
          <option value="true">بله</option>
          <option value="false">خیر</option>
        </BaseSelectBox>
        <base-input-file class="sm:col-span-2" name="videoFile" label="ویدئوی این بخش (پسوند mp4)" accept=".mp4"
          v-model="episodeData.videoFile" />
        <base-input-file class="sm:col-span-2" name="attachmentFile" label="فایل ضمیمه : پسوند مجاز (zip , rar)"
          accept=".zip,.rar" v-model="episodeData.attachFile" />
      </div>
      <template #actions>
        <BaseButton :loading="loading" :disabled="!meta.valid">ثبت بخش جدید</BaseButton>
      </template>
    </BaseCard>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { AddEpisode } from "~/services/teacher.service";

definePageMeta({
  layout: "account",
});

const schema = Yup.object().shape({
  episodeTitle: Yup.string().required('لطفا عنوان را وارد کنید'),
  englishName: Yup.string()
    //@ts-ignore
    .slug().required('لطفا عنوان انگلیسی را وارد کنید'),
  description: Yup.string().required('لطفا توضیحات این بخش را وارد کنید'),
  time: Yup.string().required('مدت زمان ویدئو را وارد کنید'),
})

const episodeData = reactive({
  episodeTitle: '',
  englishName: '',
  description: '',
  isFree: "false",
  time: '00:00:00',
  videoFile: null,
  attachFile: null
})

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const courseId: number = Number(route.params?.courseId);
const sectionId: number = Number(route.params?.sectionId);

const submitEpisode = async () => {
  loading.value = true;
  const episode = new FormData();
  episode.append('courseId', courseId.toString());
  episode.append('sectionId', sectionId.toString());
  episode.append('episodeTitle', episodeData.episodeTitle);
  episode.append('englishName', episodeData.englishName);
  episode.append('description', episodeData.description);
  episode.append('isFree', episodeData.isFree);
  episode.append('time', episodeData.time);
  if (episodeData.videoFile != null)
    episode.append('videoFile', episodeData.videoFile);
  if (episodeData.attachFile != null)
    episode.append('attachFile', episodeData.attachFile);

  const fetchResult = await AddEpisode(episode);
  if (fetchResult.isSuccess) {
    const toast = useToast();
    toast.showToast();
    router.push(`/account/courses/show/${courseId}`);
  }
  loading.value = false;
}

</script>