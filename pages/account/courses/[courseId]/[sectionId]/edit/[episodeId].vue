<template>
  <div >
    <div class="flex justify-between">
      <span class="font-bold text-h5">افزودن بخش جدید</span>
      <base-button color-white size="sm" :render-button-tag="false" :to="`/account/courses/show/${courseId}`">بازگشت</base-button>
    </div>
    <hr class="my-6">
    <div class="p-8 relative rounded-lg bg-white border-2">
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
      <div v-if="loading" class="bg-gray-500 absolute inset-0 rounded-lg opacity-50 animate-pulse grid place-items-center">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
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
  videoFile:null,
  attachFile:null
})

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const courseId:number = Number(route.params?.courseId);
const sectionId:number = Number(route.params?.sectionId);
const episodeId:number = Number(route.params?.episodeId);

onMounted(async ()=>{
})


const submitEpisode = async () => {
  loading.value = true;

  const episode = new FormData();
  episode.append('courseId',courseId.toString());
  episode.append('sectionId',sectionId.toString());
  episode.append('episodeTitle',episodeData.episodeTitle);
  episode.append('englishName',episodeData.englishName);
  episode.append('description',episodeData.description);
  episode.append('isFree',episodeData.isFree ? 'true' : 'false');
  episode.append('time',episodeData.time);
  if(episodeData.videoFile != null)
    episode.append('videoFile',episodeData.videoFile);
  if(episodeData.attachFile != null)
    episode.append('attachFile',episodeData.attachFile);

  const fetchResult = await AddEpisode(episode);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
    router.push(`/account/courses/show/${courseId}`);
  }
}

</script>

<style>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: scale(200%);
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>