<template>
  <div>
    <BaseButton outline v-if="notifications?.entityCount ?? 0 > 0" @click="isOpenModal = true" class="" color="red">
      حذف همه
    </BaseButton>
    <BaseAlert :alert-type="'info'" v-if="loading == false && (notifications?.entityCount ?? 0) == 0">
      موردی برای نمایش وجود ندارد
    </BaseAlert>
    <div class="notifications py-6">
      <template v-if="loading">
        <BaseSkeletonLoaidng height="60px" class="mb-4" v-for="item in [1, 2, 3, 4, 6, 7]" :key="item" />
      </template>
      <template v-else>
        <BaseCollapse :title="item.notificationTitle" bg-white v-for="item in notifications?.data"
          :class="['mb-4', { new: item.isSeen == false }]" :key="item.id" @click="seen(item)">
          <div v-html="item.notificationBody"></div>
        </BaseCollapse>

      </template>
      <BasePagination :class="{ 'card-loading': loading }" v-if="notifications" :filter-result="notifications!"
        v-model="pageId" />
    </div>
    <BaseConfirmPopup v-model="isOpenModal" :confirm-function="deleteNotifications" />
  </div>
</template>

<script setup lang="ts">
import Loading from '~/components/icons/loading.vue';
import { NotificationDto, NotificationFilterResult } from '~/models/account/Notification';
import { GetNotifications, SeenNotification, DeleteAllNotifications } from '~/services/notification.service';
import { useAccountStore } from '~/stores/account.store';

const isOpenModal = ref(false);
definePageMeta({
  layout: "account",
  title: "اعلانات"
});
const toast = useToast();
const deleteNotifications = async () => {
  loading.value = true;
  var res = await DeleteAllNotifications();
  if (res.isSuccess) {
    notifications.value = null;
    toast.showToast("اعلانات با موفیت حذف شدند");
    isOpenModal.value = false;
  }
  loading.value = false;

}
const notifications: Ref<NotificationFilterResult | null> = ref(null);
const pageId = ref(1);
const accountStore = useAccountStore();
const loading = ref(false);
onMounted(() => {
  getData();
})
const getData = async () => {
  loading.value = true;
  var res = await GetNotifications(pageId.value, 5);
  if (res.isSuccess) {
    notifications.value = res.data ?? null;
  }
  loading.value = false;
}
const seen = async (item: NotificationDto) => {
  console.log(item);
  if (item.isSeen == false) {
    item.isSeen = true;
    if (accountStore.newAlertsCount!.newNotificationsCount > 0)
      accountStore.newAlertsCount!.newNotificationsCount -= 1;
    await SeenNotification(item.id);
  }
}
watch(pageId, (val) => {
  getData();
})
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
