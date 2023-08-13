<template>
    <base-card>
        <template #header>
            <h5>ویرایش اطلاعات</h5>
        </template>
        <Form class="flex  flex-wrap">
            <div class="w-1/2 p-2 sm:w-full">
                <BaseInput name="name" label="نام" />
            </div>
            <div class="w-1/2 p-2 sm:w-full">
                <BaseInput name="family" label="نام خانوادگی" />
            </div>
            <div class="w-1/2 p-2 sm:w-full">
                <BaseInput name="phoneNumber" number label="شماره تلفن" />
            </div>
            <div class="w-1/2 p-2 sm:w-full">
                <BaseInput name="email" type="email" label="ایمیل" />
            </div>
        </Form>
        <template #actions>
            <base-button>ثبت اطلاعات</base-button>
        </template>
    </base-card>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";

definePageMeta({
    layout: 'account'
});
</script>