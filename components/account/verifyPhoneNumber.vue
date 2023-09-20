<template>
    <div>
        <BaseAlert :alert-type="'error'" class="my-2"
            v-if="accountStore.currentUser?.phoneNumber && accountStore.currentUser?.isVerifyPhoneNumber == false">
            <div class="flex justify-between w-full items-center">
                کاربر عزیز لطفا شماره تلفن همراه خود را تایید کنید
                <BaseButton class="min-w-max" @click="verifyPhoneNumber" :color-white="true">تایید شماره</BaseButton>
            </div>
        </BaseAlert>
        <BaseModal :show-header="false" v-model="isOpenVerifyModal" title="تایید شماره تلفن" :hide-close-btn="true">
            <div :class="{ 'card-loading': loading }">
                <h5 class="text-blue font-bold text-2xl">تایید شماره تلفن حساب کاربری</h5>
                <p class="mt-3">کد فعال سازی به شماره {{ accountStore.currentUser?.phoneNumber }} ارسال شد</p>
                <Form @submit="validateCode" class="mt-5">
                    <BaseStepInput v-model="code" :length="4" @completed="validateCode" />
                    <div class="flex gap-4 w-full items-center mt-4 border-t-2 pt-3">
                        <BaseButton type="button" @click="verifyPhoneNumber" :disabled="timer > 0" size="lg">ارسال مجدد کد
                            <span v-if="timer > 0"> - {{
                                convertMsToMinutesSeconds(timer)
                            }}</span>
                        </BaseButton>
                        <base-button :disabled="code.length < 4" :loading="loading" size="lg" color="green"
                            class="flex-grow">تایید شماره تلفن</base-button>
                    </div>
                </Form>
            </div>
        </BaseModal>
    </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { SendVerifyPhoneNumber, VerifyUserPhoneNumber } from '~/services/account.service';
import { useAccountStore } from '~/stores/account.store';

const toast = useToast();
const accountStore = useAccountStore();
const isOpenVerifyModal = ref(false);
const loading = ref(false);
const timer = ref(120000);
var interval = null;
const code = ref('');

const verifyPhoneNumber = async () => {
    isOpenVerifyModal.value = true;
    loading.value = true;
    var res = await SendVerifyPhoneNumber();
    if (res.isSuccess) {
        toast.showToast("کد تایید برای شما ارسال شد");
        interval = setInterval(() => {
            if (timer.value == 0) {
                return
            }
            timer.value -= 1000;
        }, 1000)
    } else {
        isOpenVerifyModal.value = false;
    }
    loading.value = false;
}
onUnmounted(() => {
    clearTimerInterval()
})
const clearTimerInterval = () => {
    try {
        clearInterval(interval!);
    } catch {

    }
}
const validateCode = async () => {
    loading.value = true;
    var res = await VerifyUserPhoneNumber(code.value);
    if (res.isSuccess) {
        toast.showToast("تبریک! شماره تلفن شما با موفقیت تایید شد");
        isOpenVerifyModal.value = false;
        accountStore.currentUser!.isVerifyPhoneNumber = true;
        clearTimerInterval()
    }
    loading.value = false;
}
</script>