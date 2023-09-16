<template>
  <Form v-slot="{ errors }" :validation-schema="schema" @submit="AddToWallet" class="flex flex-wrap">
    <div class="w-1/2 pl-5 pb-5">
      <BaseInput required placeholder="####-####-####-####" out-line name="card" label="شماره کارت :" />
    </div>
    <div class="w-1/2">
      <BaseInput required placeholder="شماره حساب" out-line name="hesab" label="شماره حساب" />
    </div>
    <div class="w-1/2 pl-5 pb-5">
      <BaseInput required placeholder="مثال: بانک صادرات" out-line name="bank" label="نام بانک:" />
    </div>
    <div class="w-1/2">
      <BaseInput required placeholder=" نام و نام خانوادگی صاحب حساب" out-line name="creator" label="نام صاحب حساب :" />
    </div>
    <div class="w-full pb-5">
      <BaseInput required placeholder="   شماره شبا بدون در نظر گرفتن IR" out-line name="shaba" label="شماره شبا :" />
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


const data = reactive({
  card: "",
  hesab: "",
  bank: "",
  creator: "",
  shaba: "",
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
const AddToWallet = () => { };
</script>
