<template>
  <div class="mt-3">
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>وضعیت</th>
            <th>تاریخ ثبت</th>
            <th>تعداد گفتوگو</th>
            <th>گیرنده / فرستنده</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr c v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="item">
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
              <td>
                <BaseSkeletonLoaidng type="box" height="8px" />
              </td>
            </tr>
          </template>
          <template v-else-if="messageResult">
            <tr v-for="(message, i) in messageResult.messages" :key="message.id">
              <td>{{ i + pageId }}</td>
              <td>{{ message.subject }}</td>
              <td>
                <b class="text-red" v-if="message.hasNewMessage">در انتظار پاسخ</b>
                <p class="text-green" v-else>پاسخ داده شده</p>
              </td>
              <td>{{ toPersianDate(new Date(message.createDate)) }}</td>
              <td>{{ message.contentCount }}</td>
              <td>{{ message.reciverName }} / {{ message.senderName }}</td>
              <td class="flex justify-center">
                <BaseButton @click="goToChat(message)">نمایش
                </BaseButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">اطلاعاتی وجود ندارد</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="w-full flex items-center justify-center mt-4">
      <base-pagination v-if="!loading && messageResult" v-model="pageId" :filter-result="messageResult"></base-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserMessageFilterData, UserMessageFilterResult } from "~~/models/account/UserMessage";
import { getUserMessagesByFilter } from "~~/services/userMessages.service";
import { BaseFilterResult } from "~~/models/IApiResponse";
import { useAccountStore } from "~/stores/account.store";

const router = useRouter();
definePageMeta({
  layout: "account",
  title: "گفتگو ها"
});
const loading = ref(false);
const pageId = ref(1);
const messageResult: Ref<UserMessageFilterResult | null> = ref(null);
const accountStore = useAccountStore();

watch(pageId, async (val) => await getData());
const goToChat = (message: UserMessageFilterData) => {
  if (message.hasNewMessage) {
    if (accountStore.newAlertsCount && accountStore.newAlertsCount.newMessagesCount > 0) {
      accountStore.newAlertsCount.newMessagesCount -= 1;
    }
  }
  router.push(`/account/messages/show?messageId=${message.id}`)
}
onMounted(async () => {
  await getData();
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await getUserMessagesByFilter(pageId.value);
  if (fetchResult.isSuccess) {
    messageResult.value = fetchResult.data!;
  }

  loading.value = false;
}
</script>
