<template>
  <div>
    <div class="flex justify-between">
      <span class="font-bold text-h5">کامنت های ویژه</span>
      <base-button color-white size="sm" :render-button-tag="false" to="/account/courses">بازگشت</base-button>
    </div>

    <hr class="my-6">

    <div class="table-responsive mt-4 shadow-md">
        <table ref="specialTable">
          <thead>
          <tr>
            <th>نام کاربر</th>
            <th>متن</th>
            <th>عملیات</th>
          </tr>
          </thead>
          <tbody >
          <template v-if="loading">
            <tr c v-for="item in 5">
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="150">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else-if="specialComments.length > 0">
            <tr v-for="comment in specialComments" :key="comment.id">
              <td width="10%">{{comment.userFullName}}</td>
              <td class="text-right">{{comment.text}}</td>
              <td width="5%">
                <base-button outline color-white class="mx-auto" @click="deleteSpecialComment(comment.id)">
                  <IconsTrash width="16" height="16" color="red"/>
                </base-button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="3">اطلاعاتی موجود نیست</td>
            </tr>
          </template>
          </tbody>
        </table>
    </div>

    <hr class="my-6 border-2 border-black/20 rounded-lg">

    <div class="p-6 rounded-lg bg-white">

      <Form @submit="getData" class="space-y-2">
        <base-input label="جستجو در کامنت ها" name="search" v-model="commentsFilter.search" placeholder="جستجو در کامنت های دانشجویان..."/>
        <base-button type="submit" outline class="mr-auto">جستجو</base-button>
      </Form>

      <hr class="my-4">

      <Form @submit="setSpecialComments">
        <base-button color="green">ثبت اطلاعات</base-button>
      <div class="table-responsive mt-4 shadow-md">
        <table ref="commentsTable">
          <thead>
          <tr>
            <th>برگزیده</th>
            <th>نام کاربر</th>
            <th>متن</th>
            <th>عملیات</th>
          </tr>
          </thead>
          <tbody >
          <template v-if="loading">
            <tr c v-for="item in 5">
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="150">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else-if="comments.length > 0">
            <tr v-for="comment in comments" :key="comment.id" v-show="!isSpecial(comment.fullName,comment.text)">
              <td width="5%">
                <input type="checkbox" name="specialIds" :value="comment.id" class="scale-150"/>
              </td>
              <td width="10%">{{comment.fullName}}</td>
              <td width="80%" class="text-right">{{comment.text}}</td>
              <td >

              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">اطلاعاتی موجود نیست</td>
            </tr>
          </template>
          </tbody>
        </table>

        <div class="flex justify-center my-4" v-if="!loading">
          <base-pagination v-model="pageId" :filter-result="commentsResult" />
        </div>

      </div>
      </Form>
    </div>

  </div>
</template>

<script setup lang="ts">
import {Form} from "vee-validate";
import {GetSpecialComments} from "~/services/teacher.service";
import {CourseSpecialComment} from "~/models/courses/CourseLanding";
import {TeacherCommentsFilterParams,TeacherComment} from "~/models/teachers/teacherComments";
import {BaseFilterResult} from "~/models/IApiResponse";
import {GetTeacherComments,SetSpecialComments,DeleteSpecialComment} from "~/services/teacher.service";


definePageMeta({
  layout: "account",
});

const specialTable = ref();
const commentsTable = ref();
const loading = ref(false);
const route = useRoute();
const pageId = ref(1);
const courseId = Number(route.query?.courseId);
const specialComments:Ref<CourseSpecialComment[]> = ref([]);
const comments:Ref<TeacherComment[]> = ref([]);
const commentsResult:Ref<BaseFilterResult> = ref();

const commentsFilter:TeacherCommentsFilterParams = reactive({
  courseId:courseId,
  search:'',
  take:10,
  pageId:pageId
});

watch(pageId,()=>getData())

onMounted(async ()=>{
  await getData();
})

const isSpecial =  (name:string,text:string):boolean =>{
  return (specialComments.value.map(c=>c.userFullName).includes(name) && specialComments.value.map(c=>c.text).includes(text))
          || specialComments.value.map(c=>c.text).includes(text);
}

const getData = async ()=>{
  loading.value = true;
  const fetchResult = await GetSpecialComments(courseId);
  if(fetchResult.isSuccess){
    specialComments.value = fetchResult.data ?? [];
  }

  const commentsFetchResult = await GetTeacherComments(commentsFilter);
  if(commentsFetchResult.isSuccess){
    comments.value = commentsFetchResult.data?.data ?? [];
    commentsResult.value = commentsFetchResult.data;
  }

  loading.value = false;
}

const setSpecialComments = async ()=>{
  loading.value = true;
  const commentsList = commentsTable.value.querySelectorAll('input[type=checkbox]');
  const selectedComments:number[] = [...commentsList].filter(c=>c.checked).map(c=>c.value.toString());
  if(selectedComments.length == 0) return;

  const commentIds = selectedComments.join('-');

  const fetchResult = await SetSpecialComments(courseId,commentIds);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
    await getData();
  }
  loading.value = false;
}

const deleteSpecialComment = async (commentId:number)=>{
  loading.value = true;
  const fetchResult = await DeleteSpecialComment(commentId);
  if(fetchResult.isSuccess){
    const toast = useToast();
    toast.showToast();
    await getData();
  }
  loading.value = false;
}

</script>

