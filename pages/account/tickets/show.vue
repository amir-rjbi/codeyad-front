<template>
  <main class="p-4">
    <div class="flex items-center space-x-4 space-x-reverse">
      <strong>موضوع تیکت:</strong>
      <span v-if="ticket != null">{{ ticket.ticketTitle }}</span>
    </div>
    <div ref="chatArea" class="shadow-lg rounded-lg p-5 mt-4 max-h-[70vh] overflow-y-auto chat-bg" v-if="ticket != null">
      <ul>
        <li class="me">
          <p>
          <p v-html="ticket.ticketBody"></p>
          <span>
            {{ TimeAgo(new Date(ticket.createDate)) }}
            -
            {{ toPersianDate(new Date(ticket.createDate)) }}
          </span>
          </p>
        </li>
        <li v-if="ticket.ticketMessages.length > 0" v-for="message in ticket.ticketMessages"
          :class="[`${message.userId === userId ? 'me' : 'you'}`]">
          <p>
          <p v-html="message.messageBody"></p>
          <span>
            {{ TimeAgo(new Date(message.createDate)) }}
            -
            {{ toPersianDate(new Date(message.createDate)) }}
          </span>
          </p>
        </li>
      </ul>
      <div class="rounded-md mt-4">
        <Form @submit.prevent="sendMessage" class="flex items-center space-x-4 space-x-reverse">
          <base-input class="flex-1" required v-model="userMessage" name="userMessage" placeholder="پیام خود را وارد کنید"
            multiline />
          <base-button size="sm" type="submit">
            <svg aria-hidden="true" class="w-6 h-6 -rotate-90" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
              </path>
            </svg>
          </base-button>
        </Form>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { useAccountStore } from "~/stores/account.store";
import { AddTicketMessage } from "~/services/ticket.service";
import { Ticket } from "~/models/tickets/TicketDto";
import { GetTicketById } from "~/services/ticket.service";
import { toPersianDate, TimeAgo } from "~/utils/dateUtil";

definePageMeta({
  layout: "account",
});

const userMessage = ref("");
const chatArea = ref();
const ticket = ref<Ticket>();
const route = useRoute();
const router = useRouter();
const ticketId = ref(route.query?.ticketId ?? null);

const accountStore = useAccountStore();
const userId = accountStore.currentUser?.id;

onMounted(async () => {
  await getData();
  setTimeout(() => {
    chatArea.value.scrollTo({ left: 0, top: chatArea.value.scrollHeight, behavior: "smooth" });
  }, 200)
})

const getData = async () => {
  if (ticketId.value === null) router.push("error");

  const fetchResult = await GetTicketById(Number(ticketId.value));
  if ((fetchResult).isSuccess) {
    ticket.value = fetchResult.data!;
  }
  else router.push("error");
}

const sendMessage = async () => {
  if (!userMessage.value) {
    return;
  }
  const sendResult = await AddTicketMessage(Number(ticketId.value), userMessage.value);
  if (sendResult.isSuccess) {
    await getData();
  }
};

</script>

<style>
.message {
  @apply w-1/2 p-4 mb-2;
}

.me {
  @apply flex space-x-2 space-x-reverse;
}

.you {
  @apply flex flex-row-reverse space-x-2 mr-auto;
}

.me>p {
  @apply message bg-blue-300 rounded-md rounded-br-none;
}

.you>p {
  @apply message bg-gray-300 rounded-md rounded-bl-none mr-auto;
}

.me>img,
.you>img {
  @apply mt-1;
}

.me>p>span,
.you>p>span {
  @apply block text-left text-h8 opacity-70 -mb-2;
}
</style>
