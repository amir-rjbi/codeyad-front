<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">درخواست های مشاوره من</p>
      </div>
      <BaseButton color="green" @click="isOpenModal = true"
        >افزودن درخواست</BaseButton
      >
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>نام مشاور</th>
            <th>تاریخ مشاوره</th>
            <th>وضعیت</th>
            <th>توضیحات مشاور</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr c v-for="item in [1, 2, 3]">
              <td width="140">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
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
          <template v-else-if="consultations && consultations.length > 0">
            <tr v-for="c in consultations" :key="c.id">
              <td>{{c.id}}</td>
              <td>{{toPersianDate(new Date(c.date))}}</td>
              <td v-if="c.status === ConsultationStatus.accepted">موافقیت شده</td>
              <td v-else-if="c.status === ConsultationStatus.rejected">رد شده</td>
              <td v-else-if="c.status === ConsultationStatus.new">در حال بررسی</td>
              <td>{{c.teacherNote}}</td>
              <td class="flex justify-center">
                <BaseButton>نمایش</BaseButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">اطلاعاتی وجود ندارد</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="w-full flex items-center justify-center mt-4" v-if="consultationResult.pageCount > 1">
      <base-pagination v-if="!loading" v-model="pageId" :filter-result="consultationResult"></base-pagination>
    </div>
    <BaseModal title="درخواست  مشاوره  " v-model="isOpenModal">
      <account-consultations-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import {ConsultationDto,ConsultationFilterParams} from "~/models/consultations/consultationDto";
import {GetUserConsultations} from "~/services/consultation.service";
import {ConsultationStatus} from "~/models/consultations/consultationDto";
import {BaseFilterResult} from "~/models/IApiResponse";

definePageMeta({
  layout: "account",
});

const loading = ref(false);
const isOpenModal = ref(false);
const pageId = ref(1);
const consultations:Ref<ConsultationDto[]> = ref([]);
const consultationResult:Ref<BaseFilterResult> = ref();

const filterParams:ConsultationFilterParams = reactive({
  pageId:pageId.value,
  take:10,
  teacherId:undefined,
  OwnerUserId:undefined,
  EndDate:undefined,
  SearchOn:undefined,
  StartDate:undefined
});

onMounted(async ()=>{
  await getData();
})

const getData = async ()=>{
  loading.value = true;
  const fetchResult = await GetUserConsultations(filterParams);
  if(fetchResult.isSuccess){
    consultations.value = fetchResult.data?.requests ?? [];
    consultationResult.value = fetchResult.data!;
  }
  loading.value = false;
}

</script>
