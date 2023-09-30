<template>
  <div class="flex w-full flex-wrap">
    <div class="w-[50%] sm:w-full p-2">
      <br/>
      <br/>

      <base-button v-if="accountStore.currentUser?.roles.includes('مدرس') == false" :render-button-tag="false"
        to="/account/registerTeacher" v-tooltip="'ثبت نام به عنوان مدرس'" class="btn btn-success mb-1">همکاری
        با کدیاد</base-button>
      <AccountVerifyPhoneNumber />
      <BaseAlert :alert-type="'info'" class="my-2" v-if="accountStore.currentUser?.isCompleteProfile == false">
        <div class="flex justify-between w-full items-center">
          کاربر عزیز با تکمیل پروفایل خود کدیاد جم دریافت کنید !
          <BaseButton :render-button-tag="false" to="/account/edit" class="min-w-max" :color-white="true">تکمیل پروفایل
          </BaseButton>
        </div>
      </BaseAlert>

      <div class="card">
        <div class="flex gap-4 mt-2">
          <base-img :src="GetUserAvatar(accountStore.currentUser?.imageName ?? '')" width="200px" alt="avatar"
            class="rounded w-[50px] h-[50px]" />
          <div class="flex flex-col gap-2">
            <p>{{ accountStore.currentUser?.fullName }}</p>
            <div v-html="accountStore.currentUser?.aboutMe"></div>
          </div>
        </div>
        <div class="flex justify-end">
          <BaseButton :render-button-tag="false" to="/account/edit" size="sm">ویرایش اطلاعات</BaseButton>
        </div>
      </div>
    </div>
    <div class="w-[48%] sm:w-full pr-2">
      <h3 class="text-h6 font-semibold">آخرین تیکت ها</h3>
      <div :class="['table-responsive', { 'card-loading': ticketLoading }]">
        <table class="mt-2">
          <thead>
            <tr>
              <th>عنوان</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="accountStore.ticketFilterResult?.entityCount == 0">
              <td colspan="3">تیکت ای برای نمایش وجود ندارد</td>
            </tr>
            <tr v-for="ticket in accountStore.ticketFilterResult?.tickets">
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
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TicketStatus } from '~/models/tickets/TicketDto';
import { GetUserTickets } from '~/services/ticket.service';
import { useAccountStore } from '~/stores/account.store';

const accountStore = useAccountStore();
definePageMeta({
  layout: "account",
});
const ticketLoading = ref(false);
onMounted(async () => {
  if (accountStore.ticketFilterResult != null)
    return;
  ticketLoading.value = true;
  var res = await GetUserTickets(1);
  if (res.isSuccess) {
    accountStore.ticketFilterResult = res.data ?? null;
  }
  ticketLoading.value = false;
})
</script>
