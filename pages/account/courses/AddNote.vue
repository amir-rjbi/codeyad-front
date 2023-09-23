<template>
  <div class="flex justify-between">
    <span class="font-bold text-h5">ثبت یادداشت</span>
    <base-button color-white size="sm" :render-button-tag="false" to="/account/courses">بازگشت</base-button>
  </div>
  <hr class="my-6">
  <div v-if="loading">
    <BaseSkeletonLoaidng />
  </div>
  <div v-else class="p-8 rounded-lg bg-white">
    <Form @submit="setNote" class="flex flex-col space-y-4">
      <BaseHtmlEditor
          name="note"
          id="note"
          label="متن یادداشت"
          placeholder="متن یادداشت خود را وارد کنید"
          v-model="note"
      />
      <BaseButton class="mr-auto" >ذخیره یادداشت</BaseButton>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {GetNote,SetNote} from "~/services/teacher.service";

definePageMeta({
  layout: "account",
});

const loading = ref(false);
const route = useRoute();
const courseId = Number(route.query?.courseId);
const note = ref("");

onMounted(async ()=>{
  await getData();
})

const getData = async ()=>{
  loading.value = true;
  const fetchResult = await GetNote(courseId);
  if(fetchResult.isSuccess){
    note.value = fetchResult.data ?? '';
  }
  loading.value = false;
}

const setNote = async ()=>{
  loading.value = true;
  const fetchResult = await SetNote(courseId,note.value);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
  }
  loading.value = false;
}

</script>
