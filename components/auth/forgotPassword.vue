<template>
    <div :class="{ 'card-loading': loading }">
        <Transition name="page" mode="out-in">
            <div v-if="step == 1">
                <h5 class="text-blue font-bold text-2xl mb-4">فراموشی رمز</h5>
                <p>لطفا شماره مویابل خود را واردکنید تا برای شما رمز ارسال شود.</p>
                <Form :validation-schema="schema" @submit="sendCode" class="mt-10">
                    <base-input v-model="phoneNumber" name="phoneNumber" number label="شماره همراه"
                        placeholder="093511100156" />
                    <base-button :loading="loading" class="w-full mt-9" size="lg">بازیابی کلمه عبور</base-button>
                </Form>
                <base-line-text class="text-xl my-8">
                    یا
                </base-line-text>
                <base-button class="w-full mt-9 font-bold" disabled size="lg" outline>
                    لینک ورود را برایم ایمیل کن
                </base-button>
                <div class="flex gap-4 items-center justify-center mt-6">
                    <p class="m-0">قبلا ثبت نام کرده اید؟</p>
                    <button @click="authStore.changeStep('login')" class="text-blue font-bold">ورود به حساب</button>
                </div>
            </div>
            <div v-else>
                <h5 class="text-blue font-bold text-2xl">تغییر کلمه عبور</h5>
                <p class="mt-3">کد تایید به شماره {{ phoneNumber }} ارسال شد</p>

                <Form :validation-schema="passwordSchema" @submit="validateCode" class="mt-5">
                    <BaseStepInput v-model="code" :length="4" />
                    <hr class="my-4" />
                    <i>برای تغییر رمز عبور ، کدتایید سازی و رمز عبور جدید خود را وارد کنید</i>
                    <base-input-password name="password" placeholder="*******" class="mt-4 mb-2" label="رمز عبور" />
                    <base-input-password name="rePassword" placeholder="*******" class="mt-4 mb-2" label="تکرار رمز عبور" />
                    <div class="flex gap-4 w-full items-center mt-4 border-t-2 pt-3">
                        <BaseButton type="button" @click="sendCode" :disabled="timer > 0" size="lg">ارسال مجدد کد <span
                                v-if="timer > 0"> - {{
                                    convertMsToMinutesSeconds(timer)
                                }}</span></BaseButton>
                        <base-button :disabled="code.length < 4" :loading="loading" size="lg" color="green"
                            class="flex-grow">تغییر کلمه عبور</base-button>
                    </div>
                </Form>
                <base-line-text class="text-xl my-8">
                    یا
                </base-line-text>
                <div class="flex gap-4 items-center justify-center mt-6">
                    <BaseButton outline size="lg" @click="authStore.changeStep('login')" class="font-bold w-full">ورود به
                        حساب
                    </BaseButton>
                </div>
            </div>

        </Transition>
    </div>
</template>
<script setup lang="ts">
import { Form } from 'vee-validate';
import { useAuthStore } from '~~/stores/auth.store';
import * as Yup from 'yup'
import { RecoveryUserPassword, ResetUserPassword } from '~/services/auth.service';

const phoneNumber = ref('');
const step = ref(1);
const authStore = useAuthStore();
const code = ref('');
const timer = ref(120000);
const loading = ref(false);
var interval = null;
const toast = useToast();

const passwordSchema = Yup.object().shape({
    password: Yup.string().min(4).label('کلمه عبور'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'کلمه های عبور یکسان نیستند').label('تکرار کلمه عبور')
})
const schema = Yup.object().shape({
    //@ts-ignore
    phoneNumber: Yup.string().phoneNumber().label('شماره تلفن'),
})

const validateCode = async (formData: any, ev: any) => {
    if (code.value.length != 4) {
        toast.showToast('کد تایید را وارد کنید', ToastType.warning);
        return;
    }
    loading.value = true;
    var res = await ResetUserPassword(phoneNumber.value, formData.password, code.value);
    if (res.isSuccess) {
        authStore.changeStep('login');
        toast.showToast('رمزعبور شما با موفقیت تغییر کرد')
    }
    loading.value = false;

}
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
});
const sendCode = async () => {
    loading.value = true;
    var res = await RecoveryUserPassword(phoneNumber.value);
    if (res.isSuccess) {
        timer.value = 120000;
        code.value = ""
        if (step.value == 1) {
            step.value = 2;
        }
        toast.showToast("کد تایید برای شما ارسال شد")
    }
    loading.value = false;
}
</script>