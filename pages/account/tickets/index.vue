<template>
  <div class="mt-3">
    <div class="flex items-center gap-4 justify-between flex-wrap">
      <div class="flex items-center gap-4 sm:flex-wrap">
        <p class="text-h6 sm:!text-h7">تیکت ها</p>
      </div>
      <BaseButton color="green" @click="isOpenModal = true">ثبت تیکت جدید</BaseButton>
    </div>
    <div class="table-responsive mt-4 shadow-md">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>عنوان</th>
            <th>وضعیت</th>
            <th>تاریخ ثبت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr v-for="item in [1, 2, 3]">
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
          <template v-else-if="tickets.length > 0">
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td>{{ ticket.id }}</td>
              <td>{{ ticket.ticketTitle }}</td>
              <td v-if="ticket.status === TicketStatus.close">
                <span class="text-red">بسته شده</span>
              </td>
              <td v-else-if="ticket.status === TicketStatus.replied">
                <span class="text-blue">پاسخ داده شده</span>
              </td>
              <td v-else-if="ticket.status === TicketStatus.waiting_For_Reply">
                <span class="text-orange">در انتظار پاسخ</span>
              </td>
              <td>{{ toPersianDate(new Date(ticket.createDate)) }}</td>
              <td>
                <BaseButton :render-button-tag="false" :to="`/account/tickets/show?ticketId=${ticket.id}`">نمایش
                </BaseButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5">اطلاعاتی وجود ندارد</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="w-full flex items-center justify-center mt-4">
      <base-pagination v-if="!loading && ticketsResult" v-model="pageId" :filter-result="ticketsResult"></base-pagination>
    </div>
    <BaseModal title="ثبت تیکت جدید" v-model="isOpenModal">
      <account-tickets-add />
    </BaseModal>
  </div>
</template>
<script setup lang="ts">
import { TicketFilterData, TicketStatus } from "~/models/tickets/TicketDto";
import { GetUserTickets } from "~/services/ticket.service";
import { BaseFilterResult } from "~/models/IApiResponse";

const router = useRouter();
definePageMeta({
  layout: "account",
});
const loading = ref(false);
const isOpenModal = ref(false);
const pageId = ref(1);
const tickets: Ref<TicketFilterData[]> = ref([]);
const ticketsResult: Ref<BaseFilterResult | null> = ref(null);

watch(pageId, async () => await getData());

onMounted(async () => {
  await getData();
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await GetUserTickets(pageId.value);
  if (fetchResult.isSuccess) {
    tickets.value = fetchResult.data?.tickets ?? [];
    ticketsResult.value = fetchResult.data ?? null;
  }
  loading.value = false;
}
</script>
