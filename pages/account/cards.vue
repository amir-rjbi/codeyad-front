<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">کارت های بانکی</p>
      </div>
      <BaseButton color="green" @click="isOpenModal = true"
        >افزودن کارت</BaseButton
      >
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>شماره کارت</th>
            <th>صاحب حساب</th>
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
              <td width="160">
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="item in data">
              <td>{{ item }}</td>
              <td>{{ data?.cardNumber }}</td>
              <td>{{ data?.ownerName }}</td>
              <td>{{ data?.isAccept }}</td>
              <td class="flex justify-center">
                <BaseButton>نمایش</BaseButton>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal title="افزودن کارت  " v-model="isOpenModal">
      <account-cards-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { card } from "~/models/account/card";
import { GetUserCard } from "~/services/userCards.service";

definePageMeta({
  layout: "account",
});
const data: Ref<card | null> = ref(null);

onMounted(async () => {
  loading.value = true;
  var res = await GetUserCard();
  if (res.isSuccess) {
    data.value = res.data!;

    console.log(data.value);
  }
  loading.value = false;
});
const loading = ref(false);
const isOpenModal = ref(false);
</script>
