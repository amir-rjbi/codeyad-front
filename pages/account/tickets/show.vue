<template>
  <div>
    <main class="chat-bg">
      <div class="flex justify-between items-center p-4 bg-white space-x-reverse">
        <div class="flex items-center gap-2">
          <strong>موضوع تیکت:</strong>
          <BaseSkeletonLoaidng width="80px" height="20px" v-if="loading" />
          <span v-else-if="ticket != null">{{ ticket.ticketTitle }}</span>
        </div>
        <div class="" v-if="loading == false">
          <p>وضعیت :
            <b v-if="ticket?.status == TicketStatus.close" class="text-red">بسته شده</b>
            <b v-if="ticket?.status == TicketStatus.replied" class="text-blue">پاسخ داده شده</b>
            <b v-if="ticket?.status == TicketStatus.waiting_For_Reply" class="text-orange">در انتظار پاسخ</b>
          </p>
        </div>
      </div>
      <div class="shadow-lg rounded-lg p-5 mt-4 h-[55vh] overflow-y-auto" v-if="loading">
        <ul>
          <li v-for="message in [1, 2]" :class="[`${message === 1 ? 'me' : 'you'}`]">
            <BaseSkeletonLoaidng width="180px" height="50px" />
          </li>
        </ul>
      </div>
      <div ref="chatArea" class="rounded-lg p-5 mt-4 h-[55vh] overflow-y-auto " v-else-if="ticket != null">
        <ul>
          <li class="me">
            <p class="shadow-lg">
            <p v-text="ticket.ticketBody"></p>
            <span>
              {{ TimeAgo(new Date(ticket.createDate)) }}
              -
              {{ toPersianDate(new Date(ticket.createDate)) }}
            </span>
            </p>
          </li>
          <li v-if="ticket.ticketMessages.length > 0" v-for="message in ticket.ticketMessages"
            :class="[`${message.userId === userId ? 'me' : 'you'}`]">
            <p class="shadow-md">
            <p v-text="message.messageBody"></p>
            <span>
              {{ TimeAgo(new Date(message.createDate)) }}
              -
              {{ toPersianDate(new Date(message.createDate)) }}
            </span>
            </p>
          </li>
        </ul>
      </div>
      <BaseAlert v-if="ticket?.status == TicketStatus.close" :alert-type="'info'" class="mb-2">امکان ارسال پیام در تیکت با
        وضعیت بسته شده وجود ندارد</BaseAlert>
      <div v-else :class="['bg-white p-3 w-full', { 'card-loading': loading }]">
        <Form @submit.prevent="sendMessage" class="flex items-center gap-2">
          <base-input class="flex-1" out-line required v-model="userMessage" name="userMessage"
            placeholder="پیام خود را وارد کنید" multiline />
          <base-button :loading="loading" type="submit">
            <div class="flex gap-2 items-center">
              ارسال
              <svg aria-hidden="true" class="w-6 h-6 -rotate-90" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                </path>
              </svg>
            </div>
          </base-button>
        </Form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "~/stores/account.store";
import { AddTicketMessage } from "~/services/ticket.service";
import { Ticket, TicketStatus } from "~/models/tickets/TicketDto";
import { GetTicketById } from "~/services/ticket.service";
import { toPersianDate, TimeAgo } from "~/utils/dateUtil";

definePageMeta({
  layout: "account",
});

const loading = ref(false);
const userMessage = ref("");
const chatArea = ref();
const ticket = ref<Ticket>();
const route = useRoute();
const router = useRouter();
const ticketId = ref(route.query?.ticketId ?? null);

const accountStore = useAccountStore();
const userId = accountStore.currentUser?.id;
const toast = useToast();

onMounted(async () => {
  await getData();
  setTimeout(() => {
    chatArea.value.scrollTo({ left: 0, top: chatArea.value.scrollHeight, behavior: "smooth" });
  }, 200)
})

const getData = async () => {
  loading.value = true;
  const fetchResult = await GetTicketById(Number(ticketId.value));
  if ((fetchResult).isSuccess) {
    ticket.value = fetchResult.data!;
  } else {
    router.push("/account/tickets");
  }
  loading.value = false;

}

const sendMessage = async () => {
  if (!userMessage.value) {
    return;
  }
  if (ticket.value?.status == TicketStatus.close) {
    toast.showToast('امکان ارسال پیام در این تیکت وجود ندارد', ToastType.error)
    userMessage.value = ""
    return;
  }
  loading.value = true;
  const sendResult = await AddTicketMessage(Number(ticketId.value), userMessage.value);
  loading.value = false;
  if (sendResult.isSuccess) {
    userMessage.value = "";
    toast.showToast('پیام با موفقیت در تیکت ثبت شد')
    await getData();
  }

};

</script>


