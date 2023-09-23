<template>
    <div class="container py-12">

        <Head>
            <Title>تماس باما</Title>
        </Head>
        <h1 class="text-h3">تماس با کدیاد</h1>
        <div class="flex flex-wrap justify-between gap-2">
            <div class="flex card w-[35%] h-fit mt-8 md:mt-4 md:w-full">
                <div class="card-body flex flex-col gap-4">
                    <p>آدرس : {{ utilStore.siteSettings?.address }}</p>
                    <p>شماره تماس : {{utilStore.siteSettings?.phoneNumber}}</p>
                    <p>ایمیل : info@codeyad.com</p>
                </div>
            </div>
            <div class="flex card w-[60%] mt-8 md:w-full md:mt-3">
                <Form class="card-body flex flex-wrap  w-full">
                    <div class="w-1/2 p-2 sm:w-full sm:px-0">
                        <BaseInput name="fullName" label="نام و نام خانوادگی" />
                    </div>
                    <div class="w-1/2 p-2 sm:w-full sm:px-0">
                        <BaseInput name="email" label="ایمیل" type="email" />
                    </div>
                    <div class="w-1/2 p-2 sm:w-full sm:px-0">
                        <BaseInput name="phoneNumber" number label="شماره تماس" />
                    </div>
                    <div class="w-1/2 p-2 sm:w-full sm:px-0">
                        <BaseInput name="title" placeholder="موضوع پیام خود را وارد کنید" label="موضوع" />
                    </div>
                    <div class="w-full flex justify-end p-2 sm:px-0">
                        <BaseTextArea name="desc" label="متن پیام" />
                    </div>
                    <div class="w-full flex justify-end">
                        <BaseButton>ارسال پیام</BaseButton>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUtilStore } from '~/stores/util.store';

const utilStore = useUtilStore();

</script>