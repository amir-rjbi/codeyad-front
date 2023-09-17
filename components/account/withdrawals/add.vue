
<template>
    <Form v-slot="{ errors }" :validation-schema="schema" @submit="addData" class="flex flex-wrap">
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
            </BaseSelectBox>
        </div>

        <div class="justify-end flex w-full px-2 mt-4">
            <BaseButton>ثبت درخواست</BaseButton>
        </div>
    </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from "yup";
import { numberToWords } from "@persian-tools/persian-tools";



const data = reactive({
    price: "",
    tetherPrice: "0",
    cardId: "0"
});
const schema = Yup.object().shape({
    price: Yup.string()
        .required().label('مبلغ'),
    cardId: Yup.string().required().min(1,"کارت بانکی نامعتبر است").label('کارت بانکی')
});
const addData = () => {

};
</script>
  