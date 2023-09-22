<template>
    <div class="container py-12 sm:pt-5">

        <Head>
            <Title>سبد خرید</Title>
        </Head>
        <BaseAlert alert-type="warning" class="mb-4" v-if="data?.data?.wallet">
            <h5>{{ data?.data?.wallet.title }}</h5>
            <p>{{ data?.data?.wallet.description }}</p>
        </BaseAlert>
        <h1 class="mb-4 text-h3">سبد خرید شما</h1>
        <div class="flex gap-4 flex-wrap justify-between mt-5">
            <div class=" sm:bg-transparent flex-grow flex gap-2 flex-col h-fit">
                <template v-if="pending">
                    <BaseSkeletonLoaidng width="100%" height="50px" v-for="item in [1, 2, 3]" :key="item"
                        class="!rounded-md" />
                </template>
                <template v-else-if="data?.data?.courseOrder.orderDetails?.length ?? 0 > 0">
                    <div class="item sm:justify-center  bg-white flex sm:gap-3 sm:flex-wrap justify-between items-center shadow border rounded-md p-3 w-full"
                        v-for="item in data?.data?.courseOrder.orderDetails">
                        <div class="flex gap-2 items-center sm:flex-wrap">
                            <NuxtLink :to="`/course/${item.courseSlug}`" class="text-blue">{{ item.courseTitle }}</NuxtLink>
                        </div>
                        <div class="flex gap-2 items-center">
                            <p>{{ item.price.toLocaleString() }} تومان</p>
                            <BaseButton @click="openDeletePopup(item.id)" size="sm" color="red">حذف</BaseButton>
                        </div>
                    </div>
                </template>
                <p v-else class="text-center text-h6 p-2 bg-orange shadow rounded text-white">
                    سبد خرید شما خالی است
                </p>
            </div>
            <div class="card p-4 w-[30%] flex gap-2 flex-col md:w-[60%] md:m-auto sm:!w-full" v-if="pending">
                <BaseSkeletonLoaidng />
                <BaseSkeletonLoaidng class="mt-4" type="three-line" />
            </div>
            <template v-else>
                <div class="card p-4 w-[40%] flex gap-2 flex-col md:w-[60%] md:m-auto sm:!w-full"
                    v-if="(data?.data?.courseOrder.totalPrice ?? 0) > 0">
                    <p>آدرس کیف پول : {{ data?.data?.wallet.wallet }}</p>
                    <BaseImg :src="GetWalletQRcodeImage(data?.data?.wallet.walletQRCodeImage ?? '')"
                        style="height: 250px;object-fit: contain;" alt="wallet" />
                    <hr />
                    <p><span>مبلغ کل</span> :{{ data?.data?.courseOrder.price.toLocaleString() }} تومان </p>
                    <p><span>تخفیف</span> : {{ data?.data?.courseOrder.discount.toLocaleString() }} تومان</p>
                    <p><span>قابل پرداخت </span> : {{ data?.data?.courseOrder.totalPrice.toLocaleString() }} تومان</p>
                    <p><span>قابل پرداخت ارزی (تتر) </span> : <label dir="ltr">{{ data?.data?.orderPriceWithTether
                    }}</label></p>
                    <hr />
                    <Form @submit="createRequest">
                        <BaseInput name="txtId" v-model="txtId" label="کد پیگیری (TxID)" required out-line
                            placeholder="کد پیگیری پرداخت خود را وارد کنید" />
                        <BaseButton :loading="payLoading" :disabled="txtId.length < 5" class="w-full mt-2" color="green">ثبت
                            درخواست</BaseButton>
                    </Form>
                </div>
            </template>
        </div>
        <BaseConfirmPopup v-model="isOpenDeletePoup" :confirm-function="deleteItem" />
    </div>
</template>
<script setup lang="ts">
import { Form } from "vee-validate";
import { useAccountStore } from "~/stores/account.store";
import { useAuthStore } from "~/stores/auth.store";
import { useUtilStore } from "~/stores/util.store";
import { GetCurrentCart, DeleteShopCartItem, TetherPayPageData, CreateTetherPayRequest } from "~~/services/shopCart.service"

const txtId = ref('');
const toast = useToast();
const { data, pending, refresh } = useAsyncData("tetherPay", () => TetherPayPageData());
const isOpenDeletePoup = ref(false);
const selectedItem = ref(0);
const authStore = useAuthStore();
const accountStore = useAccountStore();
const utilStore = useUtilStore();
const payLoading = ref(false);
const router = useRouter();

const openDeletePopup = (id: number) => {
    selectedItem.value = id;
    isOpenDeletePoup.value = true;
}

const createRequest = async () => {
    payLoading.value = true;
    var res = await CreateTetherPayRequest(txtId.value);
    if (res.isSuccess) {
        router.push('/account/orders');
        toast.showToast('سفارش شما با موفقیت ثبت شد ، بعد از تایید پرداخت توسط ادمین ، دوره به حساب کاربری شما اضافه می شود', ToastType.success, 10000)
        setTimeout(() => {
            toast.showToast('توجه ! تا وقتی که درخواست شما تایید نشده است سبد خرید خود را تغییر ندهدید ، در صورت مغایرت مبلغ سبد خرید و مبلغ پرداختی ، سفارش شما لغو میشود.', ToastType.warning, 200000)
        }, 2000);
    }
    payLoading.value = false;

}
const deleteItem = async () => {
    var res = await DeleteShopCartItem(selectedItem.value);
    if (res.isSuccess) {
        refresh();
        selectedItem.value = 0;
        toast.showToast('دوره با موفقیت از سبد خرید شما حذف شد');
        isOpenDeletePoup.value = false;
    }
}
</script>