<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">تسویه حساب ها</p>
      </div>
      <BaseButton color="green" @click="isOpenModal = true">افزودن درخواست</BaseButton>
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>مبلغ</th>
            <th>مبلغ ارزی</th>
            <th>شماره کارت</th>
            <th>تاریخ ثبت</th>
            <th>وضعیت</th>
            <th>تاریخ پرداخت</th>
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
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else-if="data?.withdrawals.length == 0">
            <tr>
              <td colspan="6">
                دیتایی برای نمایش وجود ندارد
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="item in data?.withdrawals">
              <td>{{ item.amount.toLocaleString() }} تومان </td>
              <td>{{ item.cryptoAmount }}</td>
              <td>{{ item.cardNumber }}</td>
              <td>{{ toPersianDate(new Date(item.createDate)) }}</td>
              <td>{{ toPersianDate(new Date(item.paymentDate)) }}</td>
              <td>
                <b class="text-green" v-if="item.isPay">پرداخت شده</b>
                <b class="text-blue" v-else>در انتظار پرداخت</b>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center" v-if="data">
      <BasePagination :filter-result="data!" class="mt-2" v-model="pageId" />
    </div>
    <BaseModal title="درخواست  مشاوره  " v-model="isOpenModal">
      <account-withdrawals-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { WithdrawalFilterResult } from '~/models/account/Withdrawal';
import { GetWithdrawals } from '~/services/Withdrawal.service';

definePageMeta({
  layout: "account",
});
const loading = ref(false);
const isOpenModal = ref(false);
const pageId = ref(1);
const data: Ref<WithdrawalFilterResult | null> = ref(null);

onMounted(async () => {
  await getData();
});
watch(pageId, async (val) => {
  await getData();
})
const getData = async () => {
  loading.value = true;
  var res = await GetWithdrawals(pageId.value);
  if (res.isSuccess) {
    data.value = res.data!;
  }
  loading.value = false;
}
</script>
