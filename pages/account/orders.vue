<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">فاکتور ها</p>
      </div>
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>مبلغ</th>
            <th>تعداد دوره</th>
            <th>تاریخ پرداخت</th>
            <th>وضعیت</th>
            <th>عملیات</th>
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
              <td>
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td>
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>{{ data.orderId }}</td>
              <td>{{ data.price }}</td>
              <td>{{ data.discount }}</td>
              <td>500</td>
              <td>{{ data.isFinally }}</td>
              <td class="flex justify-center">
                <BaseButton @click="isOpenModal = true">نمایش</BaseButton>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal title="نمایش فاکتور" v-model="isOpenModal">
      <account-order-show />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { date } from "yup";
import { GetUserOrder } from "../../services/order.service";
definePageMeta({
  layout: "account",
});
const data = reactive({
  orderId: 2,
  price: 2,
  discount: 2,

  isFinally: true,
});
onMounted(async () => {
  var res = await GetUserOrder();
  console.log(res);
  data.orderId = res.data!.userId;
  data.discount = res.data!.discount;
  data.isFinally = res.data!.isFinally;
  data.price = res.data!.price;
});
const loading = ref(false);
const isOpenModal = ref(false);
</script>
