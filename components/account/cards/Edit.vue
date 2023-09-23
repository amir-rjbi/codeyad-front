<template>
    <Form v-slot="{ meta }" :validation-schema="schema" @submit="edit"
        :class="['flex flex-wrap', { 'card-loading': loading }]">
        <div class="w-1/2 pl-5 pb-5">
            <BaseSplitNumberInput card-number required out-line placeholder="شماره کارت خود را وارد کنید" name="card"
                label="شماره کارت :" v-model="data.card" />
        </div>
        <div class="w-1/2">
            <BaseInput required placeholder="شماره حساب" out-line name="accountNumber" label="شماره حساب"
                v-model="data.accountNumber" />
        </div>
        <div class="w-1/2 pl-5 pb-5">
            <BaseInput required placeholder="مثال: بانک صادرات" out-line name="bank" label="نام بانک:"
                v-model="data.bank" />
        </div>
        <div class="w-1/2">
            <BaseInput required placeholder=" نام و نام خانوادگی صاحب حساب" out-line name="owner" label="نام صاحب حساب :"
                v-model="data.owner" />
        </div>
        <div class="w-full pb-5">
            <BaseInput required placeholder="   شماره شبا بدون در نظر گرفتن IR" out-line name="shaba" label="شماره شبا :"
                v-model="data.shaba" />
        </div>

        <div class="justify-end flex w-full mt-2">
            <BaseButton :loading="loading" :disabled="!meta.valid">ثبت اطلاعات </BaseButton>
        </div>
    </Form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Form } from "vee-validate";
import * as Yup from "yup";
import { EditCard } from "../../../services/userCards.service";
import { Card } from "~/models/account/card";

const toast = useToast();
const loading = ref(false);

const props = defineProps<{
    cardData: Card
}>();
const data = reactive({
    card: props.cardData.cardNumber,
    shaba: props.cardData.shabahNumber,
    owner: props.cardData.ownerName,
    accountNumber: props.cardData.accountNumber,
    bank: props.cardData.bankName,
});
const emit = defineEmits(['closeModal'])
const schema = Yup.object().shape({
    card: Yup.string()
        .required()
        //@ts-ignore
        .cardNumber().label('شماره کارت'),
    accountNumber: Yup.number().typeError("  شماره حساب را وارد کنید ").required(),
    bank: Yup.string().required().label(" نام بانک "),
    owner: Yup.string().required().label(" نام و نام خانوادگی صاحب حساب "),
    shaba: Yup.number().typeError("شماره شبا  را وارد کنید ").required(),
});
const edit = async () => {
    var formData = new FormData();
    formData.append("CardId", props.cardData.id.toString());
    formData.append("CardNumber", data.card);
    formData.append("ShabahNumber", data.shaba);
    formData.append("OwnerName", data.owner);
    formData.append("AccountNumber", data.accountNumber);
    formData.append("BankName", data.bank);
    loading.value = true;
    var res = await EditCard(formData);
    if (res.isSuccess) {
        toast.showToast('عملیات با موفقیت انجام شد');
        emit('closeModal');
    }
    loading.value = false;

};
</script>
  