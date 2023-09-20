<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">گفتگو ها</p>
      </div>
    </div>
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
            <tr c v-for="item in [1, 2, 3]" :key="item">
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
          <template v-else-if="messages != null && messages.length > 0">
            <tr v-for="(message, i) in messages" :key="message.id">
              <td>{{ i + pageId }}</td>
              <td>{{ message.subject }}</td>
              <td>
                <b class="text-primary" v-if="message.hasNewMessage">در انتظار پاسخ</b>
                <b class="text-green" v-else>پاسخ داده شده</b>
              </td>
              <td>{{ toPersianDate(new Date(message.createDate)) }}</td>
              <td>{{ message.contentCount }}</td>
              <td>{{ message.reciverName }} / {{ message.senderName }}</td>
              <td class="flex justify-center">
                <BaseButton :render-button-tag="false" :to="`/account/messages/show?messageId=${message.id}`">نمایش
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
      <base-pagination v-if="!loading" v-model="pageId" :filter-result="messageResult"></base-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UserMessageFilterData } from "~~/models/account/UserMessage";
import { getUserMessagesByFilter } from "~~/services/userMessages.service";
import {BaseFilterResult} from "~~/models/IApiResponse";

const router = useRouter();
definePageMeta({
  layout: "account",
});
const loading = ref(false);
const pageId = ref(1);
const messageResult: Ref<BaseFilterResult> = ref();
const messages: Ref<UserMessageFilterData[]> = ref([]);

watch(pageId, async (val) => await getData());

onMounted(async () => {
  await getData();
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await getUserMessagesByFilter(pageId.value);
  if (fetchResult.isSuccess) {
    messages.value = fetchResult.data?.messages ?? [];
    messageResult.value = fetchResult.data! as BaseFilterResult;
  }

  loading.value = false;
}
</script>
