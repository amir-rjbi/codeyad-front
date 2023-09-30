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
          <template v-for="item in data">
            <tr>
              <td>{{ item.totalPrice.toLocaleString() }} تومان</td>
              <td>{{ item.orderDetails.length }}</td>
              <td>{{ toPersianDate(new Date(item.paymentDate)) }}</td>
              <td>
                <span class="text-green" v-if="item.isFinally">پرداخت شده</span>
                <span class="text-red" v-else>در انتظار پرداخت</span>
              </td>
              <td class="flex justify-center gap-2 items-center">
                <BaseButton size="sm" @click="showOrder(item)">نمایش</BaseButton>
                <BaseButton size="sm" color="green" :render-button-tag="false" to="/cart" v-if="item.isFinally == false">
                  پرداخت سفارش</BaseButton>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal title="دوره های خریداری شده در فاکتور" v-model="isOpenModal">
      <account-order-show @close-modal="() => isOpenModal = false" :order="selectedOrder" v-if="selectedOrder" />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { Order } from "~/models/account/Order";
import { GetUserOrder } from "../../services/order.service";
definePageMeta({
  layout: "account",
});
const data: Ref<Order[]> = ref([]);
const loading = ref(false);
const isOpenModal = ref(false);
const selectedOrder: Ref<Order | null> = ref(null);

const showOrder = (item: Order) => {
  isOpenModal.value = true;
  selectedOrder.value = item;
}
onMounted(async () => {
  loading.value = true;
  var res = await GetUserOrder();
  if (res.isSuccess) {
    data.value = res.data ?? []
  }
  loading.value = false;

});
</script>
