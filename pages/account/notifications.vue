<template>
  <div>
    <BaseButton @click="isOpenModal = true" class="" color="red">
      حذف همه
      <template #icon>
        <IconsTrash class="" />
      </template>
    </BaseButton>
    <div class="notifications py-6">
      <BaseCollapse :title="item.notificationTitle" bg-white v-for="item in accountStore.notifications"
        :class="['mb-4', { new: item.isSeen == false }]" :key="item.id">
        <div v-html="item.notificationBody"></div>
      </BaseCollapse>
    </div>
    <BaseConfirmPopup v-model="isOpenModal" :confirm-function="deleteAllNotification" />
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account.store';

const isOpenModal = ref(false);
definePageMeta({
  layout: "account",
});
const deleteAllNotification = () => {

}
const accountStore = useAccountStore();
</script>
<style  lang="scss">
.new {
  position: relative;
  border: 1px solid var(--color-error) !important;
}

.notifications {
  a {
    display: inline-block;
    font-weight: bold;
    color: var(--primary-color);
  }
}
</style>
