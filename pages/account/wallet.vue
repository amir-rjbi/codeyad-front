<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">
          موجودی کیف پول : <b class="text-green-500">390,000 تومان</b>
        </p>
        <label class="sm:hidden">|</label>
        <p class="text-h6 sm:!text-h7">
          موجودی کیف پول ارزی : <b class="text-green-500">0$</b>
        </p>
      </div>
      <BaseButton
        color="green"
        @click="(loading = !loading), (isOpenModal = true)"
        >شارژ کیف پول</BaseButton
      >
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>مبلغ</th>
            <th>مبلغ ارزی</th>
            <th>نوع</th>
            <th>تاریخ</th>
            <th>توضیحات</th>
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
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>390,000 تومان</td>
              <td>$0.00</td>
              <td>
                <b class="text-green">واریز</b>
              </td>
              <td>1402/06/13</td>
              <td>
                فروش دوره ' آموزش جامع ویو جی اس (3 Vue.js) و Nuxt Js - پروژه
                محور ' با کسر 40% سود سایت
              </td>
            </tr>
            <tr>
              <td>390,000 تومان</td>
              <td>$0.00</td>
              <td>
                <b class="text-red-700">برداشت</b>
              </td>
              <td>1402/06/13</td>
              <td>
                فروش دوره ' آموزش جامع ویو جی اس (3 Vue.js) و Nuxt Js - پروژه
                محور ' با کسر 40% سود سایت
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal
      title="شارژ کیف پول"
      v-model="isOpenModal"
      :mobile-header="true"
      size="sm"
    >
      <account-wallet-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "account",
});
const loading = ref(false);
const isOpenModal = ref(false);
</script>
