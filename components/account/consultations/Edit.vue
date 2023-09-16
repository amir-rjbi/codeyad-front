<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="AddToWallet"
    class="flex flex-wrap"
  >
    <div class="w-full">
      <BaseInput
        placeholder="0"
        out-line
        name="title"
        label="تعداد مشاوره در ماه"
      />
    </div>

    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت درخواست </BaseButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "vee-validate";
import * as Yup from "yup";

const data = reactive({
  title: "",
});
const schema = Yup.object().shape({
  title: Yup.number()
    .typeError("حتما باید عدد وارد کنید !")
    .required()
    .min(1, "بیشتر از یک عدد باشد"),
});
const AddToWallet = () => {};
</script>
