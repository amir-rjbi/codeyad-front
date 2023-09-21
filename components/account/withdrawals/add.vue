
<template>
    <Form v-slot="{ errors }" :validation-schema="schema" @submit="addData"
        :class="['flex flex-wrap', { 'card-loading': loading }]">
        <base-alert class=" px-2 w-full mb-4">
            <p>موجودی کیف پول شما : {{ accountStore.currentUser?.walletAmount?.toLocaleString() }} تومان</p>
        </base-alert>
        <div class="w-1/2 pb-5 px-2 sm:w-full">
            <BaseSplitNumberInput required label="مبلغ به تومان" name="price" :outLine="true" v-model="data.price" />
            <small v-if="data.price != ''">{{ numberToWords(Number(data.price)) }} تومان </small>
        </div>
        <div class="w-1/2  pb-5 px-2 sm:w-full">
            <BaseInput number required label="مبلغ به دلار" name="theterPrice" :outLine="true" v-model="data.tetherPrice" />
        </div>
        <div class="w-full px-2 ">
            <BaseSelectBox required out-line label="کارت بانکی" v-model="data.cardId" name="card">
                <option selected value="0">انتخاب کارت بانکی کنید</option>
                <option v-for="item in cards" :value="item.id">{{ SplitCardNumber(item.cardNumber) }}</option>
            </BaseSelectBox>
        </div>

        <div class="justify-end flex w-full px-2 mt-4">
            <BaseButton :loading="loading">ثبت درخواست</BaseButton>
        </div>
    </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { numberToWords } from "@persian-tools/persian-tools";
import { GetUserCards } from "~/services/userCards.service";
import { Card } from "~/models/account/card";
import { CreateWithdrawalRequest } from "~/services/Withdrawal.service";
import { useAccountStore } from "~/stores/account.store";


const cards: Ref<Card[]> = ref([]);
const loading = ref(false);
const toast = useToast();
const emit = defineEmits(['closeModal', 'closeAndRefresh']);
const accountStore = useAccountStore();

const data = reactive({
    price: "",
    tetherPrice: "0",
    cardId: "0"
});
const schema = Yup.object().shape({
    price: Yup.string()
        .required().label('مبلغ')
        .min(6, "مبلغ باید بیشتر از 99 هزار تومان باشد"),
    card: Yup.string().required().min(1, "کارت بانکی نامعتبر است").label('کارت بانکی')
});
onMounted(async () => {
    loading.value = true;
    var res = await GetUserCards();
    if (res.isSuccess && res.data!.length > 0) {
        cards.value = res.data ?? [];
    } else {
        toast.showToast('برای ثبت درخواست برداشت از حساب باید اول یک کارت بانکی فعال داشته باشید', ToastType.error, 10000)
        emit('closeModal');
    }
    loading.value = false;

})
const addData = async () => {
    if (Number(data.price) > (accountStore.currentUser?.walletAmount ?? 0)) {
        toast.showToast('مبلغ درخواستی بیشتر از مقدار کیف پول است', ToastType.error)
        return;
    }
    loading.value = true;
    var res = await CreateWithdrawalRequest(Number(data.price), Number(data.cardId), Number(data.tetherPrice));
    if (res.isSuccess) {
        toast.showToast('درخواست برداشت از حساب با موفقیت ثبت شد');
        emit('closeAndRefresh');
    }
    loading.value = false;
};
</script>
  