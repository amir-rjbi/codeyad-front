<template>
  <div>spe</div>
</template>

<script setup lang="ts">
import {GetSpecialComments} from "~/services/teacher.service";

definePageMeta({
  layout: "account",
});

const route = useRoute();
const courseId = Number(route.query?.courseId);

onMounted(async ()=>{
  await getData();
})

const getData = async ()=>{
  const fetchResult = await GetSpecialComments(courseId);
  if(fetchResult.isSuccess){
    console.log(fetchResult.data);
  }
}

</script>

