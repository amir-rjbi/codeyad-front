<template>
  <Form :validation-schema="schema" @submit="AddToWallet" :class="['flex flex-wrap', { 'card-loading': loading }]">
    <div class="w-full">
      <BaseSplitNumberInput required placeholder="مبلغ مورد نظر (تومان)" out-line v-model="price" name="price" label="مبلغ" />
      <small v-if="price.length>3">{{ numberToWords(price) }} تومان</small>
    </div>

    <div class="justify-end flex w-full mt-2">
      <BaseButton :loading="loading" color="green">شارژ کیف پول</BaseButton>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { numberToWords } from "@persian-tools/persian-tools";
import { Form } from "vee-validate";
import * as Yup from "yup";
import { CreateTransaction } from "~/services/transaction.service";
import { TransactionFor } from "~/models/transaction/TransactionFor";

const loading = ref(false);

const price = ref('');
const schema = Yup.object().shape({
  price: Yup.number()
    .typeError("حتما باید عددی را وارد کنید !")
    .required()
    .min(1000, 'مبلغ باید بیشتر از 1,000 تومان باشد'),
});
const AddToWallet = async (formData: any, ev: any) => {
  loading.value = true;
  var res = await CreateTransaction(TransactionFor.wallet, formData.price, 0, "", `${CurrentDomainUrl}/account/wallet?op=success`);
  if (res.isSuccess) {
    document.location.replace(res.data ?? '/');
  } else {
    loading.value = false;
  }

};
</script>
