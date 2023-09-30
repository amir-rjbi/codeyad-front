<template>
    <Form :validation-schema="schema" v-slot="{ meta }" @submit="register">
        <base-card :loading="loading">
            <template #header>
                <h5>ثبت درخواست برای مدرس شدن در کدیاد</h5>
            </template>
            <div class="flex flex-wrap">
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.userName" required placeholder="یک نام کاربری انگلیسی برای حساب خود وارد کنید"
                        out-line name="userName" label="نام کاربری" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInputFile v-model="data.cvImage" accept=".pdf" required out-line name="cvImage"
                        label="رزومه : پسوند مجاز .pdf" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.nationalCode" required placeholder="کد ملی خود را وارد کنید" out-line
                        name="nationalCode" label="کد ملی" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.fieldActivity" required placeholder="عناوین خود را با - از هم جدا کنید"
                        out-line name="fieldActivity" label="عنوان فعالیت" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.instagram" type="url" out-line name="instagram" label="اینستاگرام" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.linkeDin" type="url" out-line name="linkeDin" label="لینکدین" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.faceBook" type="url" out-line name="faceBook" label="فیسبوک" />
                </div>
                <div class="w-1/2 p-2 sm:w-full sm:px-0">
                    <BaseInput v-model="data.twitter" type="url" out-line name="twitter" label="توییتر" />
                </div>
            </div>
            <template #actions>
                <base-button type="submit" :loading="loading" :disabled="!meta.valid">ثبت
                    درخواست</base-button>
            </template>
        </base-card>
    </Form>
</template>
  
<script setup lang="ts">
//@ts-ignore
import kebabCase from "lodash/kebabCase"
import { Form } from "vee-validate";
import * as Yup from "yup";
import { IsAccessRegisterTeacherPage, RegisterTeacherRequest } from "~/services/account.service";
import { useAccountStore } from '~/stores/account.store';

const router = useRouter();
const toast = useToast();
const accountStore = useAccountStore();
const data = reactive({
    userName: "",
    nationalCode: "",
    instagram: "",
    linkeDin: "",
    faceBook: "",
    twitter: "",
    fieldActivity: "",
    cvImage: null,

});
const loading = ref(false);
const schema = Yup.object().shape({
    //@ts-ignore
    userName: Yup.string().slug().required().label("نام کاربری"),
    nationalCode: Yup.string()
        //@ts-ignore
        .nationalCode().required().label("کدملی"),
    fieldActivity: Yup.string().required().label("عنوان فعالیت"),
    cvImage: Yup.mixed().required().label("رزومه"),
    instagram: Yup.string().url().label("اینستاگرام"),
    linkeDin: Yup.string().url().label("لینکدین"),
    faceBook: Yup.string().url().label("فیسبوک"),
    twitter: Yup.string().url().label("توییتر"),
});
definePageMeta({
    layout: "account",
});
onMounted(async () => {
    if (accountStore.currentUser?.isCompleteProfile == false) {
        toast.showToast('لطفا حساب کاربری خود را تکمیل کنید ', ToastType.warning)
        setTimeout(() => {
            router.push('/account');
        }, 100);
        return;
    }
    if (accountStore.currentUser?.isVerifyPhoneNumber == false) {
        toast.showToast('لطفا شماره تلفن خود را تایید کنید ', ToastType.warning)
        setTimeout(() => {
            router.push('/account');
        }, 100);
        return;
    }
    loading.value = true;
    var res = await IsAccessRegisterTeacherPage()
    if (res.isSuccess == false) {
        router.push('/account');
    }
    loading.value = false;

})
const register = async () => {
    data.userName = kebabCase(data.userName);
    var formData = new FormData();
    if (!data.cvImage) {
        return;
    }
    formData.append('CvImage', data.cvImage);
    formData.append('NationalCode', data.nationalCode);
    formData.append('SocialNetworks.Instagram', data.instagram);
    formData.append('SocialNetworks.LinkeDin', data.linkeDin);
    formData.append('SocialNetworks.FaceBook', data.faceBook);
    formData.append('SocialNetworks.Twitter', data.twitter);
    formData.append('IsAcceptRules', 'true');
    formData.append('UserName', data.userName);
    formData.append('FieldActivity', data.fieldActivity);

    loading.value = true;
    var res = await RegisterTeacherRequest(formData);
    if (res.isSuccess) {
        toast.showToast("درخواست شما با موفقیت ثبت شد ، نتیجه درخواست از طریق اعلانات سایت به شما ابلاغ میشود", ToastType.success, 10000)
        router.push('/account');
    }
    loading.value = false;
}

</script>
<style  lang="scss"></style>
  