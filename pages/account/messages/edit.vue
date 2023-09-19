<template>
  <main class="p-4">
    <div class="flex items-center space-x-4 space-x-reverse">
      <strong>موضوع گفتگو:</strong>
      <span v-if="messages != null">{{messages.subject}}</span>
    </div>
    <div ref="chatArea" class="bg-blue-200 border border-black rounded-lg p-5 mt-4 max-h-[70vh] overflow-y-auto"
         v-if="messages != null">
      <ul v-if="messages.messageContents.length > 0">
        <li v-for="message in messages.messageContents"
            :class="[`${message.senderUser.id === userId ? 'me' : 'you'}`]">
          <base-img :src="GetUserAvatar(message.senderUser.imageName)"
                    class="w-[30px] h-[30px]  rounded" width="60px" alt="mohammad" />
          <p>
            <p v-html="message.text"></p>
            <span>
              {{getTwoDigits(new Date(message.createDate).toLocaleTimeString('fa-IR'))}}
              -
              {{new Date(message.createDate).toLocaleDateString('fa-IR')}}
            </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="rounded-md bg-blue-300 p-4 mt-4">
      <Form @submit.prevent="sendMessage" class="flex items-center space-x-4 space-x-reverse">
        <base-input class="flex-1" required v-model="userMessage" name="userMessage" placeholder="پیام خود را وارد کنید" multiline/>
        <base-button size="sm" type="submit">
          <svg aria-hidden="true" class="w-6 h-6 -rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
        </base-button>
      </Form>
    </div>
  </main>
</template>

<script setup lang="ts">

import {UserMessageData} from "~/models/account/UserMessage";
import {getUserMessage} from "~/services/userMessages.service";
import {useAccountStore} from "~/stores/account.store";
import { GetUserAvatar } from '~/utils/imageUtil';
import {SendMessage} from "~/services/userMessages.service";

definePageMeta({
  layout: "account",
});

const userMessage = ref("");
const chatArea = ref();
const messages = ref<UserMessageData>();
const route = useRoute();
const router = useRouter();
const messageId = ref(route.query?.messageId ?? null);

const accountStore = useAccountStore();
const userId = accountStore.currentUser?.id;

onMounted(async ()=>{
  await getData();
  setTimeout(()=>{
    chatArea.value.scrollTo({left:0, top:chatArea.value.scrollHeight,behavior: "smooth" });
  },200)
})

const getData = async ()=>{
  if(messageId.value === null) router.push("error");

  const fetchResult= await getUserMessage(messageId.value);
  if((fetchResult).isSuccess){
    messages.value = fetchResult.data;
  }
  else router.push("error");

}

const sendMessage = async () => {
  if (!userMessage.value) {
    return;
  }
  const sendResult = await SendMessage(messageId.value,userMessage.value);
  if(sendResult.isSuccess){
    await getData();
  }
  else alert('اسال پیام با خطا مواجه شد');
};

const getTwoDigits = (num)=>{
  return  (num < 10 ? '0' : '') + num;
}
</script>

<style>
.message {
  @apply w-1/2 p-4 mb-2;
}

.me {
  @apply flex space-x-2 space-x-reverse;
}
.you{
  @apply flex flex-row-reverse space-x-2 mr-auto;
}
.me > p {
  @apply message bg-blue-300 rounded-md rounded-br-none;
}
.you > p{
  @apply message bg-gray-300 rounded-md rounded-bl-none mr-auto;
}
.me > img,.you > img {
  @apply mt-1;
}
.me > p > span,.you > p > span{
  @apply block text-left text-h8 opacity-70 -mb-2;
}

</style>
