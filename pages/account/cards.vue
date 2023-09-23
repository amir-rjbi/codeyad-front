<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">کارت های بانکی</p>
      </div>
      <BaseButton color="green" @click="isOpenModal = true">افزودن کارت</BaseButton>
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
              <td>{{ item.id }}</td>
              <td>{{ SplitCardNumber(item.cardNumber) }}</td>
              <td>{{ item.ownerName }}</td>
              <td>
                <label v-if="item.isAccept" class="text-green">فعال</label>
                <label v-else class="text-red">غیرفعال</label>
              </td>
              <td class="flex justify-center gap-2">
                <BaseButton size="sm" @click="OpenEditModal(item)">ویرایش</BaseButton>
                <BaseButton color="red" size="sm" @click="OpenDeleteModal(item)">حذف</BaseButton>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <BaseModal title="افزودن کارت" v-model="isOpenModal">
      <account-cards-add @close-modal="closeAndReload" />
    </BaseModal>
    <BaseModal title="ویرایش کارت" v-model="isOpenEditModal">
      <account-cards-edit :card-data="selectedItem!" @close-modal="closeAndReload" />
    </BaseModal>
    <BaseConfirmPopup v-model="isOpenDeleteModal" :confirm-function="deleteItem" />
  </div>
</template>
<script setup lang="ts">
import { Card } from "~/models/account/card";
import { DeleteCard, GetUserCards } from "~/services/userCards.service";
import { SplitCardNumber } from "~/utils/stringUtil";

definePageMeta({
  layout: "account",
});
const toast = useToast();
const data: Ref<Card[]> = ref([]);
const loading = ref(false);
const isOpenModal = ref(false);
const isOpenEditModal = ref(false);
const isOpenDeleteModal = ref(false);
const selectedItem: Ref<Card | null> = ref(null);

const OpenDeleteModal = (item: Card) => {
  selectedItem.value = item;
  isOpenDeleteModal.value = true;
}
const OpenEditModal = (item: Card) => {
  selectedItem.value = item;
  isOpenEditModal.value = true;
}
const deleteItem = async () => {
  var res = await DeleteCard(selectedItem.value!.id);
  if (res.isSuccess) {
    toast.showToast('کارت با موفقیت حذف شد');
    data.value = data.value.filter(f => f.id != selectedItem.value?.id);
    selectedItem.value = null;
    isOpenDeleteModal.value = false;
  }
}
const closeAndReload = async () => {
  isOpenModal.value = false;
  isOpenEditModal.value = false;
  selectedItem.value = null;
  await getCards();
}
onMounted(async () => {
  await getCards()
});
const getCards = async () => {
  loading.value = true;
  var res = await GetUserCards();
  if (res.isSuccess) {
    data.value = res.data ?? [];
  }
  loading.value = false;
}
</script>
