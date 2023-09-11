<template>
    <Form :validation-schema="schema" v-slot="{ meta }" @submit="edit">
        <base-card :loading="loading">
            <template #header>
                <h5>ویرایش اطلاعات</h5>
            </template>
            <div class="flex  flex-wrap">
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput placeholder="نام خود را وارد کنید" out-line name="name" label="نام" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput placeholder="نام خانوادگی خود را وارد کنید" out-line name="family" label="نام خانوادگی" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput out-line name="phoneNumber" number label="شماره تلفن" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput out-line name="email" type="email" label="ایمیل" />
                </div>
                <div class="w-full p-2 sm:px-0">
                    <BaseHtmlEditor name="aboutme" placeholder="درباره من" v-model="aboutMe" id="aboutme" />
                </div>
            </div>
            <template #actions>
                <base-button @click="loading = !loading" type="submit" :loading="loading" :disabled="!meta.valid">ثبت
                    اطلاعات</base-button>
            </template>
        </base-card>
    </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from 'yup'

const loading = ref(false);
const schema = Yup.object().shape({
    name: Yup.string().required().label('نام'),
    family: Yup.string().required().label('نام خانوادگی'),
    //@ts-ignore
    phoneNumber: Yup.string().phoneNumber().required().label('شماره تماس'),
    email: Yup.string().required().email().label('ایمیل'),
})
const aboutMe = ref('');
definePageMeta({
    layout: 'account'
});


const edit = () => {

}
</script>