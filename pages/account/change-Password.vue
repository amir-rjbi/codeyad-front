<template>
    <Form :validation-schema="schema" v-slot="{ meta }" @submit="edit">
        <base-card>
            <template #header>
                <h5>تغییر کلمه عبور</h5>
            </template>
            <div class="flex  flex-wrap">
                <div class="p-2 w-full sm:px-0">
                    <BaseInputPassword label="کلمه عبور فعلی" name="currentPassword" out-line />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInputPassword label="کلمه عبور جدید" name="newPassword" out-line />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInputPassword label="تکرار کلمه عبور " name="rePassword" out-line />
                </div>

            </div>
            <template #actions>
                <base-button type="submit" :disabled="!meta.valid">ثبت اطلاعات</base-button>
            </template>
        </base-card>
    </Form>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import * as Yup from 'yup'
const schema = Yup.object().shape({
    currentPassword: Yup.string().required().label('کلمه عبور فعلی'),
    newPassword: Yup.string().required().min(5).label('کلمه عبور جدید'),
    //@ts-ignore
    rePassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'کلمه های عبور یکسان نیستند')
        .required().label('تکرار کلمه عبور'),
});
definePageMeta({
    layout: 'account'
});


const edit = () => {

}
</script>