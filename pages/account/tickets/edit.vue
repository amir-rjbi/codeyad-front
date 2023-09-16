<template>
  <div class="bg-blue-300 pt-5">
    <main id="app">
      <section ref="chatArea" class="chat-area">
        <p
          v-for="message in messages"
          class="message"
          :class="{
            'message-out': message.author === 'you',
            'message-in': message.author !== 'you',
          }"
        >
          {{ message.body }}
        </p>
      </section>

      <section class="chat-inputs">
        <form @submit.prevent="sendMessage('in')" id="person1-form">
          <label for="person1-input">mohammad</label>
          <input v-model="bobMessage" id="person1-input" type="text" />
          <BaseButton type="submit">Send</BaseButton>
        </form>

        <form @submit.prevent="sendMessage('out')" id="person2-form">
          <label for="person2-input">amir</label>
          <input v-model="youMessage" id="person2-input" type="text" />
          <BaseButton type="submit">Send</BaseButton>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "account",
});
const bobMessage = ref("");
const youMessage = ref("");
const messages = reactive([
  {
    body: "سلام امیر",
    author: "bob",
  },
  {
    body: "سلام محمد",
    author: "you",
  },
  {
    body: "چخبر؟؟",
    author: "bob",
  },
]);

const sendMessage = (direction) => {
  if (!youMessage.value && !bobMessage.value) {
    return;
  }
  if (direction === "out") {
    messages.push({ body: youMessage.value, author: "you" });
    youMessage.value = "";
  } else if (direction === "in") {
    messages.push({ body: bobMessage.value, author: "bob" });
    bobMessage.value = "";
  } else {
    alert("something went wrong");
  }
  //   nextTick(() => {
  //     let messageDisplay = this.$refs.chatArea;
  //     messageDisplay.scrollTop = messageDisplay.scrollHeight;
  //   });
};
</script>

<style>
.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  border: 9px solid #ccc;
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 450px;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  margin-bottom: 0.5em;
  font-size: 0.8em;
}
.message-out {
  background: #407fff;
  color: white;
  margin-right: 222px;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-evenly;
}
#person1-input {
  padding: 5px;
  margin: 5px;
}
#person2-input {
  padding: 5px;
  margin: 5px;
}
</style>
