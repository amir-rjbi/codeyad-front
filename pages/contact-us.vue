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
                    <p>شماره تماس : {{ utilStore.siteSettings?.phoneNumber }}</p>
                    <p>ایمیل : info@codeyad.com</p>
                </div>
            </div>
            <div class="flex card w-[60%] mt-8 md:w-full md:mt-3">
                <Form @submit="sendMessage" :validation-schema="schema" v-slot="{ meta }"
                    class="card-body flex flex-wrap  w-full">
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
                        <BaseInput name="subject" placeholder="موضوع پیام خود را وارد کنید" label="موضوع" />
                    </div>
                    <div class="w-full flex justify-end p-2 sm:px-0">
                        <BaseTextArea name="message" label="متن پیام" />
                    </div>
                    <div class="w-full flex justify-end">
                        <BaseButton :loading="loading" :disabled="!meta.valid">ارسال پیام</BaseButton>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { useUtilStore } from '~/stores/util.store';
import * as Yup from 'yup'
const utilStore = useUtilStore();
const toast = useToast();
const loading = ref(false);

const schema = Yup.object().shape({
    email: Yup.string().email().required().label('ایمیل'),
    fullName: Yup.string().required().label('نام و نام خانوادگی'),
    //@ts-ignore
    phoneNumber: Yup.string().phoneNumber().required().label('شماره تلفن'),
    subject: Yup.string().required().label('موضوع'),
    message: Yup.string().required().label('متن پیام'),
})

const sendMessage = async (fmData: any, ev: any) => {
    var formData = new FormData();
    formData.append("Subject", fmData.subject);
    formData.append("FullName", fmData.fullName);
    formData.append("PhoneNumber", fmData.phoneNumber);
    formData.append("Email", fmData.email);
    formData.append("MessageBody", fmData.message);

    loading.value = true;
    var res = await FetchApi("/contactUs", {
        method: "POST",
        body: formData
    });
    if (res.isSuccess) {
        toast.showToast("پیام با موفقیت ارسال شد ، نتیجه از طریق ایمیل به شما ابلاغ می شود", ToastType.success, 7000)
        ev.resetForm();
    }
    loading.value = false;

}
</script>