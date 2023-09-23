<template>
  <div >
    <div class="flex justify-between">
      <span class="font-bold text-h5">افزودن بخش جدید</span>
      <base-button color-white size="sm" :render-button-tag="false" :to="`/account/courses/show/${courseId}`">بازگشت</base-button>
    </div>
    <hr class="my-6">
    <div class="p-8 rounded-lg bg-white border-2">
      <Form :validation-schema="schema" @submit="submitEpisode" class="grid grid-cols-2 gap-4">
        <base-input
            label="عنوان بخش (فارسی)"
            placeholder="عنوان بخش را به فارسی وارد کنید"
            name="episodeTitle"
            v-model="episodeData.episodeTitle"
        />
        <base-input
            label="عنوان بخش (انگلیسی)"
            placeholder="این نام به عنوان نام فایل ویدئویی در نظر گرفته میشود"
            name="englishName"
            v-model="episodeData.englishName"
        />
        <base-text-area
            class="col-span-2"
            label="توضیحات"
            placeholder="توضیحات این بخش را وارد کنید"
            name="description"
            v-model="episodeData.description"
        />
        <base-input
            label="مدت زمان بخش"
            placeholder="فرمت صحیح: 00:19:56"
            name="time"
            v-model="episodeData.time"
        />
        <div class="flex items-center justify-center space-x-4 space-x-reverse">
          <label for="isFre">رایگان؟</label>
          <input type="checkbox" name="isFree" class="scale-150" v-model="episodeData.isFree"/>
        </div>
        <base-input-file name="videoFile" label="ویدئوی این بخش (پسوند mp4)" accept=".mp4" v-model="episodeData.videoFile"/>
        <base-input-file name="attachmentFile" label="فایل ضمیمه : پسوند مجاز (zip , rar)" accept=".zip,.rar" v-model="episodeData.attachFile"/>
        <div></div>
        <base-button type="submit" class="mt-4 mr-auto">ثبت بخش جدید</base-button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Form} from 'vee-validate';
import * as Yup from 'yup';
import {AddEpisode} from "~/services/teacher.service";

definePageMeta({
  layout: "account",
});

const schema = Yup.object().shape({
  episodeTitle:Yup.string().required('لطفا عنوان را وارد کنید'),
  englishName:Yup.string().required('لطفا عنوا نانگلیسی را وارد کنید'),
  description:Yup.string().required('لطفا توضیحات این بخش را وارد کنید'),
  time:Yup.string().required('مدت زمان ویدئو را وارد کنید'),
})

const episodeData = reactive({
  episodeTitle:'',
  englishName:'',
  description:'',
  isFree:false,
  time:'',
  videoFile:Object,
  attachFile:Object
})

const route = useRoute();
const router = useRouter();
const courseId:number = Number(route.params?.courseId);
const sectionId:number = Number(route.params?.sectionId);

const submitEpisode = async () => {
  const episode = new FormData();
  episode.append('courseId',courseId.toString());
  episode.append('sectionId',sectionId.toString());
  episode.append('episodeTitle',episodeData.episodeTitle);
  episode.append('englishName',episodeData.englishName);
  episode.append('description',episodeData.description);
  episode.append('isFree',episodeData.isFree ? 'true' : 'false');
  episode.append('time',episodeData.time);
  episode.append('videoFile',new Blob(episodeData.videoFile),episodeData.videoFile.fileName);
  episode.append('attachFile',new Blob(episodeData.attachFile),episodeData.attachFile.fileName);

  const fetchResult = await AddEpisode(episode);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
    router.push(`/account/courses/show/${courseId}`);
  }
}

</script>