<template>
    <div class="container py-12 sm:pt-5">

        <Head>
            <Title>سبد خرید</Title>
        </Head>
        <h1 class="mb-4 text-h3">سبد خرید شما</h1>
        <div :class="['flex gap-4 flex-wrap justify-between mt-5', { 'card-loading': loading }]">
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
                <div class="card p-4 w-[30%] flex gap-2 flex-col md:w-[60%] md:m-auto sm:!w-full"
                    v-if="(data?.data?.courseOrder.totalPrice ?? 0) > 0">
                    <form @submit.prevent="applyCode" :class="['flex gap-2 flex-col']">
                        <BaseInput v-model="disCountCode" name="discount" out-line
                            placeholder="اگر کد تخفیفی دارید اینجا وارد کنید" label="کدتخفیف" />
                        <BaseButton :loading="loading" class="w-full">اعمال کد تخفیف</BaseButton>
                    </form>
                    <hr />
                    <p><span>مبلغ کل</span> :{{ data?.data?.courseOrder.price.toLocaleString() }} تومان </p>
                    <p><span>تخفیف</span> : {{ data?.data?.courseOrder.discount.toLocaleString() }} تومان</p>
                    <p><span>قابل پرداخت </span> : {{ data?.data?.courseOrder.totalPrice.toLocaleString() }} تومان</p>
                    <p><span>قابل پرداخت ارزی (تتر) </span> : <label dir="ltr">{{ data?.data?.orderPriceWithTether
                    }}</label></p>
                    <hr />
                    <b>نحوه پرداخت</b>
                    <div class="my-3 flex gap-4 flex-col">
                        <label
                            :class="['flex items-center gap-4  font-semibold cursor-pointer', { 'card-loading': isAccessPayWithWallet }]">
                            <input type="radio" v-model="payType" value="wallet" name="wallet"
                                :disabled="isAccessPayWithWallet" />
                            کیف پول - <small>موجودی : {{ accountStore.currentUser?.walletAmount?.toLocaleString() }}
                                تومان</small>
                        </label>
                        <label class="flex items-center gap-4 font-semibold cursor-pointer">
                            <input v-model="payType" type="radio" value="online" name="gateway" />
                            درگاه پرداخت
                        </label>
                    </div>
                    <BaseButton :loading="loading" @click="payOrder" class="w-full" color="green">پرداخت</BaseButton>
                    <BaseButton :loading="loading" :render-button-tag="false" to="/cart/tetherPay" class="w-full"
                        color="orange">پرداخت با ارز
                        دیجیتال</BaseButton>
                </div>
            </template>
        </div>
        <BaseConfirmPopup v-model="isOpenDeletePoup" :confirm-function="deleteItem" />
    </div>
</template>
<script setup lang="ts">
import { TransactionFor } from "~/models/transaction/TransactionFor";
import { CreateTransaction } from "~/services/transaction.service";
import { useAccountStore } from "~/stores/account.store";
import { useAuthStore } from "~/stores/auth.store";
import { GetCurrentCart, DeleteShopCartItem, PayShopcartWithWallet, ApplyDiscount } from "~~/services/shopCart.service";

const toast = useToast();
const router = useRouter();
const selectedItem = ref(0);
const authStore = useAuthStore();
const accountStore = useAccountStore();
const loading = ref(false);
const isOpenDeletePoup = ref(false);


const { data, pending, refresh } = useAsyncData("shopCart", () => GetCurrentCart());


const payType = ref('online');
const disCountCode = ref('');
const openDeletePopup = (id: number) => {
    selectedItem.value = id;
    isOpenDeletePoup.value = true;
}
const isAccessPayWithWallet = computed(() => {
    return (accountStore.currentUser?.walletAmount ?? 0) < (data.value?.data?.courseOrder.totalPrice ?? 0)
})

const applyCode = async () => {
    loading.value = true;
    var result = await ApplyDiscount(disCountCode.value);
    if (result.isSuccess) {
        toast.showToast("کد تخفیف با موفقیت اعمال شد");
        refresh();
    }
    loading.value = false;
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
const payOrder = async () => {
    loading.value = true;
    if (payType.value == 'online') {
        var res = await CreateTransaction(TransactionFor.courseOrder);
        if (res.isSuccess) {
            document.location.replace(res.data ?? '/');
        } else {
            loading.value = false;
        }
    } else {
        var result = await PayShopcartWithWallet();
        if (result.isSuccess) {
            toast.showToast('سفارش با موفقیت پرداخت شد');
            setTimeout(() => {
                location.replace('/account/orders');
            }, 500);
        }else{
            loading.value = false;
        }
    }

}
</script>