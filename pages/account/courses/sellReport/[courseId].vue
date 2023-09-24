<template>
  <div>
    <div class="flex justify-between">
      <span class="font-bold text-h5">آمار فروش دوره: {{courseTitle}}</span>
      <base-button color-white size="sm" :render-button-tag="false" to="/account/courses">بازگشت</base-button>
    </div>

    <hr class="my-6">

    <div class="p-6 rounded-lg bg-white">

        <BaseAlert alert-type="info">
          قیمت خریداری شده قیمت ای است که کاربر به سایت پرداخت کرده است ، نه مبلغی که به کیف پول شما واریز شده
        </BaseAlert>

        <div class="table-responsive mt-4 shadow-md">
          <table >
            <thead>
            <tr>
              <th>خریدار</th>
              <th>مبلغ خریداری شده</th>
              <th>تاریخ خرید</th>
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
            <template v-else-if="orders.length > 0">
              <tr v-for="order in orders" :key="order.buyyer" >
                <td>
                  {{order.buyyer}}
                </td>
                <td>{{toTomanPrice(order.price)}} تومان</td>
                <td>{{new Date(order.paymentDate).toLocaleTimeString('fa-IR')}} - {{toPersianDate(new Date(order.paymentDate))}}</td>
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
            <base-pagination v-model="pageId" :filter-result="ordersResult" />
          </div>

        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {BaseFilterResult} from "~/models/IApiResponse";
import {GetOrderDetailsOfCourse} from "~/services/teacher.service";
import {TeacherOrderDetail} from "~/models/teachers/orderDetails";
import {toPersianDate} from "~/utils/dateUtil";
import {toTomanPrice} from "~/utils/numberUtils";


definePageMeta({
  layout: "account",
});

const loading = ref(false);
const route = useRoute();
const pageId = ref(1);
const courseId = Number(route.params?.courseId);
const orders:Ref<TeacherOrderDetail[]> = ref([]);
const ordersResult:Ref<BaseFilterResult | null> = ref(null);
const courseTitle = ref('');

watch(pageId,()=>getData())

onMounted(async ()=>{
  await getData();
})

const getData = async ()=>{
  loading.value = true;
  const fetchResult = await GetOrderDetailsOfCourse(courseId,pageId.value,20);
  if(fetchResult.isSuccess){
    ordersResult.value = (fetchResult.data as BaseFilterResult) ?? null;
    orders.value = fetchResult.data?.orderDetails ?? [];
    courseTitle.value = fetchResult.data?.courseTitle ?? '';
  }
  loading.value = false;
}


</script>

