<template>
  <Form
    v-slot="{ errors }"
    :validation-schema="schema"
    @submit="AddToWallet"
    class="flex flex-wrap"
  >
    <div class="w-1/2 pl-5 pb-5">
      <BaseInput
        required
        placeholder="####-####-####-####"
        out-line
        name="card"
        label="شماره کارت :"
        v-model="data.card"
      />
    </div>
    <div class="w-1/2">
      <BaseInput
        required
        placeholder="شماره حساب"
        out-line
        name="hesab"
        label="شماره حساب"
        v-model="data.hesab"
      />
    </div>
    <div class="w-1/2 pl-5 pb-5">
      <BaseInput
        required
        placeholder="مثال: بانک صادرات"
        out-line
        name="bank"
        label="نام بانک:"
        v-model="data.bank"
      />
    </div>
    <div class="w-1/2">
      <BaseInput
        required
        placeholder=" نام و نام خانوادگی صاحب حساب"
        out-line
        name="creator"
        label="نام صاحب حساب :"
        v-model="data.creator"
      />
    </div>
    <div class="w-full pb-5">
      <BaseInput
        required
        placeholder="   شماره شبا بدون در نظر گرفتن IR"
        out-line
        name="shaba"
        label="شماره شبا :"
        v-model="data.shaba"
      />
    </div>

    <div class="justify-end flex w-full mt-2">
      <BaseButton color="green">ثبت اطلاعات </BaseButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "vee-validate";
import * as Yup from "yup";
import { AddCard } from "../../../services/userCards.service";

const data = reactive({
  card: "",
  shaba: "",
  creator: "",
  hesab: "",
  bank: "",
});
const schema = Yup.object().shape({
  card: Yup.number()
    .typeError("شماره کارت را وارد کنید ")
    .required()
    .min(16, "باید 16 رقم باشد"),
  hesab: Yup.number().typeError("  شماره حساب را وارد کنید ").required(),
  bank: Yup.string().required().label(" نام بانک "),
  creator: Yup.string().required().label(" نام و نام خانوادگی صاحب حساب "),
  shaba: Yup.number().typeError("شماره شبا  را وارد کنید ").required(),
});
const AddToWallet = async () => {
  var formData = new FormData();
  formData.append("CardNumber", data.card);
  formData.append("ShabahNumber", data.shaba);
  formData.append("OwnerName", data.creator);
  formData.append("AccountNumber", data.hesab);
  formData.append("BankName", data.bank);
  var res = await AddCard(formData);
};
</script>
