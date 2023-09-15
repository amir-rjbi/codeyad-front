<template>
    <div :class="{ 'card-loading': loading }">
        <h5 class="text-blue font-bold text-2xl">فعال سازی حساب کاربری</h5>
        <p class="mt-3">کد فعال سازی به شماره {{ authStore.registerData?.phoneNumber }} ارسال شد</p>
        <Form @submit="validateCode" class="mt-5">
            <BaseStepInput v-model="code" :length="4" @completed="validateCode" />
            <div class="flex gap-4 w-full items-center mt-4 border-t-2 pt-3">
                <BaseButton type="button" @click="resendCode" :disabled="timer > 0" size="lg">ارسال مجدد کد <span
                        v-if="timer > 0"> - {{
                            convertMsToMinutesSeconds(timer)
                        }}</span></BaseButton>
                <base-button :disabled="code.length < 4" :loading="loading" size="lg" color="green" class="flex-grow">فعال
                    سازی و ورود</base-button>
            </div>
        </Form>
    </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { useAuthStore } from '~~/stores/auth.store';


const authStore = useAuthStore();
const loading = ref(false);
const toast = useToast();
const timer = ref(120000);
import { Login, RegisterUser, ValidateLoginSmsCode } from '~/services/auth.service';
var interval = null;

onMounted(() => {
    interval = setInterval(() => {
        if (timer.value == 0) {
            return
        }
        timer.value -= 1000;
    }, 1000)
});
onUnmounted(() => {
    try {
        clearInterval(interval!);
    } catch {

    }
})
const code = ref('')
const resendCode = async () => {
    loading.value = true;

    var res = await RegisterUser(authStore.registerData!);
    if (res.isSuccess) {
        timer.value = 120000;
        toast.showToast("کد جدید برای شما ارسال شد");
        code.value = ""
    }
    loading.value = false;
}
const validateCode = async () => {
    if (authStore.registerData == null) {
        toast.showToast('لطفا اطلاعات ثبت نامی خود را تکمیل کنید', ToastType.warning)
        authStore.changeStep('register');
        return;
    }
    var registerData = authStore.registerData!;
    loading.value = true;
    var res = await ValidateLoginSmsCode(registerData.phoneNumber, code.value)
    if (res.isSuccess) {
        authStore.setToken(res.data!);
        authStore.isOpenModal = false;
        toast.showToast("ورود با موفقیت انجام شد")
    }
    loading.value = false;

}

</script>